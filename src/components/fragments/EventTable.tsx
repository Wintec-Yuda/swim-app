const EventTable = ({ events }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="th-td">No</th>
            <th className="th-td">Style</th>
            <th className="th-td">Number</th>
            <th className="th-td">Gender</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {events && events.length === 0 ? (
            <tr>
              <td className="th-td" colSpan={4}>
                No data available
              </td>
            </tr>
          ) : (
            events &&
            events.map((event: any, index: any) => (
              <tr key={index} className="border-b border-sky-500 hover:bg-sky-100">
                <td className="th-td">{index + 1}</td>
                <td className="th-td">{event.style}</td>
                <td className="th-td">{event.number}</td>
                <td className="th-td">{event.gender}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
