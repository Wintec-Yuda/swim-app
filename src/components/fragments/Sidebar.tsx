"use client";

import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string>("team");

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
  };

  return (
    <div className="bg-teal-500 w-48 md:w-64 flex-shrink-0">
      <div className="flex flex-col h-full justify-between">
        <div className="p-4">
          <h2 className="text-white text-lg font-bold">Swim Race</h2>
          <ul className="mt-4">
            <li className="mb-2">
              <Link href="/team">
                <button className={`btn-button w-full ${activeMenu === "team" ? "bg-blue-800" : ""}`} onClick={() => handleMenuClick("team")}>
                  Team
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
