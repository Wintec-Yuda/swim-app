import { useState } from "react";
import AthleteTable from "../fragments/table/Athlete";
import Modal from "../templates/Modal";
import AthleteForm from "../fragments/form/Athlete";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { setEvent } from "@/store/slices/event";
import { fetcher } from "@/utils/fetcher";

const AthletesView = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const athletes = useSelector((state: any) => state.athlete.data);
  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  if (!isLoading) dispatch(setEvent(data?.data));

  return (
    <>
      <section className="flex justify-between p-4">
        <div className="flex gap-2">
          <h1 className="text-3xl font-bold hidden md:block">Team</h1>
          <Button className="bg-blue-700 hover:bg-blue-900" onClick={() => setModalOpen(true)}>
            Add Athlete
          </Button>
        </div>
        <div>
          <p>Coach: </p>
          <p>Phone: </p>
        </div>
      </section>
      <section className="p-4">
        <AthleteTable athletes={athletes} />
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <>
          <h2 className="text-xl font-bold mb-4">Add Athlete</h2>
          <AthleteForm onClose={() => setModalOpen(false)} />
        </>
      </Modal>
    </>
  );
};

export default AthletesView;
