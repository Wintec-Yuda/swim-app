"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import AthletesView from "@/components/views/Athletes";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAthlete } from "@/store/slices/athlete";

const AthletesPage: React.FC = () => {
  const dispatch = useDispatch();
  const session: any = useSession();
  const id = session?.data?.user?.id;

  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher);

  if (!isLoading) dispatch(setAthlete(data?.data.athletes));

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <AthletesView />
  );
};

export default AthletesPage;
