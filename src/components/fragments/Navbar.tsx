import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { confirmAlert } from "@/utils/sweetalert";

const Navbar = () => {
  const session: any = useSession();
  const role = session?.data?.user?.role;

  const handleSignOut = async () => {
    const confirmed = await confirmAlert("Are you sure you want to sign out?");
    if (confirmed) signOut();
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Swim Race</h1>
        </div>
        <div className="md:flex md-flex-col md:items-center md:space-x-4">
          {role === "admin" && (
            <>
              <Link href="/teams" className="py-1 px-3 rounded-md bg-blue-700 hover:bg-blue-900 hover:text-gray-100">
                Teams
              </Link>
              <Link href={"/events"} className="py-1 px-3 rounded-md bg-blue-700 hover:bg-blue-900 hover:text-gray-300">
                Events
              </Link>
            </>
          )}
          {role === "user" && (
            <Link href="/athletes" className="py-1 px-3 rounded-md bg-blue-700 hover:bg-blue-900 hover:text-gray-100">
              Athletes
            </Link>
          )}
        </div>
        <div>
          <button className="btn-button bg-red-600 hover:bg-red-800" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
