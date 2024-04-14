"use client";

import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import LoginView from "@/components/views/Login";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
      });

      if (res?.ok) {
        successAlert("Login successfully");
        push("/teams");
      } else {
        errorAlert("Email or password is incorrect");
      }
    } catch {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return <LoginView handleSubmit={handleSubmit} loading={loading} />;
};

export default LoginPage;
