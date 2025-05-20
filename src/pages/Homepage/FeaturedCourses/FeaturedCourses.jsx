import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";

const FeaturedCourses = ({ courses }) => {
  return (
    <section className="my-[90px] px-28 relative">
      <div className="flex items-center justify-between gap-5 mb-[34px]">
        <div className="leading-[1.9]">
          <h3 className="text-[32px] font-bold">Khóa học nổi bật</h3>
          <p className="text-[#555555] font-medium">
            Khám phá những khóa học top
          </p>
        </div>

        <Button title="Xem thêm" type="secondary" />
      </div>

      <div className="grid grid-cols-3 gap-[30px] basis-[100%]">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
