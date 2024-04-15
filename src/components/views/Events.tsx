import { useEffect, useState } from "react";
import Modal from "../templates/Modal";
import EventForm from "../fragments/EventForm";
import EventTable from "../fragments/EventTable";

const EventsView = ({ data }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    setEvents(data || []);
  }, []);
  const handleAddAthleteClick = () => {
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
      <button className="btn-button mb-4 ms-4" onClick={handleAddAthleteClick}>
        Add Event
      </button>
      <div>
        <EventTable events={events} setEvents={setEvents} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Add Event</h2>
        <EventForm onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default EventsView;
