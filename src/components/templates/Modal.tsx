import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen !== isModalOpen) {
      setIsModalOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50 cursor-pointer" onClick={handleCloseModal}></div>
          <div className="bg-white rounded-lg z-50 max-w-sm mx-auto">
            <button className="absolute top-0 right-0 m-4 p-2 rounded-full bg-red-500 hover:bg-red-700 text-slate-200 focus:outline-none" onClick={handleCloseModal}>
              <AiOutlineClose size={25} />
            </button>
            <div className="p-10">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
