"use client";

import Navbar from "@/components/fragments/Navbar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
