"use client";
import PrimaryBtn from "@/components/PrimaryBtn";
import Image from "next/legacy/image";
import Link from "next/link";
import { AuthUser } from "@/types/Auth";
import { registerUser } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleRegisterUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setIsRegisterLoading(true);

    const userData: AuthUser = {
      name: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      password_confirmation: form.confirmPassword.value,
    };

    try {
      const { data, status } = await registerUser(userData);

      if (status == 201) {
        //console.log(data);
        router.push("login");
      }
      toast.success(data.message);
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      console.log(error);

      toast.error(error.response?.data.message);
      setIsRegisterLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]">
      <div className="opacity-20 absolute -left-52 scale-125"></div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 w-full items-center justify-center"
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: "1700px",
          backgroundPosition: "-600px -150px",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Right side */}
        <div className="z-50 flex flex-col items-center justify-center lg:border-l scale-50 lg:scale-100 h-[50%] lg:order-last">
          <h1 className="font-semibold text-[#08B7EB] text-4xl mb-3">
            Welcome to
          </h1>
          <Link href={"/"}>
            <Image
              src="/Tafaling logo.png"
              alt="Image"
              width={500}
              height={200}
              style={{ width: "100%", height: "auto" }}
              className="mix-blend-plus-darker"
            ></Image>
          </Link>
        </div>

        {/* Left side */}
        <div className="w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 md:-mt-0">
          <div className="bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm">
            <h1 className="text-3xl text-white border-b-4 border-[#008EAD] mb-8">
              Sign Up
            </h1>

            {/* Input fields */}
            <form
              onSubmit={handleRegisterUser}
              className="flex flex-col gap-7 w-[80%]"
            >
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
                  type={isOpen ? "text" : "password"}
                  name="password"
                  className="px-4 py-2 rounded-md outline-none w-full"
                ></input>
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
              {/* Confirm Password */}
              <input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                className="px-4 py-2 rounded-md outline-none"
              ></input>

              {/* Sign In button */}
              <div className="flex items-center gap-2 w-[80%] mt-8">
                <input type="checkbox" />
                <p className="text-[#D6EAFF]/50">
                  Accept
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transitiont duration-300 ease-in-out"
                  >
                    {" "}
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transitiont duration-300 ease-in-out"
                  >
                    Privacy & Policy
                  </a>
                </p>
              </div>

              {/* Sign in btn */}
              <PrimaryBtn
                text={"Sign Up"}
                disabled={isRegisterLoading ? true : false}
                width={"100%"}
                size={"2xl"}
                weight={"bold"}
                type="submit"
                isLoading={isRegisterLoading}
              />
            </form>
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
