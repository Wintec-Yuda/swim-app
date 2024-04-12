"use client";

import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import LoginView from "@/components/views/Login";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
      });

      if (res?.ok) {
        successAlert("Login successfully");
        push("/user");
      } else {
        errorAlert("Email or password is incorrect");
      }
    } catch {
      errorAlert("Internal Server Error");
    }
  };

  return <LoginView handleSubmit={handleSubmit} />;
};

export default LoginPage;
