const StyleSelect = ({ onChange, value }: any) => {
  return (
    <select id="style" name="style" value={value} onChange={onChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
      <option value="">Select Style</option>
      <option value="gaya bebas">Gaya Bebas</option>
      <option value="gaya punggung">Gaya Punggung</option>
      <option value="gaya kupu-kupu">Gaya Kupu-kupu</option>
      <option value="gaya dada">Gaya Dada</option>
      <option value="gaya ganti">Gaya Ganti</option>
      <option value="estafet">Estafet</option>
    </select>
  );
};

export default StyleSelect;