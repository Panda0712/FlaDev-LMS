import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import Loading from "~/components/Loading/Loading";
import Star from "~/components/Star/Star";
import useReviewTable from "~/hooks/useReviewTable";
import {
  deleteReview,
  fetchCourseById,
  fetchReviews,
} from "../../apis/endpoints";

const AdminReviews = () => {
  const {
    currentReviews,
    loading,
    totalPages,
    currentPage,
    openOptions,
    openModal,
    handleToggleOptions,
    paginate,
    handleDeleteReview,
    handleReset,
    setOpenModal,
    setCurrentId,
  } = useReviewTable({
    fetchDataFn: fetchReviews,
    fetchDataSecondFn: fetchCourseById,
    deleteDataFn: deleteReview,
  });

  const headerList = [
    {
      label: "Ảnh",
    },
    {
      label: "Tên",
    },
    {
      label: "Khóa học",
      width: "w-[200px]",
    },
    {
      label: "Đánh giá",
    },
    {
      label: "Nội dung",
      width: "w-[300px]",
    },
    {
      label: "",
      width: "w-[100px]",
    },
  ];

  const tHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const optionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={handleDeleteReview}
        title="Xóa đánh giá"
        message="Bạn có chắc chắn muốn xóa đánh giá không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <div className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        <h1>Quản lý đánh giá</h1>
      </div>

      {currentReviews?.length ? (
        <AdminTable
          headers={headerList}
          data={currentReviews}
          renderRow={(review) => (
            <>
              <td className={`${tHeadStyle}`}>
                <img
                  src={review?.userAvatar}
                  className="object-cover
                  w-[80px] h-[80px] mx-auto rounded-full"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{review?.userName}</td>
              <td className={`${tHeadStyle}`}>{review?.courseName}</td>
              <td className={`${tHeadStyle}`}>
                <div className="w-full flex justify-center">
                  <Star className="mx-auto" value={review?.rating} />
                </div>
              </td>
              <td className={`${tHeadStyle}`}>{review?.content}</td>
            </>
          )}
          openOptions={openOptions}
          handleToggleOptions={(idx) => handleToggleOptions(idx)}
          optionItems={[
            {
              label: "Xóa đánh giá",
              onClick: (review) => {
                setOpenModal(true);
                setCurrentId(review.id);
              },
            },
          ]}
          tHeadStyle={tHeadStyle}
          optionStyle={optionStyle}
          responsiveStyle="max-[900px]:min-w-[1050px]"
        />
      ) : (
        <div className="flex my-12 items-center justify-center">
          <h2>Hiện chưa có đánh giá nào!!!</h2>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center my-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md border text-[14px] ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-600"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
