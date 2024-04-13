import userInstance from "@/instances/user";
import { formatDob } from "@/utils";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

interface Athlete {
  fullname: string;
  placeOfBirth: string;
  dob: string;
  gender: string;
  group: string;
}

interface Props {
  athletes: Athlete[];
  setAthletes: React.Dispatch<React.SetStateAction<Athlete[]>>;
}

const AthleteTable = ({ athletes, setAthletes }: Props) => {
  const session: any = useSession();
  const token = session?.data?.token;
  const role = session?.data?.user?.role;

  const handleDelete = async (index: any) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await userInstance.deleteAthlete(index, token);
        if (response.data.success) {
          const updatedAthletes = [...athletes];
          updatedAthletes.splice(index, 1);
          setAthletes(updatedAthletes);
          successAlert("Athlete deleted successfully");
        } else {
          errorAlert("Internal Server Error");
        }
      } catch (error) {
        errorAlert("Internal Server Error");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">No</th>
            <th className="th-td">Name</th>
            <th className="th-td">Place, Date of Birth</th>
            <th className="th-td">Gender</th>
            <th className="th-td">Group</th>
            {role === "user" && <th className="th-td">Action</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {athletes && athletes.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={4}>
                No data available
              </td>
            </tr>
          ) : (
            athletes &&
            athletes.map((athlete, index) => (
              <tr key={index} className="hover:bg-sky-100">
                <td className="th-td">{index + 1}</td>
                <td className="th-td">{athlete.fullname}</td>
                <td className="th-td">{formatDob(athlete.placeOfBirth, athlete.dob)}</td>
                <td className="th-td">{athlete.gender}</td>
                <td className="th-td">{athlete.group}</td>
                {role === "user" && (
                  <td className="th-td">
                    <button className="btn-button bg-red-500 hover:bg-red-700" onClick={() => handleDelete(index)}>
                      <FaRegTrashCan />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
