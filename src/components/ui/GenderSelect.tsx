const GenderSelect = ({ value, onChange }: any) => {
  return (
    <select id="gender" name="gender" onChange={onChange} className="mt-1 block w-full p-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
      <option value="male" selected={value === "male"}>Male</option>
      <option value="female" selected={value === "female"}>Female</option>
    </select>
  );
};

export default GenderSelect;
