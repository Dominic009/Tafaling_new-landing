"use client";
import { loginUser } from "@/api/auth/auth";
import PrimaryBtn from "@/components/PrimaryBtn";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { AuthUser } from "@/types/Auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

// for using reacts "useState" changed the function name from 'page' to "Page"
const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUser>();

  // Form submit handler
  const handleLoginUser = async (userData: AuthUser) => {
    const { data, status } = await loginUser(userData);

    if (status == 200) {
      login({
        user_name: data.data.user.user_name,
        email: data.data.user.email,
        cover: data.data.user.cover_photo,
        name: data.data.user.name,
      });
      router.push("home");
    }
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]">
      <div className="opacity-20 absolute -left-52 scale-125"></div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-center justify-center"
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: "1700px",
          backgroundPosition: "-600px -150px",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Left side */}
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
            ></Image>
          </Link>
        </div>

        {/* Rigth side */}
        <div className="w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 -mt-24 md:-mt-0">
          <div className="bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm">
            <h1 className="text-3xl text-white border-b-4 border-[#008EAD] mb-8">
              Sign In
            </h1>

            <form
              onSubmit={handleSubmit(handleLoginUser)} // Use handleSubmit from react-hook-form
              className="flex flex-col gap-5 w-[80%]"
            >
              {/* Email */}
              <div>
                <input
                  placeholder="Your Email"
                  {...register("email", {
                    // required: "Email is required",
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  className="px-4 py-2 rounded-md outline-none w-full"
                />
                {errors.email && (
                  <p className="text-white mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  placeholder="Your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={isOpen ? "text" : "password"}
                  className="px-4 py-2 rounded-md outline-none w-full"
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
                {errors.password && (
                  <p className="text-white mt-1">{errors.password.message}</p>
                )}
              </div>

              <a href="#" className="text-[#D6EAFF]/50 -mt-5 text-sm">
                Forgotten password?
              </a>

              {/* Remember Me */}
              <div className="flex items-center gap-1 w-[80%] mt-4">
                <input type="checkbox" />
                <p className="text-[#D6EAFF]/50">Remember Me</p>
              </div>

              {/* Sign In button */}
              <div className="w-full flex justify-center">
                <PrimaryBtn
                  text={"Sign In"}
                  width={"100%"}
                  size={"2xl"}
                  weight={"bold"}
                  type="submit"
                />
              </div>
            </form>

            {/* Third party log in */}
            <div className="w-[80%] mt-7 flex gap-2 items-center mb-3">
              <div className="border-b border-[#BFB0B0] w-[33%]"></div>
              <div className="text-[#D6EAFF]/50 flex-1 text-center hidden md:block">
                or continue with
              </div>
              <p className="text-[#D6EAFF]/50 flex-1 text-center md:hidden">
                or
              </p>
              <div className="border-b border-[#BFB0B0] w-[33%]"></div>
            </div>

            <p className="text-center font-light text-gray-400 text-sm md:text-md">
              By clicking continue, you agree to Tafalings <br />{" "}
              <a href="#" className="text-gray-300">
                User Agreement
              </a>
              ,{" "}
              <a href="#" className="text-gray-300">
                Privacy Policy{" "}
              </a>{" "}
              &{" "}
              <a href="#" className="text-gray-300">
                Cookie Policy
              </a>
            </p>

            <div className="flex gap-4 text-[#00B4DB] font-normal w-[70%] mt-5">
              <button className="bg-[#F2F2F2] w-[100%] py-2 px-4 rounded-md text-lg flex justify-center items-center gap-2">
                <Image
                  src="/Icons/google.png"
                  alt="google"
                  width={25}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                ></Image>
                Google
              </button>
              <button className="bg-[#F2F2F2] w-[100%] py-2 px-4 rounded-md lg:text-lg">
                Other
              </button>
            </div>
          </div>

          {/* Join Now link */}
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
