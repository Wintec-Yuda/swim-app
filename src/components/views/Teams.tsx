import TeamTable from "../fragments/table/Team";

const TeamsView = ({ users }: any) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <TeamTable users={users} />
      </div>
    </div>
  );
};

export default TeamsView;
