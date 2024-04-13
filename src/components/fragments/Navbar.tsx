"use client";

import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="bg-teal-500 h-16 flex items-center justify-between">
      <div className="px-4">
        <h2 className="text-white text-lg font-bold">Swim Race</h2>
      </div>
      <div className="px-4 hidden md:block">
        <button className="btn-button bg-rose-600 hover:bg-rose-900" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
