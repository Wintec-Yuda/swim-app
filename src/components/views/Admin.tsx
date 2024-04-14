import { useState } from "react";
import Modal from "../templates/Modal";
import TeamTable from "../fragments/TeamTable";
import { errorAlert } from "@/utils/sweetalert";
import AthleteTable from "../fragments/AthleteTable";

const AdminView = ({ teams, isLoading }: any) => {
  const [selectedAthletes, setSelectedAthletes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAthletesClick = (athletes: any) => {
    if (!athletes) {
      errorAlert("Athletes not found");
      return;
    }
    setSelectedAthletes(athletes);
    setModalOpen(true);
  };

  return (
    <div>
      <TeamTable teams={teams} handleAthletesClick={handleAthletesClick} isLoading={isLoading} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Athletes</h2>
        <AthleteTable athletes={selectedAthletes} setAthletes={setSelectedAthletes} />
      </Modal>
    </div>
  );
};

export default AdminView;
