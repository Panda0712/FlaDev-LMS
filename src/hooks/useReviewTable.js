/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEFAULT_ITEMS_PER_PAGE } from "~/utils/constants";

const useReviewTable = ({ fetchDataFn, fetchDataSecondFn, deleteDataFn }) => {
  const [dataReviews, setDataReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openOptions, setOpenOptions] = useState([]);

  const totalPages = Math.ceil(dataReviews?.length / DEFAULT_ITEMS_PER_PAGE);
  const indexOfLast = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - DEFAULT_ITEMS_PER_PAGE;
  const currentReviews = dataReviews?.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAfterGetDatas = (res) => {
    const dataList = res || [];
    const dataNamePromise = dataList?.map((data) =>
      fetchDataSecondFn(data?.courseId)
    );
    Promise.all(dataNamePromise)
      .then((res) => {
        const courseNames = res?.map((course) => course?.name);
        const newReviewsList = dataList?.map((review, index) => ({
          ...review,
          courseName: courseNames[index] || "",
        }));
        setDataReviews(newReviewsList || []);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      })
      .finally(() => setLoading(false));
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
      dataReviews?.map((_, index) => ({
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

  const handleDeleteReview = () => {
    toast
      .promise(deleteDataFn(currentId), {
        pending: "Đang xóa đánh giá",
      })
      .then((res) => {
        if (!res.error) {
          toast.success("Xóa đánh giá thành công!!!");
          handleAfterDeletedData();
        }
        handleReset();
      });
  };

  const handleAfterDeletedData = () => {
    setLoading(true);
    fetchDataFn()
      .then(handleAfterGetDatas)
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFn()
      .then(handleAfterGetDatas)
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
        setLoading(false);
      });
  }, []);

  return {
    dataReviews,
    loading,
    currentReviews,
    totalPages,
    currentPage,
    openModal,
    currentId,
    openOptions,
    paginate,
    handleToggleOptions,
    handleDeleteReview,
    handleReset,
    setCurrentId,
    setOpenModal,
  };
};

export default useReviewTable;
