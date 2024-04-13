interface Athlete {
  fullname: string;
  dob: string;
  gender: string;
  group: string;
}

interface Props {
  athletes: Athlete[];
}

const AthleteTable = ({ athletes }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">Name</th>
            <th className="th-td">Date of Birth</th>
            <th className="th-td">Gender</th>
            <th className="th-td">Group</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {athletes.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={4}>
                No data available
              </td>
            </tr>
          ) : (
            athletes &&
            athletes.map((athlete, index) => (
              <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
                <td className="th-td">{athlete.fullname}</td>
                <td className="th-td">{athlete.dob}</td>
                <td className="th-td">{athlete.gender}</td>
                <td className="th-td">{athlete.group}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AthleteTable;
