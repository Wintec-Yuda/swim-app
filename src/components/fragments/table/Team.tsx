import Modal from "@/components/templates/Modal";
import { errorAlert } from "@/utils/sweetalert";
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import AthleteTable from "./Athlete";

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
    if (!athletes) {
      errorAlert("Athletes not found");
      return;
    }
    setSelectedAthletes(athletes);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">No</th>
            <th className="th-td">Name</th>
            <th className="th-td">Email</th>
            <th className="th-td">Athletes</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users && users.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={4}>
                No data available
              </td>
            </tr>
          ) : (
            users &&
            users.map((user, index) => (
              <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
                <td className="th-td">{index + 1}</td>
                <td className="th-td">{user.fullname}</td>
                <td className="th-td">{user.email}</td>
                <td className="th-td">
                  <button onClick={() => handleAthletes(user.athletes)} className="relative">
                    <span className="absolute -top-2 -right-3 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{user.athletes.length}</span>
                    <FaUsers className="cursor-pointer text-blue-500 text-xl sm:text-2xl" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={selectedAthletes} setAthletes={setSelectedAthletes} />
        </>
      </Modal>
    </div>
  );
};

export default TeamTable;
