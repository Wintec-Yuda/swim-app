const NumberSelect = ({ style, value, onChange }: any) => {
  let numberOptions: string[] = [];

  switch (style) {
    case "gaya bebas":
      numberOptions = ["50m", "100m", "200m", "400m", "800m", "1500m"];
      break;
    case "gaya punggung":
      numberOptions = ["50m", "100m", "200m"];
      break;
    case "gaya kupu-kupu":
      numberOptions = ["50m", "100m", "200m"];
      break;
    case "gaya dada":
      numberOptions = ["50m", "100m", "200m"];
      break;
    case "gaya ganti":
      numberOptions = ["200m", "400m"];
      break;
    case "estafet":
      numberOptions = ["4x50 IM", "4x100 IM", "4x50 Bebas", "4x100 Bebas"];
      break;
    default:
      break;
  }

  return (
    <select name="number" value={value} onChange={onChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
      <option value="">Select Number</option>
      {numberOptions.map((number, index) => (
        <option key={index} value={number}>
          {number}
        </option>
      ))}
    </select>
  );
};

export default NumberSelect;
