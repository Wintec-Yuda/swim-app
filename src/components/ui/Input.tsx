type InputProps = {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
};

const Input = ({ id, name, type, required, placeholder }: InputProps) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm my-3"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
