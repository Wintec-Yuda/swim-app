import { groupAthlete } from "@/utils";
import Input from "../../ui/Input";
import { useSession } from "next-auth/react";
import userInstance from "@/instances/user";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useState } from "react";
import Loading from "../Loading";
import useInput from "@/hooks/useInput";
import GenderSelect from "../../ui/GenderSelect";

const AthleteForm = ({ onClose }: { onClose: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [fullname, onFullnameChange] = useInput("");
  const [placeOfBirth, onPlaceOfBirthChange] = useInput("");
  const [dob, onDobChange] = useInput("");
  const [gender, onGenderChange] = useInput("");

  const session: any = useSession();
  const token = session?.data.token;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data: any = {
      fullname: fullname,
      placeOfBirth: placeOfBirth,
      dob: dob,
      gender: gender,
    };

    data.group = groupAthlete(data.dob);

    try {
      const response = await userInstance.addAthlete(data, token);
      successAlert(response.data.message);
      onClose(response.data.data);
    } catch (error) {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="POST" className="mt-8 mx-auto max-w-md" onSubmit={handleSubmit}>
      <Input label="Full name" name="fullname" type="text" required placeholder="Full name" value={fullname} onChange={onFullnameChange} />
      <Input label="Place of birth" name="placeOfBirth" type="text" required placeholder="Kediri" value={placeOfBirth} onChange={onPlaceOfBirthChange} />
      <Input label="Date of birth" name="dob" type="date" required value={dob} onChange={onDobChange} />
      <GenderSelect value={gender} onChange={onGenderChange} />
      <hr className="border-gray-400 shadow-sm" />
      <button type="submit" className="btn-submit mt-10" disabled={loading}>
        Add
      </button>
      {loading && <Loading />}
    </form>
  );
};

export default AthleteForm;
