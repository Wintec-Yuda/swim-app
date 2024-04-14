import { FaUsers } from "react-icons/fa6";
import Loading from "./Loading";

interface Team {
  fullname: string;
  email: string;
  role: string;
  coach: {
    name: string;
    phone: string;
  };
  athletes: any[];
}

interface Props {
  teams: Team[];
  handleAthletesClick: (athletes: any[]) => void;
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
          {teams && teams.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={4}>
                No data available
              </td>
            </tr>
          ) : (
            teams &&
            teams.map((team, index) => (
              <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
                <td className="th-td">{index + 1}</td>
                <td className="th-td">{team.fullname}</td>
                <td className="th-td">{team.email}</td>
                <td className="th-td">
                  <div className="flex justify-center">
                    <FaUsers className="cursor-pointer text-blue-500 text-xl" onClick={() => handleAthletesClick(team.athletes)} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
