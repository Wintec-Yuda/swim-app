import React from "react";
import AuthLayout from "../templates/Auth";
import Input from "../ui/Input";

type RegisterViewProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterView = ({ handleSubmit }: RegisterViewProps) => {
  return (
    <AuthLayout title="Register" link="/auth/login" linkText="Already have an account?">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <Input label="Full name" name="fullname" type="text" required placeholder="Full Name" />
          <Input label="Team" name="team" type="text" required placeholder="Team" />
          <Input label="Phone" name="phone" type="number" required placeholder="085xxxxxxxxx" />
          <Input label="Email" name="email" type="email" required placeholder="example@gmail.com" />
          <Input label="Password" name="password" type="password" required placeholder="********" />
        </div>
        <div>
          <button type="submit" className="btn-submit">
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
