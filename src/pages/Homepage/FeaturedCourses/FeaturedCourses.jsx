import { useNavigate } from "react-router-dom";
import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";

const FeaturedCourses = ({ courses }) => {
  const navigate = useNavigate();

  return (
    <section
      className="my-[90px] lg:px-28 md:px-24 
    sm:px-18 px-12 relative"
    >
      <div className="flex max-sm:flex-wrap items-center justify-between gap-5 mb-[34px]">
        <div className="leading-[1.9]">
          <h3
            className="lg:text-[32px] md:text-[28px] 
          sm:text-[24px] text-[20px] font-bold"
          >
            Khóa học nổi bật
          </h3>
          <p className="text-[#555555] font-medium">
            Khám phá những khóa học top
          </p>
        </div>

        <Button
          onClick={() => navigate("/courses")}
          title="Xem thêm"
          type="secondary"
        />
      </div>

      <div
        className="grid lg:grid-cols-3 min-[540px]:grid-cols-2 grid-cols-1
       gap-[30px] basis-[100%]"
      >
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
