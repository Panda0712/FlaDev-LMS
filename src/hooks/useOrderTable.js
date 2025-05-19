/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useOrderTable = ({ fetchDataFn, deleteDataFn }) => {
  const [dataOrders, setDataOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState({ delete: false, id: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [openOptions, setOpenOptions] = useState([]);

  const totalPages = Math.ceil(dataOrders?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLast = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - DEFAULT_ITEMS_PER_PAGE;
  const currentOrders = dataOrders?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAfterGetDatas = (res) => {
    setDataOrders(res || []);
    setOpenOptions((res || []).map((_, index) => ({ index, open: false })));
  };

  const handleReset = () => {
    setDeleting({ delete: false, id: null });
    setOpenOptions(dataOrders?.map((_, index) => ({ index, open: false })));
    setOpenModal(false);
  };

  const toggleOpenModal = () => setOpenModal(!openModal);

  const handleToggle = (type, data) => {
    setOpenModal(type === "options" ? false : true);
    if (type === "delete") setDeleting({ delete: true, id: data });
    else if (type === "options")
      setOpenOptions((prevOptions) =>
        prevOptions.map((item, index) =>
          index === data
            ? { ...item, open: !item.open }
            : { ...item, open: false }
        )
      );
  };

  const handleDeleteOrder = () => {
    toast
      .promise(deleteDataFn(deleting.id), {
        pending: "Đang xóa đơn khóa học...",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đơn mua khóa học thành công!");
          handleAfterDeletedData();
        }
        handleReset();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
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
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    dataOrders,
    loading,
    openModal,
    deleteDataFn,
    openOptions,
    totalPages,
    currentOrders,
    currentPage,
    handleReset,
    handleToggle,
    handleDeleteOrder,
    paginate,
    toggleOpenModal,
    setOpenModal,
  };
};

export default useOrderTable;
