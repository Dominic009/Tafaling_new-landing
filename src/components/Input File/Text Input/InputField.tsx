import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  htmlFor: string;
  labelTitle: string;
  type: string;
  name: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  htmlFor,
  labelTitle,
  type,
  name,
  placeholder,
}) => {
  return (
    <div>
      <div className="mb-4 relative">
        <input
          type={type}
          name={name}
          required
          className="block px-4 py-2 w-[70%] text-lg text-gray-900 shadow-sm bg-transparent rounded-md border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#155a97] peer"
          placeholder={''}
        />
        <label
          htmlFor={htmlFor}
          className="absolute text-sm text-gray-700 font-medium duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1"
        >
          {labelTitle}
        </label>
      </div>
    </div>
  );
};

export default InputField;
