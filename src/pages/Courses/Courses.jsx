import { Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCourses, fetchReviews } from "~/apis/endpoints";
import CourseCard from "~/components/CourseCard/CourseCard";
import NavigationText from "~/components/NavigationText/NavigationText";
import CourseFilter from "~/pages/Courses/CourseFilter/CourseFilter";
import CoursesCard from "~/pages/Courses/CoursesCard/CoursesCard";
import CoursesSearch from "~/pages/Courses/CoursesSearch/CoursesSearch";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryList = courses.reduce((acc, course) => {
    const category = course?.category;
    if (!acc.find((item) => item?.name === category)) {
      acc.push({
        name: category,
        count: 1,
      });
    } else {
      const updatedCategory = acc.map((item) =>
        item.name === category ? { ...item, count: item.count + 1 } : item
      );
      acc = updatedCategory;
    }

    return acc;
  }, []);
  const reviewsListCourses = reviews.map((review) => {
    const foundCourse = courses.find(
      (course) => course?.id === review?.courseId
    );
    const totalRatingCount = reviews.filter(
      (review) => review?.courseId === foundCourse?.id
    )?.length;
    const totalRatingValue = reviews.reduce(
      (acc, review) =>
        review?.courseId === foundCourse?.id ? acc + review?.rating : acc,
      0
    );
    const averageRating = Math.floor(totalRatingValue / totalRatingCount) || 0;

    return {
      ...review,
      courseName: foundCourse?.name,
      averageRating,
    };
  });
  const uniqueReviewsList = reviewsListCourses.filter(
    (review, index, self) =>
      index === self.findIndex((r) => r?.courseId === review?.courseId)
  );
  const reviewList = Array.from({ length: 5 }, (_, index) => index + 1).map(
    (index) => ({
      name: index,
      count: uniqueReviewsList?.filter(
        (review) => review?.averageRating === index
      )?.length,
    })
  );

  let filterCourses = [...courses];
  if (selectedCategory) {
    filterCourses = filterCourses.filter(
      (course) => course?.category === selectedCategory
    );
  }
  if (selectedReview) {
    filterCourses = filterCourses.filter((course) => {
      const foundReview = uniqueReviewsList.find(
        (review) => review?.courseId === course?.id
      );
      return Number(foundReview?.averageRating) === Number(selectedReview);
    });
  }
  if (searchQuery) {
    const searchQueryFormat = searchQuery.toLowerCase().trim();
    filterCourses = filterCourses.filter(
      (course) =>
        course?.name.toLowerCase().trim().includes(searchQueryFormat) ||
        course?.category.toLowerCase().trim().includes(searchQueryFormat)
    );
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Vui lòng nhập tìm kiếm!!!");
      return;
    }

    const searchQueryFormat = searchQuery.toLowerCase().trim();

    const filteredCourses = courses.filter(
      (course) =>
        course?.name.toLowerCase().trim().includes(searchQueryFormat) ||
        course?.category.toLowerCase().trim().includes(searchQueryFormat)
    );
    return filteredCourses;
  };

  const handleChangeSearchValue = (e) => setSearchQuery(e.target.value);

  const handleChangeCategory = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleChangeReview = (e) => {
    const review = Number(e.target.value);
    setSelectedReview(review);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCourses(), fetchReviews()])
      .then(([coursesRes, reviewsRes]) => {
        setCourses(coursesRes || []);
        setReviews(reviewsRes || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
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

      <div className="pt-[32px] pb-[90px] lg:px-28 md:px-24 sm:px-18 px-12">
        <div className="flex max-lg:flex-col-reverse gap-[32px] items-start justify-between">
          <div className="basis-[calc(75%-16px)]">
            <CoursesSearch
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              handleChangeSearchValue={handleChangeSearchValue}
            />
            <div
              className="flex max-md:grid max-md:grid-cols-2 
            max-sm:grid-cols-1 flex-col gap-[32px]"
            >
              {(selectedCategory || selectedReview || searchQuery) &&
              !filterCourses?.length ? (
                <p className="text-[18px] font-medium">
                  Không có kết quả phù hợp!!!
                </p>
              ) : (
                filterCourses.map((course, index) => (
                  <CoursesCard key={index} course={course} />
                ))
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[32px] basis-[calc(25%-16px)]">
            <CourseFilter
              radioId="course-category"
              label="Loại khóa học"
              listItem={categoryList}
              selectedCategory={selectedCategory}
              onChange={handleChangeCategory}
            />
            <CourseFilter
              radioId="course-review"
              label="Đánh giá"
              listItem={reviewList}
              selectedReview={selectedReview}
              onChange={handleChangeReview}
              type="star"
            />
          </div>
        </div>

        <div className="mt-24">
          <h3 className="md:text-[24px] text-[20px] font-semibold">
            Khóa học nổi bật
          </h3>
          <div
            className="relative mt-5 grid lg:grid-cols-4 md:grid-cols-3 
          min-[500px]:grid-cols-2 max-[500px]:grid-cols-1 gap-[30px]"
          >
            {courses?.slice(0, 4).map((course, index) => (
              <CourseCard
                key={index}
                reviewsListCourses={reviewsListCourses}
                course={course}
                type="secondary"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
