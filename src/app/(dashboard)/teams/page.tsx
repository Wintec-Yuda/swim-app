"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import TeamsView from "@/components/views/Teams";
import { Loader } from "lucide-react";
import { setTeam } from "@/store/slices/team";
import { useDispatch } from "react-redux";

const TeamsPage: React.FC = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (!isLoading) dispatch(setTeam(data?.data));

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <TeamsView />
  );
};

export default TeamsPage;
