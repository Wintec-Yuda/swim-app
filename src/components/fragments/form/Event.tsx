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
    <form method="POST" className="mt-8 w-96 flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="style" className="block text-sm font-medium text-gray-700">
          Style
        </label>
        <StyleSelect value={style} onChange={onChangeStyle} />
        <hr className="border-gray-400 shadow-sm" />
      </div>
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
          Number
        </label>
        <NumberSelect style={style} value={number} onChange={onChangeNumber} />
        <hr className="border-gray-400 shadow-sm" />
      </div>
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <GenderSelect value={gender} onChange={onChangeGender} />
        <hr className="border-gray-400 shadow-sm" />
      </div>
      <button type="submit" className="btn-submit mt-10" disabled={loading}>
        Add
      </button>
      {loading && <Loading />}
    </form>
  );
};
export default EventForm;
