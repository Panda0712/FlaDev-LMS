import CourseCard from "~/components/CourseCard/CourseCard";
import Loading from "~/components/Loading/Loading";
import useCourses from "~/hooks/useCourses";

const CourseSuggestion = ({ style }) => {
  const { loading, courses } = useCourses();

  if (loading) return <Loading />;

  return (
    <section className={`pt-[90px] pb-[120px] bg-[#f8fafc] ${style}`}>
      <h3 className="text-[20px] font-semibold mb-[36px]">
        Các khóa học tương tự
      </h3>

      <div className="grid grid-cols-4 gap-[30px] basis-[100%]">
        {courses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} type="secondary" />
        ))}
      </div>
    </section>
  );
};

export default CourseSuggestion;
