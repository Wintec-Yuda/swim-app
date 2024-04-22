import { useEffect, useState } from "react";
import Modal from "../templates/Modal";
import EventForm from "../fragments/form/Event";
import EventTable from "../fragments/table/Event";
import { Button } from "../ui/button";

const EventsView = ({ data }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setEvents(data || []);
  }, []);

  const handleAddEventClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (newEvent: any) => {
    setModalOpen(false);
    if (newEvent) {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  return (
    <>
      <div className="p-4">
        <Button className="bg-blue-700 mb-3 hover:bg-blue-900" onClick={handleAddEventClick}>
          Add Event
        </Button>
        <EventTable events={events} setEvents={setEvents} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          <EventForm onClose={handleCloseModal} />
        </>
      </Modal>
    </>
  );
};

export default EventsView;
