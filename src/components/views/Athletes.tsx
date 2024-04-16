import { useEffect, useState } from "react";
import AthleteTable from "../fragments/table/Athlete";
import Modal from "../templates/Modal";
import AthleteForm from "../fragments/form/Athlete";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <h1 className="text-3xl font-bold">Team {user.team}</h1>
            <button className="btn-button" onClick={handleAddAthleteClick}>
              Add Athlete
            </button>
          </div>
          <div className="text-sm">
            <p>Coach: {user.fullname}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </div>
        <AthleteTable athletes={athletes} setAthletes={setAthletes} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Athlete</h2>
          <AthleteForm onClose={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

export default AthletesView;
