import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Loading from "../Loading";
import eventInstance from "@/instances/event";

const EventTable = ({ events, setEvents }: any) => {
  const [loading, setLoading] = useState(false);

  const session: any = useSession();
  const token = session?.data?.token;

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

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">No</th>
            <th className="th-td">Style</th>
            <th className="th-td">Number</th>
            <th className="th-td">Gender</th>
            <th className="th-td">Action</th>
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
                <td className="th-td">
                  <button className="btn-button bg-red-500 hover:bg-red-700" onClick={() => handleDelete(event.id, index)} disabled={loading}>
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loading && <Loading />}
    </div>
  );
};

export default EventTable;
