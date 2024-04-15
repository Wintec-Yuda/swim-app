"use client";

import Loading from "@/components/fragments/Loading";
import EventsView from "@/components/views/Events";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

const EventsPage = () => {
  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  return isLoading ? <Loading /> : <EventsView data={data?.data} />;
};

export default EventsPage;
