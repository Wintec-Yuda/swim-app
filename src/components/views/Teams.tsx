import TeamTable from "../fragments/table/Team";

const TeamsView = ({ users }: any) => {
  return (
    <section className="flex justify-center items-center mt-5">
      <TeamTable users={users} />
    </section>
  );
};

export default TeamsView;
