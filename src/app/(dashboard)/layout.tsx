"use client";

import Navbar from "@/components/fragments/Navbar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col flex-1">
          <Navbar />
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
