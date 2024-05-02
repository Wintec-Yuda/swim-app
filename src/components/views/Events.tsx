import { useState } from "react";
import Modal from "../templates/Modal";
import EventForm from "../fragments/form/Event";
import EventTable from "../fragments/table/Event";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const EventsView = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const events = useSelector((state: any) => state.event.data);

  return (
    <>
      <div className="p-4">
        <Button className="bg-blue-700 mb-3 hover:bg-blue-900" onClick={() => setModalOpen(true)}>
          Add Event
        </Button>
        <EventTable events={events} />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add Event</h2>
          <EventForm onClose={() => setModalOpen(false)} />
        </>
      </Modal>
    </>
  );
};

export default EventsView;
