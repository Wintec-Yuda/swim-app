"use client";

import { useRouter } from "next/navigation";
import authInstance from "@/instances/auth";
import RegisterView from "@/components/views/Register";
import { errorAlert, successAlert } from "@/utils/sweetalert";

const RegisterPage = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await authInstance.register(data);
      successAlert(response.data.message);
      push("/auth/login");
    } catch (error) {
      errorAlert("Internal Server Error");
    }
  };

  return <RegisterView handleSubmit={handleSubmit} />;
};

export default RegisterPage;
