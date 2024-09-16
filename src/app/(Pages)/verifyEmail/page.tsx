"use client";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/PrimaryBtn";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { resendEmailVerifyOtp, verifyUserEmail } from "@/api/auth/auth";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { item: accessToken } = useLocalStorage("auth-token");
  const [isOtpVerifyLoading, setOtpVerifyLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // OTP VERIFICATION
  const handleOtpSubmit = async (data: any) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    setOtpVerifyLoading(true);

    const userData = {
      otp: data.otp,
    };
    console.log(userData, "userData");
    try {
      const { data, status } = await verifyUserEmail(userData, lsItem);
      console.log(data);
      console.log(status);

      router.push("home");
      toast.success(data.message);
    } catch (e) {
      const error = e as AxiosError<any>;
      console.log(error);
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
      setOtpVerifyLoading(false);
    }
  };

  // OTP Resend
  const handleOtpResend = async () => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    setOtpVerifyLoading(true);
    const userData = {};
    try {
      const { data, status } = await resendEmailVerifyOtp(userData, lsItem);
      console.log(data);
      console.log(status);
      toast.success(data.message);
      setOtpVerifyLoading(false);
    } catch (e) {
      const error = e as AxiosError<any>;
      console.log(error);
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
      setOtpVerifyLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]">
      <div
        className="grid grid-cols-1 gap-24 w-full items-center justify-center"
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: "1700px",
          backgroundPosition: "-600px -150px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[30%] mx-auto z-50 -mt-24 md:-mt-0 animate__animated animate__fadeIn">
          <div className="bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm">
            <h1 className="text-3xl text-white border-b-4 border-[#008EAD] mb-8">
              Verify Email
            </h1>

            <form
              onSubmit={handleSubmit(handleOtpSubmit)}
              className="flex flex-col gap-5 w-[80%]"
            >
              <input
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 characters",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 characters",
                  },
                })}
                placeholder="Enter OTP"
                className={`px-4 py-2 rounded-md outline-none w-full ${
                  errors.otp ? "border-2 border-red-600" : ""
                }`}
              />
              {errors.otp && (
                <span className="text-red-300">
                  {String(errors.otp.message)}
                </span>
              )}

              <div className="grid grid-cols-2 gap-4 ">
                <PrimaryBtn
                  text={`Submit OTP`}
                  disabled={isOtpVerifyLoading}
                  width={"100%"}
                  size={"2xl"}
                  weight={"bold"}
                  type="submit"
                  isLoading={isOtpVerifyLoading}
                />
                <PrimaryBtn
                  text={`Resend OTP`}
                  disabled={isOtpVerifyLoading}
                  width={"100%"}
                  size={"2xl"}
                  weight={"bold"}
                  type="button"
                  isLoading={isOtpVerifyLoading}
                  onclick={() => handleOtpResend()}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
