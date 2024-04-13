"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/fragments/Loading";
import AdminView from "@/components/views/Admin";
import { useSession } from "next-auth/react";

const AdminPage: React.FC = () => {
  const session: any = useSession();
  const token = session?.data?.token;

  const { data, error, isLoading } = useSWR("/api/users", () => fetcher("/api/users", token));

  return <main className="container mx-auto p-4">{isLoading ? <Loading /> : <AdminView teams={data?.data} />}</main>;
};

export default AdminPage;
