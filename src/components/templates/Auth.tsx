import Link from "next/link";

type AuthLayoutProps = {
  error?: string;
  title: string;
  children: React.ReactNode;
  link: string;
  linkText: string;
};

const AuthLayout = ({ error, title, children, link, linkText }: AuthLayoutProps) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {children}
      <p className="mt-4 text-sm text-gray-600">
        {linkText}{" "}
        <Link href={link} className="text-blue-500 hover:underline">
          here
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
