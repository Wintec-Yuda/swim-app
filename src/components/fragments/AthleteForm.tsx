import { groupAthlete } from "@/utils";
import Input from "../ui/Input";
import { useSession } from "next-auth/react";
import userInstance from "@/instances/user";
import { errorAlert, successAlert } from "@/utils/sweetalert";

const AthleteForm = () => {
  const session: any = useSession();
  const id = session?.data?.user?.id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: any = event.target as HTMLFormElement;
    const data: any = {
      id: form.id.value,
      fullname: form.fullname.value,
      placeOfBirth: form.placeOfBirth.value,
      dob: form.dob.value,
      gender: form.gender.value,
    };

    data.group = groupAthlete(data.dob);

    try {
      await userInstance
        .addAthlete(data)
        .then((response) => {
          successAlert(response.data.message);
        })
        .catch((error) => {
          errorAlert(error.response.data.message);
        });
    } catch (error) {
      errorAlert("Internal Server Error");
    }
  };

  return (
    <form method="POST" className="mt-8 w-96" onSubmit={handleSubmit}>
      <input id="id" name="id" type="hidden" value={id} />
      <Input label="Full name" name="fullname" type="text" required placeholder="Full name" />
      <Input label="Place of birth" name="placeOfBirth" type="text" required placeholder="Kediri" />
      <Input label="Date of birth" name="dob" type="date" required />
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select id="gender" name="gender" className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <hr className="border-gray-400 shadow-sm" />
      <button type="submit" className="btn-submit mt-10">
        Add
      </button>
    </form>
  );
};

export default AthleteForm;
