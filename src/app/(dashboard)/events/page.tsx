"use client";

import Loading from "@/components/fragments/Loading";
import EventsView from "@/components/views/Events";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const EventsPage = () => {
  const session: any = useSession();
  const token = session?.data?.token;

  const { data, error, isLoading } = useSWR("/api/events", () => fetcher("/api/events", token));

  return isLoading ? <Loading /> : <EventsView events={data?.data} />;
};

export default EventsPage;
