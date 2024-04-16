import { useSession } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { useState } from "react";
import Loading from "../Loading";
import eventInstance from "@/instances/event";
import NumberSelect from "../../ui/NumberSelect";
import StyleSelect from "../../ui/StyleSelect";
import GenderSelect from "../../ui/GenderSelect";
import useInput from "@/hooks/useInput";

const EventForm = ({ onClose }: { onClose: (data: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const [style, onChangeStyle] = useInput("");
  const [number, onChangeNumber] = useInput("");
  const [gender, onChangeGender] = useInput("male");

  const session: any = useSession();
  const token = session?.data.token;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      style,
      number,
      gender,
    };

    try {
      const response = await eventInstance.addEvent(data, token);
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
      <div className="mb-4">
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">
          Style
        </label>
        <StyleSelect value={style} onChange={onChangeStyle} />
      </div>
      <div className="mb-4">
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Number
        </label>
        <NumberSelect style={style} value={number} onChange={onChangeNumber} />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <GenderSelect value={gender} onChange={onChangeGender} />
      </div>
      <button type="submit" className="btn-submit" disabled={loading}>
        Add
      </button>
      {loading && <Loading />}
    </form>
  );
};

export default EventForm;
