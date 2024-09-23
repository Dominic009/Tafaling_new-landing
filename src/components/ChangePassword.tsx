import React from "react";
import InputField from "./Input File/Text Input/InputField";

const ChangePassword = () => {
  return (
    <div>
      <form className="px-6 w-full lg:w-[50%]">
        {/* Old Password */}
        <InputField htmlFor="old-password" labelTitle="Old password" type="password" name="old-password" />

        {/* New Password */}
        <InputField htmlFor="new-password" labelTitle="New password" type="password" name="new-password" />

        {/* Confirm Password */}
        <InputField htmlFor="confirm-password" labelTitle="Confirm password" type="password" name="confirm-password"  />

        {/* Submit Button */}
        {/* <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-wh w-fullite font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Change Password
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ChangePassword;
