/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import MainPost from "@/components/Post/MainPost";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React, { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import NextNProgress from "nextjs-progressbar";
import ComingSoon from "@/components/ComingSoon";
import UserPost from "@/components/Post/UserPost/UserPost";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import PublicPost from "@/components/Post/PublicPost/PublicPost";
import Modal from "@/components/Modal/Modal";
import Link from "next/link";
import PrimaryBtn from "@/components/PrimaryBtn";
import { IoMdLogIn } from "react-icons/io";
import { PiNotePencilFill } from "react-icons/pi";
import SecondaryBtn from "@/components/SecondaryBtn";
import { HiUser } from "react-icons/hi2";

export interface IRefetchUserPostProp {
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUserPost?: boolean;
}

const page = () => {
  const [refetchUserPost, setRefetchUserPost] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    const message = setTimeout(() => {
      setMessage(true);
    });

    return () => {
      clearTimeout(message);
    };
  }, []);

  return (
    <div className="grid lg:grid-cols-4 gap-8 w-full md:w-[90%] lg:w-[90%] mx-auto px-2 md:px-5 text-center">
      <aside className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
        <ComingSoon />
      </aside>
      <NextNProgress options={{ easing: "ease", speed: 500 }} />

      <main className="lg:col-span-2 py-6 relative">
        {/* Create Post section */}
        {user?.user_name && (
          <MainPost setRefetchUserPost={setRefetchUserPost}></MainPost>
        )}

        {/* User Posts */}
        {user?.user_name ? (
          <UserPost
            refetchUserPost={refetchUserPost}
            setRefetchUserPost={setRefetchUserPost}
          ></UserPost>
        ) : (
          <PublicPost />
        )}

        {/* Virtual navigation for mobile devices */}
      </main>

      <aside className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
        <ComingSoon />
      </aside>

      {!user && message && (
        <Modal
          width="25%"
          isOpen={message}
          onClose={() => setMessage(false)}
          bg="gradient-to-r from-[#004A99] to-[#012349]"
        >
          <div className="py-8">
            <div className="w-[70%] mx-auto space-y-5 mb-12">
              <>
                <p className="text-md text-gray-300 mb-2">
                  To use the full features, please
                </p>
                <Link href={`login`} className="w-full">
                  <PrimaryBtn
                    text="Login"
                    width="100%"
                    disabled={false}
                    icon={IoMdLogIn}
                    size="xl"
                  />
                </Link>
              </>
              <>
                <p className="text-md text-gray-300 mb-2">
                  Dont have an account?
                </p>
                <Link href={`register`} className="w-full">
                  <PrimaryBtn
                    text="Register"
                    width="100%"
                    disabled={false}
                    icon={PiNotePencilFill}
                    size="xl"
                  />
                </Link>
              </>
            </div>
            <div className="w-[80%] mx-auto mt-3 flex gap-2 items-center mb-3">
              <div className="border-b border-[#BFB0B0] w-[33%]"></div>
              <div className="text-gray-400 flex-1 text-center hidden md:block">
                or continue as
              </div>
              <p className="text-gray-400 flex-1 text-center md:hidden">or</p>
              <div className="border-b border-[#BFB0B0] w-[33%]"></div>
            </div>
            <div className="w-[50%] mx-auto">
              <SecondaryBtn text="Guest" width="100%" Icon={HiUser} onClose={() => setMessage(false)}></SecondaryBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default page;
