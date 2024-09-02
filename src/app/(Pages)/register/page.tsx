<<<<<<< HEAD
import PrimaryBtn from "@/components/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
=======
"use client";
import PrimaryBtn from "@/components/PrimaryBtn";
import Image from "next/image";
import Link from "next/link";
import { AuthUser } from "@/types/Auth";
import { registerUser } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const userData: AuthUser = {
      name: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      password_confirmation: form.confirmPassword.value,
    };

    const response = await registerUser(userData);

    console.log(response);

    if (response.status == 201) {
      router.push("home");
    }
  };
  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]">
      <div className="opacity-20 absolute -left-52 scale-125"></div>

      <div
<<<<<<< HEAD
        className="grid grid-cols-1 lg:grid-cols-2 gap-72 md:gap-0 w-full items-center justify-center"
=======
        className="grid grid-cols-1 lg:grid-cols-2 w-full items-center justify-center"
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: "1700px",
          backgroundPosition: "-600px -150px",
          backgroundRepeat: "no-repeat",
        }}
      >
<<<<<<< HEAD
        {/* Right side */}
        <div className="z-50 flex flex-col items-center justify-center lg:border-l scale-50 lg:scale-100 h-[50%] lg:order-last md:-mt-0">
          <h1 className="font-semibold text-[#08B7EB] text-4xl mb-3">
            Welcome to
          </h1>

=======
        {/* Left side */}
        <div className="z-50 flex flex-col items-center justify-center lg:border-l scale-50 lg:scale-100 h-[50%] lg:order-last -mt-36 md:-mt-0">
          <h1 className="font-semibold text-[#08B7EB] text-4xl mb-3">
            Welcome to
          </h1>
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d
          <Link href={"/"}>
            <Image
              src="/Tafaling logo.png"
              alt="Image"
              width={500}
              height={200}
<<<<<<< HEAD
              style={{ width: "100%", height: "auto" }}
=======
              style={{ width: "80%", height: "auto" }}
              className="mix-blend-plus-darker"
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d
            ></Image>
          </Link>
        </div>

<<<<<<< HEAD
        {/* Left side */}
        <div className="w-[90%] md:w-[70%] lg:max-w-[65%] mx-auto z-50 -mt-80 md:-mt-0">
=======
        {/* Rigth side */}
        <div className="w-[90%] md:w-[70%] lg:max-w-[50%] mx-auto z-50 -mt-80 md:-mt-0">
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d
          <div className="bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm">
            <h1 className="text-3xl text-white border-b-4 border-[#008EAD] mb-8">
              Sign Up
            </h1>

            {/* Input fields */}
<<<<<<< HEAD
            <div className="flex flex-col gap-7 w-[80%]">
              {/* Name */}
              <input
                placeholder="Your Name"
                type="text"
                className="px-4 py-2 rounded-md outline-none"
              ></input>
              {/* Email */}
              <input
                placeholder="Your Email"
                type="text"
                className="px-4 py-2 rounded-md outline-none"
              ></input>
              {/* Password */}
              <div className="relative">
                <input
                  placeholder="Your Password"
                  type="password"
                  className="px-4 py-2 rounded-md outline-none w-full"
                ></input>
                <Image
                  src={"/Eye.png"}
                  alt="Eye_Icon"
                  width={20}
                  height={20}
                  className="absolute right-3 top-3"
                ></Image>
              </div>
              {/* Confirm Password */}
              <input
                placeholder="Confirm Password"
                type="password"
                className="px-4 py-2 rounded-md outline-none"
              ></input>
            </div>

            {/* Sign In button */}
            <div className="flex items-center gap-2 w-[80%] mt-8 mb-2">
              <input type="checkbox" />
              <p className="text-[#D6EAFF]/50">
                Accept
                <a href="#" className="text-gray-300">
                  {" "}
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-gray-300">
                  Privacy & Policy
                </a>
              </p>
            </div>

            {/* Sign in btn */}
            <PrimaryBtn
              text={"Sign Up"}
              width={"80%"}
              size={"2xl"}
              weight={"bold"}
            />
=======
            <form onSubmit={handleRegisterUser}>
              <div className="flex flex-col gap-7 w-[80%]">
                {/* Name */}
                <input
                  placeholder="Your Name"
                  name="fullName"
                  type="text"
                  className="px-4 py-2 rounded-md outline-none"
                ></input>
                {/* Email */}
                <input
                  placeholder="Your Email"
                  type="text"
                  name="email"
                  className="px-4 py-2 rounded-md outline-none"
                ></input>
                {/* Password */}
                <div className="relative">
                  <input
                    placeholder="Your Password"
                    type="password"
                    name="password"
                    className="px-4 py-2 rounded-md outline-none w-full"
                  ></input>
                  <Image
                    src={"/Eye.png"}
                    alt="Eye_Icon"
                    width={20}
                    height={20}
                    className="absolute right-3 top-3"
                  ></Image>
                </div>
                {/* Confirm Password */}
                <input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  className="px-4 py-2 rounded-md outline-none"
                ></input>
              </div>

              {/* Sign In button */}
              <div className="flex items-center gap-2 w-[80%] mt-8 mb-2">
                <input type="checkbox" />
                <p className="text-[#D6EAFF]/50">
                  Accept
                  <a href="#" className="text-gray-300">
                    {" "}
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-300">
                    Privacy & Policy
                  </a>
                </p>
              </div>

              {/* Sign in btn */}
              <PrimaryBtn
                text={"Sign Up"}
                width={"80%"}
                size={"2xl"}
                weight={"bold"}
                type="submit"
              />
            </form>
>>>>>>> 7cbcff45ade6769f92a23d6313feae48b7f6387d
          </div>

          {/* Join Now link */}
          <h2 className="mt-7 text-white text-center text-xl font-light">
            Already Have an acocunt?{" "}
            <Link href="/login" className="text-[#025C70] font-semibold">
              SIGN IN
            </Link>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Page;
