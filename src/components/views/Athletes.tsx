import { useEffect, useState } from "react";
import AthleteTable from "../fragments/table/Athlete";
import Modal from "../templates/Modal";
import AthleteForm from "../fragments/form/Athlete";
import { Button } from "../ui/button";

const AthletesView = ({ user = [] }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [athletes, setAthletes] = useState<any[]>(user.athletes || []);

  useEffect(() => {
    setAthletes(user?.athletes || []);
  }, []);

  const handleCloseModal = (newAthlete: any) => {
    setModalOpen(false);
    if (newAthlete) {
      setAthletes((prevAthletes) => [...prevAthletes, newAthlete]);
    }
  };

  return (
    <>
      <section className="flex justify-between p-4">
        <div className="flex gap-2">
          <h1 className="text-3xl font-bold hidden md:block">Team {user.team}</h1>
          <Button className="bg-blue-700 hover:bg-blue-900" onClick={() => setModalOpen(true)}>Add Athlete</Button>
        </div>
        <div>
          <p>Coach: {user.fullname}</p>
          <p>Phone: {user.phone}</p>
        </div>
      </section>
      <section className="p-4">
        <AthleteTable athletes={athletes} setAthletes={setAthletes} />
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add Athlete</h2>
          <AthleteForm onClose={handleCloseModal} />
        </>
      </Modal>
    </>
  );
};

export default AthletesView;
