import Input from "../ui/Input";
import { useSession } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useState } from "react";
import Loading from "./Loading";
import eventInstance from "@/instances/event";

const EventForm = ({ onClose }: { onClose: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);

  const session: any = useSession();
  const token = session?.data.token;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form: any = event.target as HTMLFormElement;
    const data: any = {
      style: form.style.value,
      number: form.number.value,
      gender: form.gender.value,
    };

    try {
      await eventInstance
        .addEvent(data, token)
        .then((response) => {
          successAlert(response.data.message);
          onClose(response.data.data);
        })
        .catch((error) => {
          errorAlert("Internal Server Error");
        });
    } catch (error) {
      errorAlert("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="POST" className="mt-8 w-96" onSubmit={handleSubmit}>
      <Input label="Style" name="style" type="text" required placeholder="Bebas" />
      <Input label="Number" name="number" type="text" required placeholder="50m" />
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
      <button type="submit" className="btn-submit mt-10" disabled={loading}>
        Add
      </button>
      {loading && <Loading />}
    </form>
  );
};

export default EventForm;
