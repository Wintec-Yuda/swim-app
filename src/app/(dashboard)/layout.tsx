"use client";

import Navbar from "@/components/fragments/Navbar";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <section className="min-h-screen bg-slate-200">
        <Navbar />
        <div className="">{children}</div>
      </section>
    </SessionProvider>
  );
};

export default Layout;
