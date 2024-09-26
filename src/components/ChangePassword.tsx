"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "./PrimaryBtn";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { changePassword } from "@/api/auth/auth";
import useLocalStorage from "@/hooks/useLocalStorage";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    watch,
  } = useForm();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] =
    useState<boolean>(false);
  const { item: accessToken } = useLocalStorage("auth-token");

  const handlePasswordChange = async (data: any) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    setIsChangePasswordLoading(true);

    const userData = {
      old_password: data.oldPassword,
      old_password_confirmation: data.oldPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };

    console.log(userData);

    try {
      const { data, status } = await changePassword(userData, lsItem);

      toast.success(data?.message);
      setIsChangePasswordLoading(false);

      resetField("oldPassword");
      resetField("newPassword");
      resetField("confirmPassword");
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);
      setIsChangePasswordLoading(false);
    }
  };

  // Watch new password to compare with confirm password
  const newPassword = watch("newPassword");

  return (
    <div>
      <form
        onSubmit={handleSubmit(handlePasswordChange)}
        className="flex flex-col gap-5 w-[80%]"
      >
        {/* Old Password */}
        <div className="relative">
          <input
            placeholder=""
            type="password"
            {...register("oldPassword", {
              required: "Old password is required",
              minLength: {
                value: 6,
                message: "Old password must be at least 6 characters",
              },
            })}
            className={`block px-4 py-2 w-[60%] text-lg text-gray-900 shadow-sm bg-transparent rounded-md border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#155a97] peer ${
              errors.oldPassword ? "border-2 border-red-600" : ""
            }`}
          />
          <label
            htmlFor="oldPassword"
            className="absolute text-sm text-gray-700 font-medium duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1"
          >
            Enter Old Password
          </label>
          {errors.oldPassword && (
            <p className="text-red-300 mt-1">
              {String(errors.oldPassword.message)}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            placeholder=""
            type={isOpen ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "New password must be at least 6 characters",
              },
            })}
            className={`block px-4 py-2 w-[60%] text-lg text-gray-900 shadow-sm bg-transparent rounded-md border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#155a97] peer ${
              errors.newPassword ? "border-2 border-red-600" : ""
            }`}
          />
          <label
            htmlFor="oldPassword"
            className="absolute text-sm text-gray-700 font-medium duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1"
          >
            Enter New Password
          </label>
          {isOpen ? (
            <IoEyeOutline
              onClick={() => setIsOpen(!isOpen)}
              className="absolute w-[85%] right-3 top-4 cursor-pointer text-xl text-[#00B4DB]"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => setIsOpen(!isOpen)}
              className="absolute w-[85%] right-3 top-4 cursor-pointer text-xl text-[#00B4DB]"
            />
          )}
          {errors.newPassword && (
            <p className="text-red-300 mt-1">
              {String(errors.newPassword.message)}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            placeholder=""
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className={`block px-4 py-2 w-[60%] text-lg text-gray-900 shadow-sm bg-transparent rounded-md border-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#155a97] peer ${
              errors.confirmPassword ? "border-2 border-red-600" : ""
            }`}
          />
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-gray-700 font-medium duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-80 peer-focus:-translate-y-4 left-1"
          >
            Confirm New Password
          </label>
          {errors.confirmPassword && (
            <p className="text-red-300 mt-1">
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>

        {/* Change Password Button */}
        <PrimaryBtn
          text={"Change Password"}
          disabled={isChangePasswordLoading}
          width={"60%"}
          size={"xl"}
          weight={"semibold"}
          type="submit"
          isLoading={isChangePasswordLoading}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
