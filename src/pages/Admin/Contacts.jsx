import { Spin } from "antd";
import AdminTable from "~/components/AdminTable/AdminTable";
import DeleteConfirmationModal from "~/components/DeleteConfirmationModal/DeleteConfirmationModal";
import useContactTable from "~/hooks/useContactTable";
import { deleteContact, fetchContacts } from "../../apis/endpoints";

const AdminContacts = () => {
  const {
    currentContacts,
    loading,
    totalPages,
    currentPage,
    openOptions,
    openModal,
    handleToggleOptions,
    paginate,
    handleDeleteContact,
    handleReset,
    setOpenModal,
    setCurrentId,
  } = useContactTable({
    fetchDataFn: fetchContacts,
    deleteDataFn: deleteContact,
  });

  const headerList = [
    {
      label: "Tên",
    },
    {
      label: "Email",
    },
    {
      label: "Số điện thoại",
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

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col max-[900px]:overflow-auto min-h-screen">
      <DeleteConfirmationModal
        isOpen={openModal}
        onClose={handleReset}
        onConfirm={handleDeleteContact}
        title="Xóa liên hệ"
        message="Bạn có chắc chắn muốn xóa liên hệ không? Sau khi xóa không thể hoàn tác!"
        confirmButtonText="Xóa"
        cancelButtonText="Trở lại"
        modalStyle="w-[450px]"
      />

      <h3 className="lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-medium">
        Quản lý liên hệ
      </h3>

      {currentContacts?.length ? (
        <AdminTable
          headers={headerList}
          data={currentContacts}
          renderRow={(contact) => (
            <>
              <td className={`${tHeadStyle}`}>{contact?.name}</td>
              <td className={`${tHeadStyle}`}>{contact?.email}</td>
              <td className={`${tHeadStyle}`}>{contact?.phone}</td>
              <td className={`${tHeadStyle}`}>{contact?.message}</td>
            </>
          )}
          openOptions={openOptions}
          handleToggleOptions={(idx) => handleToggleOptions(idx)}
          optionItems={[
            {
              label: "Xóa liên hệ",
              onClick: (contact) => {
                setOpenModal(true);
                setCurrentId(contact.id);
              },
            },
          ]}
          tHeadStyle={tHeadStyle}
          optionStyle={optionStyle}
          responsiveStyle="max-[900px]:min-w-[1050px]"
        />
      ) : (
        <div className="flex my-12 items-center justify-center">
          <h2>Hiện chưa có liên hệ nào!!!</h2>
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

export default AdminContacts;
