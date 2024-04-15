"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/fragments/Loading";
import TeamsView from "@/components/views/Teams";

const TeamsPage: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  return isLoading ? <Loading /> : <TeamsView teams={data?.data} />;
};

export default TeamsPage;
