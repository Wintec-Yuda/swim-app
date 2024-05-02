import { useSelector } from "react-redux";
import TeamTable from "../fragments/table/Team";

const TeamsView = () => {
  const teams = useSelector((state: any) => state.team.data);

  return (
    <section className="flex justify-center items-center mt-5">
      <TeamTable teams={teams} />
    </section>
  );
};

export default TeamsView;
