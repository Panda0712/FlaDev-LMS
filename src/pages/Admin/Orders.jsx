import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import Loading from "~/components/Loading/Loading";
import useOrderTable from "~/hooks/useOrderTable";
import { formatVND } from "~/utils/formatters";
import { deleteOrder, fetchOrders } from "../../apis/endpoints";

const AdminOrders = () => {
  const {
    currentOrders,
    loading,
    totalPages,
    currentPage,
    openOptions,
    openModal,
    handleToggle,
    paginate,
    handleDeleteOrder,
    handleReset,
  } = useOrderTable({
    fetchDataFn: fetchOrders,
    deleteDataFn: deleteOrder,
  });

  const headerList = [
    {
      label: "Ảnh",
    },
    {
      label: "Học viên",
    },
    {
      label: "Khóa học",
      width: "w-[300px]",
    },
    {
      label: "Thanh toán",
    },
    {
      label: "Giá",
      width: "w-[150px]",
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
        onConfirm={handleDeleteOrder}
        title="Xóa đơn mua khóa"
        message="Bạn có chắc chắn muốn xóa đơn mua khóa không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <h1 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý đặt khóa học
      </h1>

      {currentOrders?.length ? (
        <AdminTable
          headers={headerList}
          data={currentOrders}
          renderRow={(order) => (
            <>
              <td className={`${tHeadStyle}`}>
                <img
                  src={order?.courseThumbnail}
                  className="object-cover md:w-[200px] md:h-[150px] sm:w-[150px] sm:h-[100px] 
                  w-[120px] h-[80px] mx-auto rounded-sm"
                  alt=""
                />
              </td>
              <td className={`${tHeadStyle}`}>{order?.userName}</td>
              <td className={`${tHeadStyle}`}>{order?.courseName}</td>
              <td className={`${tHeadStyle}`}>{order?.paymentMethod}</td>
              <td className={`${tHeadStyle}`}>
                {formatVND(order?.totalPrice)}đ
              </td>
            </>
          )}
          openOptions={openOptions}
          handleToggleOptions={(idx) => handleToggle("options", idx)}
          optionItems={[
            {
              label: "Xóa đơn mua",
              onClick: (order) => handleToggle("delete", order?.id),
            },
          ]}
          tHeadStyle={tHeadStyle}
          optionStyle={optionStyle}
          responsiveStyle="max-[900px]:min-w-[1050px]"
        />
      ) : (
        <div className="flex my-12 items-center justify-center">
          <h2>Hiện chưa có đơn mua nào!!!</h2>
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

export default AdminOrders;
