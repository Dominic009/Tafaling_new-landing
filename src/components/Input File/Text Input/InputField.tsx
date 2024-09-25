import React from "react";

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
          className="block px-4 py-2 w-[100%] lg:w-[70%] text-lg text-gray-900 shadow-sm bg-transparent rounded-md border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#155a97] peer"
          placeholder={""}
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

// CODE FOR MAKING THE HOOK_FORMS INPUT A COMPONENT
// interface InputProps {
//   label: string;
//   placeholder: string;
//   type: string;
//   register: any; // You can make this more specific depending on your form setup
//   errors?: { [key: string]: { message: string } | undefined };
//   fieldName: string;
//   validation?: object;
// }

// const InputField: React.FC<InputProps> = ({
//   label,
//   placeholder,
//   type,
//   register,
//   errors,
//   fieldName,
//   validation,
// }) => {
//   return (
//     <div className="mb-4">
//       <label className="block mb-1 text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(fieldName, validation)}
//         className={`px-4 py-2 rounded-md outline-none w-full ${
//           errors && errors[fieldName] ? "border-2 border-red-600" : ""
//         }`}
//       />
//       {errors && errors[fieldName]?.message && (
//         <p className="text-red-300 mt-1">
//           {String(errors[fieldName]?.message)}
//         </p>
//       )}
//     </div>
//   );
// };

export default InputField;
