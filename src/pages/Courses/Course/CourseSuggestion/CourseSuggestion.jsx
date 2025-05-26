import CourseCard from "~/components/CourseCard/CourseCard";
import Loading from "~/components/Loading/Loading";
import useCourses from "~/hooks/useCourses";

const CourseSuggestion = ({ reviews = [], style }) => {
  const { loading, courses } = useCourses();

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

  if (loading) return <Loading />;

  return (
    <section className={`pt-[90px] pb-[120px] bg-[#f8fafc] ${style}`}>
      <h3 className="md:text-[20px] text-[18px] font-semibold mb-[36px]">
        Các khóa học tương tự
      </h3>

      <div
        className="grid lg:grid-cols-4 md:grid-cols-3 
          min-[500px]:grid-cols-2 max-[500px]:grid-cols-1 gap-[30px] basis-[100%]"
      >
        {courses.slice(0, 4).map((course, index) => (
          <CourseCard
            key={index}
            reviewsListCourses={reviewsListCourses}
            course={course}
            type="secondary"
          />
        ))}
      </div>
    </section>
  );
};

export default CourseSuggestion;
