"use client";

import { useState } from "react";
import useSWR from "swr";
import AthleteTable from "@/components/templates/AthleteTable";
import Modal from "@/components/templates/Modal";
import TeamTable from "@/components/templates/TeamTable";
import { fetcher } from "@/utils/fetcher";

const LandingPage: React.FC = () => {
  const [selectedAthletes, setSelectedAthletes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR("/api/team", fetcher);

  const handleAthletesClick = (athletes: any) => {
    setSelectedAthletes(athletes);
    setModalOpen(true);
  };

  return (
    <>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Teams</h1>
        {!isLoading && <TeamTable teams={data?.data} handleAthletesClick={handleAthletesClick} />}
      </main>
      {!isLoading && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-2">Athletes</h2>
          <AthleteTable athletes={selectedAthletes} />
        </Modal>
      )}
    </>
  );
};

export default LandingPage;
