"use client";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const watchNewPassword = watch("newPassword");

  const handleEmailSubmit = () => {
    toast.success("An OTP has been sent to your email");
    setStep(2);
  };

  const handleOtpSubmit = () => {
    toast.success("OTP verified successfully");
    setStep(3);
  };

  const handlePasswordSubmit = () => {
    toast.success("Password changed successfully!");
    router.push("login");
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-center justify-center"
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: "1700px",
          backgroundPosition: "-600px -150px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="z-50 flex flex-col items-center justify-center lg:border-r scale-50 lg:scale-100 h-[50%] ">
          <h1 className="font-semibold text-[#08B7EB] text-4xl mb-3">
            Welcome to
          </h1>
          <Link href={"/"}>
            <Image
              src="/Tafaling logo.png"
              alt="Image"
              style={{ width: "100%", height: "auto" }}
              width={500}
              height={200}
              className="mix-blend-plus-darker"
            />
          </Link>
        </div>

        <div className="w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 -mt-24 md:-mt-0 animate__animated animate__fadeIn">
          <div className="bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm">
            <h1 className="text-3xl text-white border-b-4 border-[#008EAD] mb-8">
              Forgot Password
            </h1>

            {step === 1 && (
              <form
                onSubmit={handleSubmit(handleEmailSubmit)}
                className="flex flex-col gap-5 w-[80%]"
              >
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="Enter email"
                  className={`px-4 py-2 rounded-md outline-none w-full ${
                    errors.email ? "border-2 border-red-600" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-300">
                    {String(errors.email.message)}
                  </span>
                )}
                <PrimaryBtn
                  text={`Request OTP`}
                  disabled={isLoginLoading}
                  width={"100%"}
                  size={"2xl"}
                  weight={"bold"}
                  type="submit"
                  isLoading={isLoginLoading}
                />
              </form>
            )}
            {/* Step OTP */}
            {step === 2 && (
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
                    disabled={isLoginLoading}
                    width={"100%"}
                    size={"2xl"}
                    weight={"bold"}
                    type="submit"
                    isLoading={isLoginLoading}
                  />
                  <PrimaryBtn
                    text={`Resend OTP`}
                    disabled={isLoginLoading}
                    width={"100%"}
                    size={"2xl"}
                    weight={"bold"}
                    type="button"
                    isLoading={isLoginLoading}
                    onclick={() => handleEmailSubmit()}
                  />
                </div>
              </form>
            )}

            {step === 3 && (
              <form
                onSubmit={handleSubmit(handlePasswordSubmit)}
                className="flex flex-col gap-5 w-[80%]"
              >
                <div className="relative">
                  <input
                    placeholder="New Password"
                    type={isOpen ? "text" : "password"}
                    {...register("newPassword", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.newPassword ? "border-2 border-red-600" : ""
                    }`}
                  />
                  {errors.newPassword && (
                    <span className="text-red-300">
                      {String(errors.newPassword.message)}
                    </span>
                  )}
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
                </div>

                <div className="relative">
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                      validate: (value) =>
                        value === watchNewPassword || "Passwords do not match",
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.confirmPassword ? "border-2 border-red-600" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-300">
                      {String(errors.confirmPassword.message)}
                    </span>
                  )}
                </div>

                <PrimaryBtn
                  text={`Change Password`}
                  disabled={isLoginLoading}
                  width={"100%"}
                  size={"2xl"}
                  weight={"bold"}
                  type="submit"
                  isLoading={isLoginLoading}
                />
              </form>
            )}
          </div>

          <h2 className="mt-7 text-white text-center text-xl font-light">
            New to Tafaling?{" "}
            <Link href="/register" className="text-[#025C70] font-semibold">
              JOIN NOW
            </Link>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Page;
