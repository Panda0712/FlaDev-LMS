import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCourseById, fetchReviews } from "~/apis/endpoints";
import NavigationText from "~/components/NavigationText/NavigationText";
import CourseContent from "~/pages/Courses/Course/CourseContent/CourseContent";
import CourseHeading from "~/pages/Courses/Course/CourseHeading/CourseHeading";
import CourseInstructor from "~/pages/Courses/Course/CourseInstructor/CourseInstructor";
import CourseLessons from "~/pages/Courses/Course/CourseLessons/CourseLessons";
import CourseLinkBox from "~/pages/Courses/Course/CourseLinkBox/CourseLinkBox";
import CourseReviews from "~/pages/Courses/Course/CourseReviews/CourseReviews";
import CourseSuggestion from "~/pages/Courses/Course/CourseSuggestion/CourseSuggestion";

const Course = () => {
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const courseId = useParams().courseId;

  const contentRef = useRef(null);
  const instructorRef = useRef(null);
  const lessonsRef = useRef(null);
  const reviewsRef = useRef(null);

  const handleScrollToSection = (index) => {
    const refs = [contentRef, instructorRef, lessonsRef, reviewsRef];
    const ref = refs[index];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCourseById(courseId), fetchReviews()])
      .then(([courseRes, reviewRes]) => {
        setCourse(courseRes || {});
        setReviews(reviewRes || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading)
    return (
      <div className="flex items-center my-24 justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <section>
      <NavigationText placeTo="MERN Stack" />
      <CourseHeading reviews={reviews} courseInfo={course} />

      <div className="px-28">
        <CourseLinkBox onScrollToSection={handleScrollToSection} />

        <div ref={contentRef}>
          <CourseContent courseInfo={course} />
        </div>
        <div ref={instructorRef}>
          <CourseInstructor courseInfo={course} />
        </div>
        <div ref={lessonsRef}>
          <CourseLessons courseInfo={course} />
        </div>
        <div ref={reviewsRef}>
          <CourseReviews
            reviews={reviews}
            loading={loading}
            courseInfo={course}
          />
        </div>

        <CourseSuggestion style="bg-white" />
      </div>
    </section>
  );
};

export default Course;
