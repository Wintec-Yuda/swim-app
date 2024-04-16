"use client";

import { useState } from "react";
import useInput from "@/hooks/useInput";
import authInstance from "@/instances/auth";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Loading from "../Loading";

const RegisterForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [fullname, onChangeFullname] = useInput("");
  const [team, onChangeTeam] = useInput("");
  const [phone, onChangePhone] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      fullname: fullname,
      team: team,
      phone: phone,
      email: email,
      password: password,
    };

    try {
      const response = await authInstance.register(data);
      successAlert(response.data.message);
      push("/auth/login");
    } catch (error) {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm -space-y-px">
          <Input label="Full name" name="fullname" type="text" required placeholder="Full Name" value={fullname} onChange={onChangeFullname} />
          <Input label="Team" name="team" type="text" required placeholder="Team" value={team} onChange={onChangeTeam} />
          <Input label="Phone" name="phone" type="number" required placeholder="085xxxxxxxxx" value={phone} onChange={onChangePhone} />
          <Input label="Email" name="email" type="email" required placeholder="example@gmail.com" value={email} onChange={onChangeEmail} />
          <Input label="Password" name="password" type="password" required placeholder="********" value={password} onChange={onChangePassword} />
        </div>
        <div>
          <button type="submit" className="btn-submit" disabled={loading}>
            Register
          </button>
        </div>
      </form>
      {loading && <Loading />}
    </>
  );
};

export default RegisterForm;
