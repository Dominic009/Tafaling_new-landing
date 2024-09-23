"use client";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/PrimaryBtn";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { resendEmailVerifyOtp, verifyUserEmail } from "@/api/account/account";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const Page = () => {
  const router = useRouter();
  const { item: accessToken } = useLocalStorage("auth-token");
  const [otp, setOtp] = useState<string>("");
  const [isOtpVerifyLoading, setOtpVerifyLoading] = useState<boolean>(false);
  const [isOtpResendLoading, setOtpResendLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // Register the OTP field manually
  useEffect(() => {
    register("otp", {
      required: "OTP is required",
      minLength: {
        value: 6,
        message: "OTP must be 6 characters",
      },
      maxLength: {
        value: 6,
        message: "OTP must be 6 characters",
      },
    });
  }, [register]);

  // OTP VERIFICATION
  const handleOtpSubmit = async () => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    setOtpVerifyLoading(true);

    const userData = {
      otp,
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
    setOtpResendLoading(true);
    try {
      const { data, status } = await resendEmailVerifyOtp(lsItem);
      console.log(data);
      console.log(status);
      toast.success(data.message);
      setOtpResendLoading(false);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);

      console.log(error);
      console.log(error.response?.data.message);
      setOtpResendLoading(false);
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
              className="flex flex-col gap-5 w-[80%] items-center"
            >
             
              <OTPInput
                value={otp}
                onChange={(value: string) => {
                  setOtp(value);
                  setValue("otp", value); 
                }}
                numInputs={6}
                inputStyle={{
                  width: "2.5rem",
                  height: "2.5rem",
                  margin: "0.5rem",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
                renderInput={(props) => <input {...props} />}
              />
             
              {errors.otp && (
                <span className="text-red-300">{String(errors.otp.message)}</span>
              )}

              <div className="flex gap-5 w-full items-center">
                <PrimaryBtn
                  text={`Submit OTP`}
                  disabled={isOtpVerifyLoading}
                  width={"100%"}
                  size={"xl"}
                  weight={"semibold"}
                  type="submit"
                  isLoading={isOtpVerifyLoading}
                />
                <PrimaryBtn
                  text={`Resend OTP`}
                  disabled={isOtpResendLoading}
                  width={"100%"}
                  size={"xl"}
                  weight={"semibold"}
                  type="button"
                  isLoading={isOtpResendLoading}
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

export default PrivateRoute(Page);
