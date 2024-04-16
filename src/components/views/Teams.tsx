import { useState } from "react";
import Modal from "../templates/Modal";
import TeamTable from "../fragments/table/Team";
import { errorAlert } from "@/utils/sweetalert";
import AthleteTable from "../fragments/table/Athlete";

const TeamsView = ({ users }: any) => {
  const [selectedAthletes, setSelectedAthletes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAthletes = (athletes: any) => {
    if (!athletes) {
      errorAlert("Athletes not found");
      return;
    }
    setSelectedAthletes(athletes);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <TeamTable users={users} handleAthletes={handleAthletes} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={selectedAthletes} setAthletes={setSelectedAthletes} />
        </>
      </Modal>
    </div>
  );
};

export default TeamsView;
