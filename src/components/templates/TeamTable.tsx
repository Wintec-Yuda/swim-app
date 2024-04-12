import { FaUsers } from "react-icons/fa";

interface Team {
  fullname: string;
  email: string;
  coach: {
    name: string;
    phone: string;
  };
  athletes: any[]; // Sesuaikan dengan tipe data atlet yang sesuai
}

interface Props {
  teams: Team[];
  handleAthletesClick: (athletes: any[]) => void; // Sesuaikan dengan tipe data atlet yang sesuai
}

const TeamTable = ({ teams, handleAthletesClick }: Props) => {
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
          {teams.map((team, index) => (
            <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
              <td className="th-td">{index + 1}</td>
              <td className="th-td whitespace-nowrap">{team.fullname}</td>
              <td className="th-td">{team.email}</td>
              <td className="th-td">
                <FaUsers className="cursor-pointer text-blue-500 text-xl" onClick={() => handleAthletesClick(team.athletes)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
