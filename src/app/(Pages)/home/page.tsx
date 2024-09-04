/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Post from "@/components/Post";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserPost from "@/components/UserPost";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";

const page = () => {
  const router = useRouter();
  const { user } = useAuth();

  useLayoutEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      {/* Page Layout */}
      <div className="grid lg:grid-cols-4 gap-8 w-full md:w-[90%] lg:w-[90%] mx-auto px-2 md:px-5 text-center">
        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Left Section
        </div>

        <div className="lg:col-span-2 py-6 relative">
          {/* Create Post section */}
          <div>
            <Post></Post>
          </div>
          {/* User Posts */}
          <div>
            <UserPost></UserPost>
          </div>

          {/* Virtual navigation for mobile devices */}
          <div className="md:hidden bg-[#F1FEFF]/60 backdrop-blur-sm w-[40%] mx-auto py-3 px-5 rounded-2xl sticky bottom-5">
            <div className="flex gap-9 items-center justify-center">
              <TiHome
                title="Home"
                className="text-2xl text-[#265158] border-b-2 border-[#095563] rounded-sm cursor-pointer transition-all duration-200 ease-in-out"
              />
              <FaRegNewspaper
                title="News Feed"
                className="text-2xl text-[#407C87]/50 hover:text-[#407C87] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
              />
              <BsFillPeopleFill
                title="Requests"
                className="text-2xl text-[#407C87]/50 hover:text-[#407C87] hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Right Section
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(page);
