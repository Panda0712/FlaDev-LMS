import { Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchCourses } from "~/apis/endpoints";
import CourseCard from "~/components/CourseCard/CourseCard";
import NavigationText from "~/components/NavigationText/NavigationText";
import { categoryList, priceList, reviewList } from "~/pages/Courses/constants";
import CourseFilter from "~/pages/Courses/CourseFilter/CourseFilter";
import CoursesCard from "~/pages/Courses/CoursesCard/CoursesCard";
import CoursesSearch from "~/pages/Courses/CoursesSearch/CoursesSearch";

const Courses = () => {
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchValue = (e) => setSearchQuery(e.target.value);

  useEffect(() => {
    setLoading(true);
    fetchCourses()
      .then((res) => {
        setCourses(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center my-24 justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <section>
      <NavigationText placeTo="Danh sách khóa học" />

      <div className="pt-[32px] pb-[90px] px-28">
        <div className="flex gap-[32px] items-start justify-between">
          <div className="basis-[calc(75%-16px)]">
            <CoursesSearch
              searchQuery={searchQuery}
              handleChangeSearchValue={handleChangeSearchValue}
            />
            <div className="flex flex-col gap-[32px]">
              {courses.map((course, index) => (
                <CoursesCard key={index} course={course} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[32px] basis-[calc(25%-16px)]">
            <CourseFilter label="Loại khóa học" listItem={categoryList} />
            <CourseFilter label="Giá" listItem={priceList} />
            <CourseFilter label="Đánh giá" listItem={reviewList} type="star" />
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-[24px] font-semibold">Khóa học nổi bật</h3>
          <div className="relative mt-5 grid grid-cols-4 gap-[30px]">
            {courses?.slice(0, 4).map((course, index) => (
              <CourseCard key={index} course={course} type="secondary" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
