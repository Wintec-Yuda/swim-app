import { useEffect, useState } from "react";
import AthleteTable from "../fragments/AthleteTable";
import Modal from "../templates/Modal";
import AthleteForm from "../fragments/AthleteForm";

const AthletesView = ({ user = [] }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [athletes, setAthletes] = useState<any[]>(user.athletes || []);

  useEffect(() => {
    setAthletes(user.athletes || []);
  }, []);
  const handleAddAthleteClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (newAthlete: any) => {
    setModalOpen(false);
    if (newAthlete) {
      setAthletes((prevAthletes) => [...prevAthletes, newAthlete]);
    }
  };

  return (
    <>
      <div className="flex justify-between px-10">
        <div className="flex gap-10">
          <h1 className="text-3xl font-bold mb-4">Team {user.team}</h1>
          <div>
            <button className="btn-button" onClick={handleAddAthleteClick}>
              Add Athlete
            </button>
          </div>
        </div>
        <div>
          <p>Coach: {user.fullname}</p>
          <p>Phone: {user.phone}</p>
        </div>
      </div>
      <div>
        <AthleteTable athletes={athletes} setAthletes={setAthletes} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Add Athlete</h2>
        <AthleteForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AthletesView;
