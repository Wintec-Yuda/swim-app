const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex min-h-screen bg-gray-100 justify-center items-center">{children}</div>;
};

export default Layout;
