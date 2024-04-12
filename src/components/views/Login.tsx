import React from "react";
import AuthLayout from "../templates/Auth";
import Input from "../ui/Input";

type LoginViewProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const LoginView = ({ handleSubmit }: LoginViewProps) => {
  return (
    <AuthLayout title="Login" link="/auth/register" linkText="Don't have an account?">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <Input id="email" name="email" type="email" required placeholder="Email address" />
          <Input id="password" name="password" type="password" required placeholder="Password" />
        </div>
        <div>
          <button type="submit" className="button-submit">
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
