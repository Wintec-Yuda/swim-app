"use client";

import { useRouter } from "next/navigation";
import authInstance from "@/instances/auth";
import RegisterView from "@/components/views/Register";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useState } from "react";

const RegisterPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      team: form.team.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      await authInstance
        .register(data)
        .then((response) => {
          successAlert(response.data.message);
          push("/auth/login");
        })
        .catch((error) => {
          errorAlert(error.response.data.message);
        });
    } catch (error) {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return <RegisterView handleSubmit={handleSubmit} loading={loading} />;
};

export default RegisterPage;
