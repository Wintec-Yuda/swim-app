"use client";

import EventsView from "@/components/views/Events";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import useSWR from "swr";

const EventsPage = () => {
  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <EventsView data={data?.data} />
  );
};

export default EventsPage;
