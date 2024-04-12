import Navbar from "@/components/fragments/Navbar";
import Sidebar from "@/components/fragments/Sidebar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
