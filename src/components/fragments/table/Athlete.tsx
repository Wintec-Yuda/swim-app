import userInstance from "@/instances/user";
import { formatDob } from "@/utils";
import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "@/components/templates/Modal";
import EventTable from "./Event";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import EventDetail from "../detail/Event";
import { useDispatch, useSelector } from "react-redux";
import { deleteAthlete } from "@/store/slices/athlete";

const AthleteTable = ({ athletes }: any) => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [modalJoinOpen, setModalJoinOpen] = useState<boolean>(false);
  const [modalCekOpen, setModalCekOpen] = useState<boolean>(false);
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null);
  const [eventsByGender, setEventsByGender] = useState<any>(null);

  const dispatch = useDispatch();
  const session: any = useSession();
  const token = session?.data?.token;
  const role = session?.data?.user?.role;
  const events = useSelector((state: any) => state.event.data);

  const handleDelete = async (data: any) => {
    const confirmed = await confirmAlert("Yes, delete it!");

    if (confirmed) {
      setLoading(true);
      try {
        const response = await userInstance.deleteAthlete(data, token);
        dispatch(deleteAthlete(data.athleteId));
        if (response.data.success) {
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

  const handleJoinEvent = (athlete: any) => {
    setSelectedAthlete(athlete);
    const eventsSameGender = events.filter((event: any) => event.gender === athlete.gender);
    setEventsByGender(eventsSameGender);
    setModalJoinOpen(true);
  };

  const handleCekEvent = (event: any) => {
    setEvent(event);
    setModalCekOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>Table Athletes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Place, Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Group</TableHead>
            {role === "user" && <TableHead>Join Event</TableHead>}
            {role === "user" && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {athletes && athletes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No data available</TableCell>
            </TableRow>
          ) : (
            athletes &&
            athletes.map((athlete: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{athlete.fullname}</TableCell>
                <TableCell>{formatDob(athlete.placeOfBirth, athlete.dateOfBirth)}</TableCell>
                <TableCell>{athlete.gender}</TableCell>
                <TableCell>{athlete.group}</TableCell>
                {role === "user" &&
                  (athlete.event ? (
                    <TableCell>
                      <Button variant="outline" onClick={() => handleCekEvent(athlete.event)}>
                        Cek Event
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Button variant="outline" onClick={() => handleJoinEvent(athlete)}>
                        Daftar Event
                      </Button>
                    </TableCell>
                  ))}
                {role === "user" && (
                  <TableCell>
                    {loading ? (
                      <Button variant="outline">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        disabled={loading}
                        onClick={() =>
                          handleDelete({
                            athleteId: athlete._id,
                            eventId: athlete.event?._id,
                          })
                        }
                      >
                        <FaRegTrashCan className="text-red-700" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Modal isOpen={modalJoinOpen} onClose={() => setModalJoinOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add athlete to event</h2>
          <EventTable events={eventsByGender} athlete={selectedAthlete} onClose={() => setModalJoinOpen(false)} />
        </>
      </Modal>
      <Modal isOpen={modalCekOpen} onClose={() => setModalCekOpen(false)}>
        {event && <EventDetail event={event} />}
      </Modal>
    </>
  );
};

export default AthleteTable;
