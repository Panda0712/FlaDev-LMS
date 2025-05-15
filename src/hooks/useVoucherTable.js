/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useVoucherTable = ({
  setValue,
  countValue,
  reset,
  fetchDataFn,
  getDataFn,
  createDataFn,
  updateDataFn,
  deleteDataFn,
}) => {
  const [dataCourses, setDataCourses] = useState([]);
  const [dataVouchers, setDataVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataListCourseFields, setDataListCourseFields] = useState([]);
  const [currentSelectIndex, setCurrentSelectIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState({
    edit: false,
    data: null,
  });
  const [deleting, setDeleting] = useState({
    delete: false,
    id: null,
  });
  const [openOptions, setOpenOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(dataVouchers?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLast = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - DEFAULT_ITEMS_PER_PAGE;
  const currentVouchers = dataVouchers?.slice(indexOfFirst, indexOfLast);

  const handleChangeListCourseFields = (e) => {
    const newListCourseFields = [...dataListCourseFields];
    const checked = newListCourseFields.includes(e.target.value);
    if (!checked) {
      newListCourseFields.push(e.target.value);
      setDataListCourseFields(newListCourseFields);
      setCurrentSelectIndex(e.target.index);
      setValue("courseIds", newListCourseFields);
    } else {
      newListCourseFields.splice(
        newListCourseFields.indexOf(e.target.value),
        1
      );
      setDataListCourseFields(newListCourseFields);
      setCurrentSelectIndex(e.target.index);
      setValue("courseIds", newListCourseFields);
    }
  };

  const updateStateData = (res) => {
    setDataVouchers(res || []);
    setOpenOptions(
      res?.map((_, index) => ({
        index,
        open: false,
      }))
    );
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

  const handleReset = () => {
    setEditing({
      edit: false,
      data: null,
    });
    setDeleting({
      delete: false,
      id: null,
    });
    setCurrentSelectIndex(0);
    setDataListCourseFields([]);
    setOpenOptions((prevOptions) =>
      prevOptions.map((item) => ({
        ...item,
        open: false,
      }))
    );
    setOpenModal(false);
  };

  const onSubmit = async (data) => {
    const apiData = {
      ...data,
      discount: Number(data.discount),
      usedCount: editing.edit ? countValue : 0,
      courseIds: dataListCourseFields,
    };

    toast
      .promise(
        editing.edit
          ? updateDataFn(editing.data.id, apiData)
          : createDataFn(apiData),
        {
          pending: editing.edit
            ? "Đang chỉnh sửa voucher..."
            : "Đang tạo voucher mới...",
        }
      )
      .then((res) => {
        if (!res.error) {
          toast.success(
            editing.edit
              ? "Chỉnh sửa thành công"
              : "Tạo voucher mới thành công!!!"
          );
          handleAfterCUDNewData();
        }

        handleReset();
        reset();
      });
  };

  const onDeleting = () => {
    console.log(deleting);

    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa voucher...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa voucher thành công!!!");
          handleAfterCUDNewData();
        }
      });

    handleReset();
  };

  const handleAfterCUDNewData = () => {
    setLoading(true);
    fetchDataFn()
      .then(updateStateData)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFn().then(updateStateData);
    getDataFn()
      .then((res) => {
        setDataCourses(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    dataCourses,
    dataVouchers,
    currentPage,
    totalPages,
    currentVouchers,
    dataListCourseFields,
    currentSelectIndex,
    loading,
    editing,
    deleting,
    openOptions,
    openModal,
    paginate,
    handleChangeListCourseFields,
    handleToggle,
    handleReset,
    onSubmit,
    onDeleting,
    toggleOpenModal,
    setCurrentPage,
    setCurrentSelectIndex,
    setDataListCourseFields,
    setOpenOptions,
    setOpenModal,
    setEditing,
    setDeleting,
    setLoading,
    setDataVouchers,
    setDataCourses,
    updateStateData,
  };
};

export default useVoucherTable;
