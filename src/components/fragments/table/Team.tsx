import Modal from "@/components/templates/Modal";
import { errorAlert } from "@/utils/sweetalert";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import AthleteTable from "./Athlete";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface User {
  fullname: string;
  email: string;
  role: string;
  phone: string;
  team: string;
  athletes: any[];
}

interface Props {
  users: User[];
}

const TeamTable = ({ users }: Props) => {
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
          {users && users.length === 0 ? (
            <TableRow>
              <TableCell>No data available</TableCell>
            </TableRow>
          ) : (
            users &&
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => handleAthletes(user.athletes)} className="relative">
                    <span className="absolute -top-1 -right-2 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{user.athletes.length}</span>
                    <FaUsers className="cursor-pointer text-blue-700 text-xl sm:text-2xl" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {" "}
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={selectedAthletes} setAthletes={setSelectedAthletes} />{" "}
        </>{" "}
      </Modal>
    </>
  );
};

export default TeamTable;
