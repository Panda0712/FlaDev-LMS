/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";
import { singleFileValidator } from "~/utils/validators";

const useNotificationTable = ({
  fetchDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
  uploadImageFn,
  dataKey = "notifications",
  totalKey = "totalNotifications",
}) => {
  const [dataNotifications, setDataNotifications] = useState([]);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({ edit: false, data: null });
  const [deleting, setDeleting] = useState({ delete: false, id: null });
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState([]);
  const [image, setImage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const reqDataRef = useRef(null);

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page") || 1);
  const totalPages = Math.ceil(totalNotifications / DEFAULT_ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = new URLSearchParams(location.search);
      params.set("page", newPage.toString());
      navigate(`?${params.toString()}`);
    }
  };

  const updateStateData = (res) => {
    setDataNotifications(res[dataKey] || []);
    setTotalNotifications(res[totalKey] || 0);
    setOpenOptions(
      (res[dataKey] || []).map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

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
    formData.append("hotel-notifications", event.target?.files[0]);
    reqDataRef.current = formData;
  };

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

  const handleReset = () => {
    setOpenModal(false);
    setEditing({ edit: false, data: null });
    setDeleting({ delete: false, id: null });
    setOpenOptions(
      dataNotifications?.map((_, index) => ({
        index,
        open: false,
      }))
    );
    setImage(null);
    reqDataRef.current = null;
  };

  const onSubmit = async (data, getValues) => {
    if (!image && !editing.edit) {
      toast.error("Vui lòng chọn hình ảnh!!!");
      return;
    }
    const formData = reqDataRef.current;
    if (!formData && !editing.edit) {
      toast.error("Dữ liệu ảnh không hợp lệ!!!");
      return;
    }
    const currentImageFormData = getValues("images") || null;
    let imagePath = null;
    if (formData)
      imagePath = await toast.promise(uploadImageFn(formData), {
        pending: "Đang tải ảnh lên...",
        success: "Tải ảnh thành công!!!",
        error: "Tải ảnh thất bại!",
      });

    if (imagePath || currentImageFormData) {
      const createData = {
        ...data,
        images: imagePath ? imagePath.secure_url : currentImageFormData,
      };
      toast
        .promise(
          editing.edit
            ? updateDataFn(editing.data._id, createData)
            : createDataFn(createData),
          {
            pending: editing.edit
              ? "Đang chỉnh sửa thông báo..."
              : "Đang tạo thông báo mới...",
          }
        )
        .then((res) => {
          if (!res.error) {
            toast.success(
              editing.edit
                ? "Chỉnh sửa thành công"
                : "Tạo thông báo mới thành công!!!"
            );
            handleAfterCUDNewData();
          }
          handleReset();
        });
    }
  };

  const onDeleting = async () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa thông báo...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa thông báo thành công!!!");
          handleAfterCUDNewData();
        }
        handleReset();
      });
  };

  const handleAfterCUDNewData = () => {
    fetchDataFn(location.search).then(updateStateData);
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFn(location.search)
      .then(updateStateData)
      .finally(() => setLoading(false));
  }, [location.search]);

  useEffect(() => {
    if (editing.edit && editing.data) {
      setImage(editing.data.images || null);
    } else {
      setImage(null);
    }
  }, [editing]);

  return {
    dataNotifications,
    totalNotifications,
    loading,
    editing,
    deleting,
    openModal,
    openOptions,
    image,
    currentPage,
    totalPages,
    handlePageChange,
    handleToggle,
    handleReset,
    onSubmit,
    onDeleting,
    handleImageChange,
    setOpenModal,
    setEditing,
    setDeleting,
    setImage,
  };
};

export default useNotificationTable;
