const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen bg-gray-100 justify-center items-center">{children}</div>;
};

export default Layout;
