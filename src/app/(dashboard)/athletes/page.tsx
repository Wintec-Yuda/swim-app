"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import AthletesView from "@/components/views/Athletes";
import { Loader } from "lucide-react";

const AthletesPage: React.FC = () => {
  const session: any = useSession();
  const id = session?.data?.user?.id;

  const { data, error, isLoading } = useSWR(id ? `/api/user/${id}` : null, fetcher);

  return id && isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <AthletesView user={data?.data} />
  );
};

export default AthletesPage;
