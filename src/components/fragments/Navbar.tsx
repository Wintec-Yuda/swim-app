import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { confirmAlert } from "@/utils/sweetalert";
import { Button } from "../ui/button";

const Navbar = () => {
  const session: any = useSession();
  const role: string = session?.data?.user?.role;

  const handleSignOut = async () => {
    const confirmed: boolean = await confirmAlert("Are you sure you want to sign out?");
    if (confirmed) signOut();
  };

  return (
    <nav className="bg-slate-300 flex justify-between px-5 py-2">
      <div className="hidden sm:flex items-center">
        <h1 className="text-lg font-bold">Swim Race</h1>
      </div>
      <div className="flex gap-5">
        {role === "admin" && (
          <>
            <Button>
              <Link href="/teams">Teams</Link>
            </Button>
            <Button>
              <Link href="/events">Events</Link>
            </Button>
          </>
        )}
        {role === "user" && (
          <Button>
            <Link href="/athletes">Athletes</Link>
          </Button>
        )}
      </div>
      <Button variant="destructive" onClick={handleSignOut}>Logout</Button>
    </nav>
  );
};

export default Navbar;
