import React from "react";

interface InputFieldProps {
    htmlFor: string;
    labelTitle: string;
    type: string;
    name: string;
}

const InputField: React.FC<InputFieldProps> = ({ htmlFor, labelTitle, type, name }) => {
  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700"
        >
          {labelTitle}
        </label>
        <input
          type={type}
          name={name}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#155a97] focus:border-transparent"
          placeholder="Enter old password"
        />
      </div>
    </div>
  );
};

export default InputField;
