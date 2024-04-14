"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/fragments/Loading";
import { useSession } from "next-auth/react";
import AthletesView from "@/components/views/Athletes";

const AthletesPage: React.FC = () => {
  const session: any = useSession();
  const id = session?.data?.user?.id;
  const token = session?.data?.token;

  const { data, error, isLoading } = useSWR(`/api/user/${id}`, () => fetcher(`/api/user/${id}`, token));

  return isLoading ? <Loading /> : <AthletesView user={data?.data} />;
};

export default AthletesPage;
