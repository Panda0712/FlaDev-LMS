import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "~/apis/endpoints";
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
  const [loading, setLoading] = useState(false);

  const courseId = useParams().courseId;

  useEffect(() => {
    setLoading(true);
    fetchCourseById(courseId)
      .then((res) => {
        setCourse(res || {});
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
      <CourseHeading courseInfo={course} />

      <div className="px-28">
        <CourseLinkBox />

        <CourseContent courseInfo={course} />

        <CourseInstructor courseInfo={course} />

        <CourseLessons courseInfo={course} />

        <CourseReviews courseInfo={course} />

        <CourseSuggestion style="bg-white" />
      </div>
    </section>
  );
};

export default Course;
