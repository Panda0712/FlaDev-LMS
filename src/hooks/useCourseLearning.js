/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCourseLearning = ({
  courseId,
  fetchProgressFn,
  fetchCourseById,
  fetchOrderFn,
  fetchReviewFn,
  updateProgressFn,
  initProgressFn,
}) => {
  const [courseInfo, setCourseInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openItemList, setOpenItemList] = useState([]);
  const [currentActiveLesson, setCurrentActiveLesson] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [progressInfo, setProgressInfo] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [lessonDurations, setLessonDurations] = useState({});

  const currentUser = useSelector((state) => state.auth.user);
  const isCourseOrdered = orders.some(
    (order) =>
      order.userId === currentUser?.id && order.courseId === courseInfo?.id
  );

  const findCurrentLesson = () => {
    if (!courseInfo || !currentActiveLesson) return null;

    for (const module of courseInfo.courseModules || []) {
      for (const lesson of module.lessons || []) {
        if (lesson.name === currentActiveLesson) {
          return lesson;
        }
      }
    }

    return null;
  };

  const handleChangeActiveLesson = (lessonName) => {
    if (lessonName === currentActiveLesson) return;
    setCurrentActiveLesson(lessonName);
  };

  const handleToggleList = (index) => {
    setOpenItemList((prev) =>
      prev?.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleVideoComplete = (lessonName) => {
    if (!lessonName || !courseInfo || !currentUser) return;

    const updatedModules = courseInfo.courseModules.map((module) => {
      const updatedLessons = module.lessons.map((lesson) => {
        if (lesson.name === lessonName) {
          return { ...lesson, completed: true };
        }
        return lesson;
      });
      return { ...module, lessons: updatedLessons };
    });

    setCourseInfo((prev) => ({
      ...prev,
      courseModules: updatedModules,
    }));

    updateProgressFn({
      courseId,
      lessonId: lessonName,
      userId: currentUser?.id,
    })
      .then((res) => {
        setProgressInfo(res);
        setProgressPercent(res.percentComplete || 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  const handleDuration = (duration) => {
    if (currentActiveLesson) {
      setLessonDurations((prev) => ({
        ...prev,
        [currentActiveLesson]: duration,
      }));
    }
  };

  const handleSetData = (res) => {
    setCourseInfo(res || []);
    setOpenItemList(
      res?.courseModules?.map((_, index) => ({
        current: index,
        active: false,
      }))
    );
    setCurrentActiveLesson(res?.courseModules[0]?.lessons[0]?.name);
  };

  const initialProgress = () => {
    if (!currentUser || !courseId) return;

    initProgressFn({ courseId, userId: currentUser?.id })
      .then((res) => {
        setProgressInfo(res);
        setProgressPercent(res?.percentComplete || 0);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  const fetchProgress = () => {
    if (!currentUser || !courseId) return;

    fetchProgressFn(courseId, currentUser?.id)
      .then((res) => {
        setProgressInfo(res);
        setProgressPercent(res.percentComplete || 0);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          initialProgress();
        } else {
          console.log(error);
          toast.error(error?.message);
        }
      });
  };

  useEffect(() => {
    const currentLesson = findCurrentLesson();
    if (currentLesson?.video_url) setCurrentVideoUrl(currentLesson.video_url);
    else setCurrentVideoUrl(null);
  }, [currentActiveLesson, courseInfo]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchOrderFn(), fetchCourseById(courseId), fetchReviewFn()])
      .then(([orderRes, courseRes, reviewRes]) => {
        setOrders(orderRes || []);
        handleSetData(courseRes);
        setReviews(reviewRes || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  useEffect(() => {
    if (courseInfo && currentUser && courseId) {
      fetchProgress();
    }
  }, [courseInfo]);

  return {
    reviews,
    orders,
    courseInfo,
    currentUser,
    loading,
    openItemList,
    currentActiveLesson,
    currentVideoUrl,
    progressInfo,
    progressPercent,
    lessonDurations,
    isCourseOrdered,
    handleChangeActiveLesson,
    setReviews,
    handleToggleList,
    handleVideoComplete,
    handleDuration,
  };
};

export default useCourseLearning;
