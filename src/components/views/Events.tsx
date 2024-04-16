import { useEffect, useState } from "react";
import Modal from "../templates/Modal";
import EventForm from "../fragments/form/Event";
import EventTable from "../fragments/table/Event";

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <button className="btn-button mb-4 ms-4" onClick={handleAddEventClick}>
          Add Event
        </button>
        <div>
          <EventTable events={events} setEvents={setEvents} />
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          <EventForm onClose={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};

export default EventsView;
