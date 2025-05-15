import Modal from "~/components/Modal/Modal";
import Button from "~/components/Button/Button";

const FormModal = ({
  isOpen,
  onClose,
  handleSubmit,
  onSubmit,
  title,
  children,
  submitButtonText = "Submit",
  modalStyle = "w-[450px]",
}) => {
  if (!isOpen) return null;

  return (
    <Modal title={title} handleCloseModal={onClose} modalStyle={modalStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-4"
      >
        {children}

        <div className="flex justify-end mt-5">
          <Button title={submitButtonText} type="submit" />
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
