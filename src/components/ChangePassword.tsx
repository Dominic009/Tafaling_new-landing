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
            placeholder="Enter Old Password"
            type="password"
            {...register("oldPassword", {
              required: "Old password is required",
              minLength: {
                value: 6,
                message: "Old password must be at least 6 characters",
              },
            })}
            className={`px-4 py-2 rounded-md  w-full ${
              errors.oldPassword ? "border-2 border-red-600" : ""
            }`}
          />
          {errors.oldPassword && (
            <p className="text-red-300 mt-1">
              {String(errors.oldPassword.message)}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            placeholder="Enter New Password"
            type={isOpen ? "text" : "password"}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "New password must be at least 6 characters",
              },
            })}
            className={`px-4 py-2 rounded-md outline-none w-full ${
              errors.newPassword ? "border-2 border-red-600" : ""
            }`}
          />
          {isOpen ? (
            <IoEyeOutline
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-3 top-3 cursor-pointer text-xl text-[#00B4DB]"
            />
          ) : (
            <IoEyeOffOutline
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-3 top-3 cursor-pointer text-xl text-[#00B4DB]"
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
            placeholder="Confirm New Password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className={`px-4 py-2 rounded-md outline-none w-full ${
              errors.confirmPassword ? "border-2 border-red-600" : ""
            }`}
          />
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
          width={"100%"}
          size={"2xl"}
          weight={"bold"}
          type="submit"
          isLoading={isChangePasswordLoading}
        />
      </form>
    </div>
  );
};

export default ChangePassword;
