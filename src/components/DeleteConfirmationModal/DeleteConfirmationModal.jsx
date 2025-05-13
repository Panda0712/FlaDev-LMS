import Button from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xóa",
  message = "Bạn có chắc chắn muốn xóa không? Sau khi xóa không thể hoàn tác!",
  confirmButtonText = "Xóa",
  cancelButtonText = "Trở lại",
  modalStyle = "w-[450px]",
}) => {
  if (!isOpen) return null;

  return (
    <Modal title={title} handleCloseModal={onClose} modalStyle={modalStyle}>
      <div className="mt-6 relative">
        <p className="text-black">{message}</p>

        <div className="flex justify-end">
          <div className="flex items-center gap-2 mt-8">
            <Button title={cancelButtonText} type="cancel" onClick={onClose} />
            <Button
              title={confirmButtonText}
              type="warning"
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
