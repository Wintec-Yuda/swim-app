import Modal from "@/components/templates/Modal";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import AthleteTable from "./Athlete";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const TeamTable = ({teams}: any) => {
  const [selectedAthletes, setSelectedAthletes] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleAthletes = (athletes: any) => {
    setSelectedAthletes(athletes);
    setModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>Table Teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Athletes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams ? (
            teams.map((team: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{team.fullname}</TableCell>
                <TableCell>{team.email}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleAthletes(team.athletes)} className="relative">
                    <span className="absolute -top-1 -right-2 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{team.athletes.length}</span>
                    <FaUsers className="cursor-pointer text-blue-700 text-xl sm:text-2xl" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {" "}
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={selectedAthletes} />{" "}
        </>{" "}
      </Modal>
    </>
  );
};

export default TeamTable;
