import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== isModalOpen) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50 cursor-pointer" onClick={() => onClose()}></div>
          <div className="bg-white rounded-lg z-50 max-w-full mx-auto relative">
            {" "}
            <button className="absolute top-0 right-0 m-4 p-2 rounded-full bg-red-500 hover:bg-red-700 text-slate-200 focus:outline-none" onClick={() => onClose()}>
              <AiOutlineClose size={15} />
            </button>
            <div className="p-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
