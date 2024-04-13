"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Loading from "@/components/fragments/Loading";
import AdminView from "@/components/views/Admin";

const AdminPage: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  return <main className="container mx-auto p-4">{isLoading ? <Loading /> : <AdminView teams={data?.data} />}</main>;
};

export default AdminPage;
