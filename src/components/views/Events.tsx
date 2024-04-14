import EventTable from "../fragments/EventTable";

const EventsView = ({ events }: any) => {
  return (
    <>
      <button className="btn-button mb-4 ms-10">Add Event</button>
      <div>
        <EventTable events={events} />
      </div>
    </>
  );
};

export default EventsView;
