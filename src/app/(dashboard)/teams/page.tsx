"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import Loading from "@/components/fragments/Loading";
import TeamsView from "@/components/views/Teams";

const TeamsPage: React.FC = () => {
  const session: any = useSession();
  const token = session?.data?.token;

  const { data, error, isLoading } = useSWR("/api/users", () => fetcher("/api/users", token));

  return isLoading ? <Loading /> : <TeamsView teams={data?.data} />;
};

export default TeamsPage;
