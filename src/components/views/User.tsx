import { useState } from "react";
import AthleteTable from "../fragments/AthleteTable";
import Modal from "../templates/Modal";
import AthleteForm from "../fragments/AthleteForm";

const UserView = ({ user = [] }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAddAthleteClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between px-10">
        <div className="flex gap-10">
          <h1 className="text-3xl font-bold mb-4">Team {user?.team}</h1>
          <div>
            <button className="btn-button" onClick={handleAddAthleteClick}>
              Add Athlete
            </button>
          </div>
        </div>
        <div>
          <p>Coach: {user?.fullname}</p>
          <p>Phone: {user?.phone}</p>
        </div>
      </div>
      <div>
        <AthleteTable athletes={user?.athletes} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Add Athlete</h2>
        <AthleteForm />
      </Modal>
    </>
  );
};

export default UserView;
