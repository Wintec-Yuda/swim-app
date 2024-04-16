import userInstance from "@/instances/user";
import { formatDob } from "@/utils";
import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Loading from "../Loading";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Modal from "@/components/templates/Modal";
import EventTable from "./Event";

interface Athlete {
  fullname: string;
  placeOfBirth: string;
  dob: string;
  gender: string;
  group: string;
  event: object;
}

interface Props {
  athletes: Athlete[];
  setAthletes: React.Dispatch<React.SetStateAction<Athlete[]>>;
}

const AthleteTable = ({ athletes, setAthletes }: Props) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [event, setEvent] = useState<any>(null);
  const [modalJoinOpen, setModalJoinOpen] = useState<boolean>(false);
  const [modalCekOpen, setModalCekOpen] = useState<boolean>(false);
  const [eventsByGender, setEventsByGender] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<any>(null);

  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  useEffect(() => {
    setEvents(data?.data || []);
  }, []);

  const session: any = useSession();
  const token = session?.data?.token;
  const role = session?.data?.user?.role;

  const handleDelete = async (index: any) => {
    const confirmed = await confirmAlert("Yes, delete it!");

    if (confirmed) {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  const handleJoinEvent = (user: any, index: any) => {
    const filteredEvents = events.filter((event) => event.gender === user.gender);
    setEventsByGender(filteredEvents);
    setSelectedUser(user);
    setSelectedIndex(index);
    setModalJoinOpen(true);
  };

  const handleCekEvent = (event: any) => {
    setEvent(event);
    setModalCekOpen(true);
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
            {role === "user" && <th className="th-td">Join event</th>}
            {role === "user" && <th className="th-td">Action</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {athletes && athletes.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={5}>
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
                {role === "user" &&
                  (athlete.event ? (
                    <td className="th-td">
                      <button className="btn-button bg-blue-700 hover:bg-blue-900" onClick={() => handleCekEvent(athlete.event)}>
                        Cek event
                      </button>
                    </td>
                  ) : (
                    <td className="th-td">
                      <button
                        className="btn-button bg-green-700 hover:bg-green-900"
                        onClick={() =>
                          handleJoinEvent(
                            {
                              name: athlete.fullname,
                              placeOfBirth: athlete.placeOfBirth,
                              dob: athlete.dob,
                              gender: athlete.gender,
                              group: athlete.group,
                            },
                            index
                          )
                        }
                      >
                        Daftar event
                      </button>
                    </td>
                  ))}
                {role === "user" && (
                  <td className="th-td">
                    <button className="btn-button bg-red-500 hover:bg-red-700" onClick={() => handleDelete(index)} disabled={loading}>
                      <FaRegTrashCan />
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loading && <Loading />}
      <Modal isOpen={modalJoinOpen} onClose={() => setModalJoinOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add athlete to event</h2>
          <EventTable events={eventsByGender} setEvents={setEventsByGender} user={selectedUser} setAthletes={setAthletes} indexUser={selectedIndex} onClose={() => setModalJoinOpen(false)} />
        </>
      </Modal>
      <Modal isOpen={modalCekOpen} onClose={() => setModalCekOpen(false)}>
        {event && (
          <>
            <h2 className="text-2xl font-bold mb-4">Event Details</h2>
            <div className="bg-white shadow-lg rounded-lg bg-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="shadow-md">
                  <p className="text-gray-600 font-semibold p-4 underline">Style</p>
                  <p className="text-lg p-4 -mt-5">{event.style}</p>
                </div>
                <div className="shadow-md">
                  <p className="text-gray-600 font-semibold p-4 underline">Number</p>
                  <p className="text-lg p-4 -mt-5">{event.number}</p>
                </div>
                <div className="shadow-md">
                  <p className="text-gray-600 font-semibold p-4 underline">Gender</p>
                  <p className="text-lg p-4 -mt-5">{event.gender}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AthleteTable;
