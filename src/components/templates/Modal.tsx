import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal= ({ isOpen, onClose, children }: Props) => {
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
          <div className="bg-white p-4 rounded-lg z-50">
            <button className="absolute top-0 right-0 m-4 p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none" onClick={handleCloseModal}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
