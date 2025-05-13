/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { uploadBlogImageAPI } from "~/apis/endpoints";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";
import { singleFileValidator } from "~/utils/validators";

const useBlogTable = ({
  fetchDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  imageKey = "blog-covers",
  currentImageFormData,
  resetFn,
}) => {
  const [dataBlogs, setDataBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({
    edit: false,
    data: null,
  });
  const [deleting, setDeleting] = useState({
    delete: false,
    id: null,
  });
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState([]);
  const [image, setImage] = useState(null);

  const totalPages = Math.ceil(dataBlogs?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLastBooking = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirstBooking = indexOfLastBooking - DEFAULT_ITEMS_PER_PAGE;
  const currentBookings = dataBlogs?.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const reqDataRef = useRef(null);

  const currentUser = useSelector((state) => state.auth.user);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleAfterGetDatas = (res) => {
    setDataBlogs(res || []);
    setOpenOptions(
      (res || []).map((_, index) => ({
        index,
        open: false,
      }))
    );
    setError(null);
  };

  const handleReset = () => {
    setEditing({
      edit: false,
      data: null,
    });
    setDeleting({
      delete: false,
      id: null,
    });
    setOpenOptions(
      dataBlogs?.map((_, index) => ({
        index,
        open: false,
      }))
    );
    setOpenModal(false);
  };

  const toggleOpenModal = () => setOpenModal(!openModal);

  const handleToggle = (type, data) => {
    setOpenModal(type === "options" ? false : true);
    if (type === "edit")
      setEditing({
        edit: true,
        data,
      });
    else if (type === "delete")
      setDeleting({
        delete: true,
        id: data,
      });
    else if (type === "options")
      setOpenOptions((prevOptions) =>
        prevOptions.map((item, index) =>
          index === data
            ? {
                ...item,
                open: !item.open,
              }
            : {
                ...item,
                open: false,
              }
        )
      );
  };

  const handleDeleteBlog = () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa bài viết...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa bài viết thành công!!!");
          handleAfterDeletedData();
        }
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Vui lòng chọn ảnh trước khi tạo!!!");
      return;
    }

    const formData = reqDataRef.current;
    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }

    let imagesPath = null;
    if (formData)
      imagesPath = await toast.promise(uploadBlogImageAPI(formData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    if (imagesPath || currentImageFormData) {
      const tagsArray = data.tags
        ? data.tags
            .split(", ")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const apiData = {
        ...data,
        tags: tagsArray,
        coverImage: imagesPath ? imagesPath.secure_url : currentImageFormData,
        author: currentUser.username,
        authorId: currentUser.id,
      };

      toast
        .promise(
          editing.edit
            ? updateDataFn(editing.data.id, apiData)
            : createDataFn(apiData),
          {
            pending: editing.edit
              ? "Đang chỉnh sửa bài viết..."
              : "Đang tạo bài viết mới...",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success(
              editing.edit
                ? "Chỉnh sửa thành công"
                : "Tạo khách sạn mới thành công!!!"
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
      .catch(() => setError("Lỗi khi lấy dữ liệu bài viết"))
      .finally(() => setLoading(false));
  }, []);

  return {
    dataBlogs,
    loading,
    error,
    openModal,
    editing,
    image,
    deleting,
    openOptions,
    totalPages,
    currentBookings,
    currentPage,
    handleImageChange,
    onSubmit,
    paginate,
    toggleOpenModal,
    handleReset,
    handleToggle,
    handleDeleteBlog,
    setOpenModal,
    setImage,
  };
};

export default useBlogTable;
