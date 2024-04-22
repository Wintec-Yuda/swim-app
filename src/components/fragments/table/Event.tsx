import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import eventInstance from "@/instances/event";
import userInstance from "@/instances/user";
import Modal from "@/components/templates/Modal";
import AthleteTable from "./Athlete";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
    <>
      <Table>
        <TableCaption>Table Events</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Style</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Gender</TableHead>
            {role === "user" && <TableHead>Join Event</TableHead>}
            {role === "admin" && (
              <>
                <TableHead>Athletes</TableHead>
                <TableHead>Action</TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {events && events.length === 0 ? (
            <TableRow>
              <TableCell>No data available</TableCell>
            </TableRow>
          ) : (
            events &&
            events.map((event: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.style}</TableCell>
                <TableCell>{event.number}</TableCell>
                <TableCell>{event.gender}</TableCell>
                {role === "user" && (
                  <TableCell>
                    {loading ? (
                      <Button>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button onClick={() => handleJoinEvent(event.id)}>
                        Join
                      </Button>
                    )}
                  </TableCell>
                )}
                {role === "admin" && (
                  <>
                    <TableCell>
                      <Button variant="outline" onClick={() => handleAthletes(event.athletes)} className="relative">
                        <span className="absolute -top-2 -right-3 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{event.athletes.length}</span>
                        <FaUsers className="cursor-pointer text-blue-500 text-xl sm:text-2xl" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {loading ? (
                        <Button variant="outline">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                      ) : (
                        <Button variant="outline" disabled={loading} onClick={() => handleDelete(event.id, index)}>
                          <FaRegTrashCan className="text-red-700" />
                        </Button>
                      )}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {" "}
        <>
          <h2 className="text-xl font-bold mb-4">Athletes</h2>
          <AthleteTable athletes={athletesEvent} setAthletes={setAthletesEvent} />{" "}
        </>{" "}
      </Modal>
    </>
  );
};

export default EventTable;
