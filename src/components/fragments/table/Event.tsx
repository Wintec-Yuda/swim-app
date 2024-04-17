import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import Loading from "../Loading";
import eventInstance from "@/instances/event";
import userInstance from "@/instances/user";
import Modal from "@/components/templates/Modal";
import AthleteTable from "./Athlete";

const EventTable = ({ events, setEvents, user, setAthletes, indexUser, onClose }: any) => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [athletesEvent, setAthletesEvent] = useState<any[]>([]);

  const session: any = useSession();
  const token = session?.data?.token;
  const role = session?.data?.user?.role;

  const handleDelete = async (id: any, index: any) => {
    const confirmed = await confirmAlert("Yes, delete it!");

    if (confirmed) {
      setLoading(true);
      try {
        const response = await eventInstance.deleteEvent(id, token);
        if (response.data.success) {
          const updatedEvents = [...events];
          updatedEvents.splice(index, 1);
          setEvents(updatedEvents);
          successAlert("Event deleted successfully");
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

  const handleJoinEvent = async (id: any) => {
    const confirmed = await confirmAlert("Yes, join it!");

    if (confirmed) {
      setLoading(true);
      try {
        const response = await userInstance.addAthleteEvent(indexUser, id, user, token);
        if (response.data.success) {
          const eventData = response.data.data;

          setAthletes((prevAthletes: any) => {
            const updatedAthletes = [...prevAthletes];
            const athleteToUpdate = updatedAthletes[indexUser];
            athleteToUpdate.event = eventData;
            return updatedAthletes;
          });
          successAlert(response.data.message);
        } else {
          errorAlert("Internal Server Error");
        }
      } catch (error) {
        errorAlert("Internal Server Error");
      } finally {
        setLoading(false);
        onClose();
      }
    }
  };

  const handleAthletes = (athletes: any) => {
    if (athletes.length === 0) {
      errorAlert("Athletes not found");
      return;
    }
    setAthletesEvent(athletes);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">No</th>
            <th className="th-td">Style</th>
            <th className="th-td">Number</th>
            <th className="th-td">Gender</th>
            {role === "user" && <th className="th-td">Join event</th>}
            {role === "admin" && (
              <>
                <th className="th-td">Athletes</th>
                <th className="th-td">Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {events && events.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={5}>
                No data available
              </td>
            </tr>
          ) : (
            events &&
            events.map((event: any, index: any) => (
              <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
                <td className="th-td">{index + 1}</td>
                <td className="th-td">{event.style}</td>
                <td className="th-td">{event.number}</td>
                <td className="th-td">{event.gender}</td>
                {role === "user" && (
                  <td className="th-td">
                    <button className="btn-button bg-blue-500 hover:bg-blue-700" onClick={() => handleJoinEvent(event.id)} disabled={loading}>
                      Join
                    </button>
                  </td>
                )}
                {role === "admin" && (
                  <>
                    <td className="th-td">
                      <button onClick={() => handleAthletes(event.athletes)} className="relative">
                        <span className="absolute -top-2 -right-3 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{event.athletes.length}</span>
                        <FaUsers className="cursor-pointer text-blue-500 text-xl sm:text-2xl" />
                      </button>
                    </td>
                    <td className="th-td">
                      <button className="btn-button bg-red-500 hover:bg-red-700" onClick={() => handleDelete(event.id, index)} disabled={loading}>
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loading && <Loading />}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={athletesEvent} setAthletes={setAthletesEvent} />
        </>
      </Modal>
    </div>
  );
};

export default EventTable;
