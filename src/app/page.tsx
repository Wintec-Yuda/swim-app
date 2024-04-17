import HomeView from "@/components/views/Home";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="px-5 bg-slate-100">
      <header className="bg-gray-900 py-4 px-5 md:px-10">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-white text-2xl font-semibold mb-2 md:mb-0">Lomba Renang</h1>
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a href="#home" className="text-white hover:text-gray-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-200">
                  About
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex">
            <Link href="/auth/login" className="bg-white text-gray-900 py-2 px-4 rounded-md hover:bg-gray-400 hover:font-bold mr-4">
              Login
            </Link>
            <Link href="/auth/register" className="bg-white text-gray-900 py-2 px-4 rounded-md hover:bg-gray-400 hover:font-bold">
              Register
            </Link>
          </div>
        </div>
      </header>
      <HomeView />
      <footer className="bg-gray-900 text-white py-6">
        <div className="mx-auto text-center">
          <p className="mb-2">&copy; 2024 Lomba Renang. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
