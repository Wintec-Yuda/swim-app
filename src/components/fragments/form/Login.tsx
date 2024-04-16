"use client";

import { useState } from "react";
import useInput from "@/hooks/useInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import Input from "@/components/ui/Input";
import Loading from "../Loading";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.ok) {
        successAlert("Login successfully");
        router.push("/teams");
      } else {
        errorAlert("Email or password is incorrect");
      }
    } catch {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <Input label="Email" name="email" type="email" required placeholder="example@gmail.com" value={email} onChange={onChangeEmail} />
          <Input label="Password" name="password" type="password" required placeholder="********" value={password} onChange={onChangePassword} />
        </div>
        <div>
          <button type="submit" className="btn-submit" disabled={loading}>
            Login
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default LoginForm;
