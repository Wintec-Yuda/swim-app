"use client";

import { Button } from "@/components/ui/button";
import HomeView from "@/components/views/Home";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const LandingPage = () => {
  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  return (
    <section className="bg-slate-200 px-4">
      <header className="bg-slate-300 p-3 flex justify-between">
        <h1 className="text-2xl font-semibold hidden md:block">Lomba Renang</h1>
        <nav>
          <ul className="flex">
            <li>
              <Button variant="link">
                <a href="#events">Event</a>
              </Button>
            </li>
            <li>
              <Button variant="link">
                <a href="#about">About</a>
              </Button>
            </li>
          </ul>
        </nav>
        <div className="flex gap-5">
          <Button>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button>
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <HomeView events={data?.data} />
      )}
      <footer className="bg-slate-300 py-3">
        <p className="text-center">&copy; 2024 Lomba Renang. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default LandingPage;
