import Link from "next/link";
import { Button } from "../ui/button";

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
  link: string;
  linkText: string;
};

const AuthLayout = ({ title, children, link, linkText }: AuthLayoutProps) => {
  return (
    <section className="bg-slate-200 p-4 min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      {children}
      <p className="text-sm text-gray-600 mt-2">
        {linkText}
        <Button variant="link" className="text-blue-500">
          <Link href={link}>here</Link>
        </Button>
      </p>
    </section>
  );
};

export default AuthLayout;
