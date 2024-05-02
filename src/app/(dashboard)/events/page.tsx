"use client";

import EventsView from "@/components/views/Events";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setEvent } from "@/store/slices/event";

const EventsPage = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/events", fetcher);
  
  if (!isLoading) dispatch(setEvent(data?.data))

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <EventsView />
  );
};

export default EventsPage;
