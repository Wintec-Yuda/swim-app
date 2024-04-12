import React from "react";
import AuthLayout from "../templates/Auth";
import Input from "../ui/Input";

type RegisterViewProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RegisterView= ({ handleSubmit }: RegisterViewProps) => {
  return (
    <AuthLayout title="Register" link="/auth/login" linkText="Already have an account?">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <Input id="fullname" name="fullname" type="text" required placeholder="fullname" />
          <Input id="email" name="email" type="email" required placeholder="Email" />
          <Input id="password" name="password" type="password" required placeholder="Password" />
        </div>
        <div>
          <button type="submit" className="button-submit">
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
