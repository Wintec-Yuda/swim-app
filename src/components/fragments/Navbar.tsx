"use client";

import { confirmAlert } from "@/utils/sweetalert";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Yes, come out now!");
    if (confirmed) signOut();
  };

  return (
    <nav className="bg-teal-500 h-16 flex items-center justify-between">
      <div className="px-4">
        <h2 className="text-white text-lg font-bold">Swim Race</h2>
      </div>
      <div className="px-4 hidden md:block">
        <button className="btn-button bg-rose-600 hover:bg-rose-900" onClick={() => handleSignOut()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
