import { createPortal } from "react-dom";

const Modal = ({ handleCloseModal, title, children, modalStyle }) => {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <section className="fixed left-0 right-0 bottom-0 top-0 inset-0 bg-black/50 z-1000 flex items-center justify-center">
      <div
        className={`bg-white relative p-4 rounded-lg max-h-[600px] 
          sm:max-w-[400px] max-w-[350px]
          w-full overflow-auto ${modalStyle}`}
      >
        <div className="flex justify-between items-center gap-2">
          <p className="font-semibold text-xl">{title}</p>
          <div
            onClick={handleCloseModal}
            className="cursor-pointer transition hover:opacity-80"
          >
            <span>❌</span>
          </div>
        </div>
        {children}
      </div>
    </section>,
    modalRoot
  );
};

export default Modal;
