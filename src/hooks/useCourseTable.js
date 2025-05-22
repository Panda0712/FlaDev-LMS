/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadCourseImageAPI, uploadCourseVideoAPI } from "~/apis/endpoints";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";
import { singleFileValidator, singleVideoValidator } from "~/utils/validators";

const useCourseTable = ({
  fetchDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  imageKey = "course-thumbnails",
  videoKey = "course-videos",
  currentImageFormData,
  resetFn,
}) => {
  const [dataCourses, setDataCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({ edit: false, data: null });
  const [deleting, setDeleting] = useState({ delete: false, id: null });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState([]);
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState({});
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState({});
  const [videosList, setVideosList] = useState([]);
  const [videosOrder, setVideosOrder] = useState([]);

  const totalPages = Math.ceil(dataCourses?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLast = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - DEFAULT_ITEMS_PER_PAGE;
  const currentCourses = dataCourses?.slice(indexOfFirst, indexOfLast);
  const categoryList = dataCourses?.map((course) => course.category);
  const uniqueCategories = [...new Set(categoryList)];

  const currentUser = useSelector((state) => state.auth.user);

  const reqDataRef = useRef(null);
  const videoDataRef = useRef(null);

  const handleImageChange = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }
    const file = event.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append(imageKey, event.target?.files[0]);
    reqDataRef.current = formData;
  };

  const handleVideoChange = (event, moduleIdx, lessonIdx) => {
    console.log(`Starting upload for Module ${moduleIdx}, Lesson ${lessonIdx}`);

    const error = singleVideoValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }
    const file = event.target?.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const uniqueVideoKey = `${moduleIdx}-${lessonIdx}`;
      console.log("Processing videoKey:", uniqueVideoKey);

      setVideo((prev) => {
        const newState = { ...prev };
        newState[uniqueVideoKey] = e.target.result;
        console.log("New video state keys:", Object.keys(newState));
        return newState;
      });

      setVideosList((prev) => {
        const existingIndex = prev.findIndex((_, idx) => {
          const order = videosOrder[idx];
          return (
            order?.moduleIdx === moduleIdx && order?.lessonIdx === lessonIdx
          );
        });
        if (existingIndex === -1) {
          return [...prev, file];
        } else {
          const newList = [...prev];
          newList[existingIndex] = file;
          return newList;
        }
      });

      setVideosOrder((prev) => {
        const existingIndex = prev.findIndex(
          (order) =>
            order?.moduleIdx === moduleIdx && order?.lessonIdx === lessonIdx
        );
        if (existingIndex === -1) {
          return [...prev, { moduleIdx, lessonIdx }];
        } else {
          return prev;
        }
      });

      setVideosList((currentVideosList) => {
        const formData = new FormData();
        currentVideosList.forEach((videoFile) => {
          formData.append(videoKey, videoFile);
        });
        videoDataRef.current = formData;
        return currentVideosList;
      });
    };
    reader.readAsDataURL(file);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAfterGetDatas = (res) => {
    setDataCourses(res || []);
    setOpenOptions((res || []).map((_, index) => ({ index, open: false })));
    setError(null);
  };

  const handleReset = () => {
    setEditing({ edit: false, data: null });
    setDeleting({ delete: false, id: null });
    setOpenOptions(dataCourses?.map((_, index) => ({ index, open: false })));
    setOpenModal(false);
    setModules([]);
    setLessons({});
    setVideo({});
    setVideosList([]);
    setVideosOrder([]);
    reqDataRef.current = null;
    videoDataRef.current = null;
  };

  const toggleOpenModal = () => setOpenModal(!openModal);

  const handleToggle = (type, data) => {
    setOpenModal(type === "options" ? false : true);
    if (type === "edit") setEditing({ edit: true, data });
    else if (type === "delete") setDeleting({ delete: true, id: data });
    else if (type === "options")
      setOpenOptions((prevOptions) =>
        prevOptions.map((item, index) =>
          index === data
            ? { ...item, open: !item.open }
            : { ...item, open: false }
        )
      );
  };

  const handleDeleteCourse = () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa khóa học...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa khóa học thành công!");
          handleAfterDeletedData();
        }
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const addModule = (module) => setModules((prev) => [...prev, module]);
  const updateModule = (idx, module) =>
    setModules((prev) => prev.map((m, i) => (i === idx ? module : m)));
  const removeModule = (idx) => {
    setModules((prev) => prev.filter((_, i) => i !== idx));
    setLessons((prev) => {
      const newLessons = { ...prev };
      delete newLessons[idx];
      return newLessons;
    });
  };

  const addLesson = (moduleIdx, lesson) =>
    setLessons((prev) => ({
      ...prev,
      [moduleIdx]: [...(prev[moduleIdx] || []), lesson],
    }));
  const updateLesson = (moduleIdx, lessonIdx, lesson) =>
    setLessons((prev) => ({
      ...prev,
      [moduleIdx]: prev[moduleIdx].map((l, i) =>
        i === lessonIdx ? lesson : l
      ),
    }));
  const removeLesson = (moduleIdx, lessonIdx) =>
    setLessons((prev) => ({
      ...prev,
      [moduleIdx]: prev[moduleIdx].filter((_, i) => i !== lessonIdx),
    }));

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Vui lòng chọn ảnh trước khi tạo!!!");
      return;
    }

    const formImageData = reqDataRef.current;
    if (!formImageData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    const formVideoData = videoDataRef.current;
    if (formVideoData && formVideoData.length > 5) {
      toast.error("Vui lòng chỉ chọn tối đa 5 video!!!");
      return;
    }

    let imagesPath = null;
    if (formImageData)
      imagesPath = await toast.promise(uploadCourseImageAPI(formImageData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    let videosList = [];
    if (formVideoData)
      videosList = await toast.promise(uploadCourseVideoAPI(formVideoData), {
        pending: "Đang tải video lên...",
        success: "Tải video thành công!!!",
        error: "Tải video thất bại!",
      });

    if (imagesPath || currentImageFormData) {
      const courseModules = modules.map((mod, idx) => {
        const moduleLessons = lessons[idx] || [];

        const formattedLessons = moduleLessons.map((lesson, lessonIdx) => {
          const videoIndex = videosOrder.findIndex(
            (order) => order.moduleIdx === idx && order.lessonIdx === lessonIdx
          );

          return {
            name: lesson.name,
            video_url:
              videoIndex !== -1 && videosList[videoIndex]
                ? videosList[videoIndex].secure_url
                : lesson.video_url || "",
          };
        });

        return {
          ...mod,
          lessons: formattedLessons,
        };
      });

      const validatedModules = courseModules.map((module) => ({
        ...module,
        lessons: Array.isArray(module.lessons) ? module.lessons : [],
      }));

      const apiData = {
        ...data,
        thumbnail: imagesPath ? imagesPath.secure_url : currentImageFormData,
        courseModules: validatedModules,
        instructor: currentUser?.username,
      };
      toast
        .promise(
          editing.edit
            ? updateDataFn(editing.data.id, apiData)
            : createDataFn(apiData),
          {
            pending: editing.edit
              ? "Đang chỉnh sửa khóa học..."
              : "Đang tạo khóa học mới...",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success(
              editing.edit
                ? "Chỉnh sửa thành công"
                : "Tạo khóa học mới thành công!"
            );
            handleAfterDeletedData();
          }
          handleReset();
          resetFn();
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
  };

  const handleAfterDeletedData = () => {
    setLoading(true);
    fetchDataFn()
      .then(handleAfterGetDatas)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFn()
      .then(handleAfterGetDatas)
      .catch(() => setError("Lỗi khi lấy dữ liệu khóa học"))
      .finally(() => setLoading(false));
  }, []);

  return {
    dataCourses,
    loading,
    error,
    openModal,
    editing,
    deleting,
    openOptions,
    totalPages,
    currentCourses,
    currentPage,
    modules,
    video,
    videosList,
    image,
    lessons,
    uniqueCategories,
    setVideo,
    handleVideoChange,
    handleReset,
    handleToggle,
    handleImageChange,
    handleDeleteCourse,
    paginate,
    toggleOpenModal,
    addModule,
    updateModule,
    removeModule,
    addLesson,
    updateLesson,
    removeLesson,
    onSubmit,
    setOpenModal,
    setModules,
    setLessons,
    setImage,
  };
};

export default useCourseTable;
