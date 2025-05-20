import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCourseById,
  fetchCourseProgress,
  fetchOrders,
  fetchReviews,
  initCourseProgress,
  updateLessonProgress,
} from "~/apis/endpoints";
import Loading from "~/components/Loading/Loading";
import useCourseLearning from "~/hooks/useCourseLearning";
import CourseContent from "~/pages/Courses/Course/CourseContent/CourseContent";
import CourseInstructor from "~/pages/Courses/Course/CourseInstructor/CourseInstructor";
import CourseLinkBox from "~/pages/Courses/Course/CourseLinkBox/CourseLinkBox";
import CourseReviews from "~/pages/Courses/Course/CourseReviews/CourseReviews";
import CourseSuggestion from "~/pages/Courses/Course/CourseSuggestion/CourseSuggestion";
import CourseProgress from "~/pages/Courses/CourseLearning/CourseProgress/CourseProgress";
import CourseVideo from "~/pages/Courses/CourseLearning/CourseVideo/CourseVideo";

const CourseLearning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    reviews,
    currentUser,
    courseInfo,
    loading,
    openItemList,
    currentActiveLesson,
    currentVideoUrl,
    progressInfo,
    progressPercent,
    lessonDurations,
    isCourseOrdered,
    handleChangeActiveLesson,
    handleToggleList,
    handleVideoComplete,
    handleDuration,
  } = useCourseLearning({
    courseId,
    fetchProgressFn: fetchCourseProgress,
    fetchCourseById,
    fetchOrderFn: fetchOrders,
    fetchReviewFn: fetchReviews,
    updateProgressFn: updateLessonProgress,
    initProgressFn: initCourseProgress,
  });

  useEffect(() => {
    if (!loading && !isCourseOrdered && courseInfo) navigate("/");
  }, [navigate, loading, isCourseOrdered, courseInfo]);

  if (loading) return <Loading />;

  return (
    <section className="px-28 pt-[32px] pb-[90px]">
      <h3 className="text-[24px] font-semibold mb-[32px]">
        {courseInfo?.courseName}
      </h3>

      <div className="flex items-start gap-[32px]">
        <div className="basis-[calc(70%-16px)]">
          <CourseVideo
            thumbnail={courseInfo?.thumbnail || courseInfo?.courseThumbnail}
            videoUrl={currentVideoUrl}
            onVideoComplete={handleVideoComplete}
            lessonId={currentActiveLesson}
            handleDuration={handleDuration}
          />

          <CourseLinkBox />

          <CourseContent courseInfo={courseInfo} />

          <CourseInstructor courseInfo={courseInfo} />
        </div>
        <div className="basis-[calc(30%-16px)] rounded-[16px] bg-[#faf8fc] py-[20px] pb-0 border-2 border-slate-200">
          <h3 className="text-[24px] font-semibold mt-2 mb-2 px-[20px]">
            Tiến độ hoàn thành
          </h3>

          <div className="px-[20px] mb-5">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tiến độ: {Math.round(progressPercent)}%</span>
              <span>
                {progressInfo?.completedLessons?.length || 0}/
                {progressInfo?.totalLessons || 0} bài học
              </span>
            </div>
          </div>

          <CourseProgress
            openItemList={openItemList}
            courseModule={courseInfo?.courseModules}
            currentActiveLesson={currentActiveLesson}
            handleToggleList={handleToggleList}
            handleChangeActiveLesson={handleChangeActiveLesson}
            progressInfo={progressInfo}
            lessonDurations={lessonDurations}
          />
        </div>
      </div>

      <CourseSuggestion style="bg-white" />

      <CourseReviews
        currentUser={currentUser}
        reviews={reviews}
        courseInfo={courseInfo}
      />
    </section>
  );
};

export default CourseLearning;
