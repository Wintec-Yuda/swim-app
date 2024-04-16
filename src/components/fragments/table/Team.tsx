import { FaUsers } from "react-icons/fa6";

interface User {
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
  users: User[];
  handleAthletes: (athletes: any[]) => void;
}

const TeamTable = ({ users, handleAthletes }: Props) => {
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
                  <button className="hover:border hover:border-blue-500 hover:p-1" onClick={() => handleAthletes(user.athletes)}>
                    <FaUsers className="cursor-pointer text-blue-500 text-xl sm:text-2xl" />
                  </button>
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
