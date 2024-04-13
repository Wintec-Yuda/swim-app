"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/fragments/Loading";
import { useSession } from "next-auth/react";
import UserView from "@/components/views/User";

const AdminPage: React.FC = () => {
  const session: any = useSession();
  const id = session?.data?.user?.id;

  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return <main className="container mx-auto p-4">{isLoading ? <Loading /> : <UserView user={data?.data} />}</main>;
};

export default AdminPage;
