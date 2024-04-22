import userInstance from "@/instances/user";
import { formatDob } from "@/utils";
import { confirmAlert, errorAlert, successAlert } from "@/utils/sweetalert";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Modal from "@/components/templates/Modal";
import EventTable from "./Event";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import EventDetail from "../detail/Event";

interface Athlete {
  fullname: string;
  placeOfBirth: string;
  dateOfBirth: string;
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
                      <Button
                        variant="outline"
                        onClick={() =>
                          handleJoinEvent(
                            {
                              fullname: athlete.fullname,
                              placeOfBirth: athlete.placeOfBirth,
                              dob: athlete.dob,
                              gender: athlete.gender,
                              group: athlete.group,
                            },
                            index
                          )
                        }
                      >
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
                      <Button variant="outline" disabled={loading} onClick={() => handleDelete(index)}>
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
          <EventTable events={eventsByGender} setEvents={setEventsByGender} user={selectedUser} setAthletes={setAthletes} indexUser={selectedIndex} onClose={() => setModalJoinOpen(false)} />
        </>
      </Modal>
      <Modal isOpen={modalCekOpen} onClose={() => setModalCekOpen(false)}>
        {event && <EventDetail event={event} />}
      </Modal>
    </>
  );
};

export default AthleteTable;
