"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import TeamsView from "@/components/views/Teams";
import { Loader } from "lucide-react";

const TeamsPage: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <TeamsView users={data?.data} />
  );
};

export default TeamsPage;
