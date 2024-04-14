import { confirmAlert } from "@/utils/sweetalert";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { MdEvent } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { FaSwimmer } from "react-icons/fa";

const Navbar = () => {
  const session: any = useSession();
  const role = session?.data?.user?.role;

  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Yes, come out now!");
    if (confirmed) signOut();
  };

  return (
    <nav className="bg-teal-500 h-16 flex items-center justify-between">
      <div className="px-4 flex items-center justify-between gap-10">
        <h2 className="text-white text-lg font-bold">Swim Race</h2>
        {role === "admin" && (
          <>
            <div className="bg-transparent p-3 hover:bg-teal-700">
              <Link href="/teams" className="text-slate-100 font-bold hover:underline">
                <span className="flex items-center gap-2">
                  <TiGroupOutline size={25} /> Team
                </span>
              </Link>
            </div>
            <div className="bg-transparent p-3 hover:bg-teal-700">
              <Link href="/events" className="text-slate-100 font-bold hover:underline">
                <span className="flex items-center gap-2">
                  <MdEvent size={25} /> Event
                </span>
              </Link>
            </div>
          </>
        )}
        {role === "user" && (
          <>
            <div className="bg-transparent p-3 hover:bg-teal-700">
              <Link href="/teams" className="text-slate-100 font-bold hover:underline">
                <span className="flex items-center gap-2">
                  <FaSwimmer size={25} /> Athletes
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="px-4 hidden md:block">
        <div className="relative">
          <button className="btn-button bg-rose-600 hover:bg-rose-900" onClick={() => handleSignOut()}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
