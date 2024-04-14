"use client";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import AdminView from "@/components/views/Admin";
import { useSession } from "next-auth/react";

const AdminPage: React.FC = () => {
  const session: any = useSession();
  const token = session?.data?.token;

  const { data, error, isLoading } = useSWR("/api/users", () => fetcher("/api/users", token));

  return (
    <main className="container mx-auto p-4">
      <AdminView teams={data?.data} isLoading={isLoading} />
    </main>
  );
};

export default AdminPage;
