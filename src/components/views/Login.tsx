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
          <Input label="Email" name="email" type="email" required placeholder="example@gmail.com" />
          <Input label="Password" name="password" type="password" required placeholder="********" />
        </div>
        <div>
          <button type="submit" className="btn-submit">
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
