/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useContactTable = ({ fetchDataFn, deleteDataFn }) => {
  const [dataContacts, setDataContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openOptions, setOpenOptions] = useState([]);

  const totalPages = Math.ceil(dataContacts?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLast = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - DEFAULT_ITEMS_PER_PAGE;
  const currentContacts = dataContacts?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAfterGetDatas = (res) => {
    setDataContacts(res || []);
    setOpenOptions(
      res?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleReset = () => {
    setOpenModal(false);
    setCurrentId(null);
    setOpenOptions(
      dataContacts?.map((_, index) => ({
        index,
        open: false,
      }))
    );
  };

  const handleToggleOptions = (currentIndex) =>
    setOpenOptions((prevOptions) =>
      prevOptions.map((item, index) =>
        index === currentIndex
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

  const handleDeleteContact = () => {
    toast
      .promise(deleteDataFn(currentId), {
        pending: "Đang xóa liên hệ",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa liên hệ thành công!!!");
          handleAfterDeletedData();
        }
        handleReset();
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
      .finally(() => setLoading(false));
  }, []);

  return {
    dataContacts,
    loading,
    currentContacts,
    totalPages,
    currentPage,
    paginate,
    openModal,
    currentId,
    openOptions,
    handleToggleOptions,
    handleDeleteContact,
    handleReset,
    setCurrentId,
    setOpenModal,
  };
};

export default useContactTable;
