"use client";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import Image from "next/legacy/image";
import React from "react";

const Page = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="w-full lg:w-[80%] mx-auto">
      <div className="relative">
        {/* Timeline IMG */}
        <div className="relative h-[240px] md:h-[300px] lg:h-[500px]">
          <Image
            src="/Profile banner/banner.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>

        {/* User DP */}
        {/* <div className="flex gap-5 top-80 w-[90%] mx-auto -mt-20">
          <div className="min-w-72 h-72 bg-gray-600 bottom-0 rounded-lg drop-shadow-md"></div>
          <div className="grid grid-rows-2-2">
            <div></div>
            <div className="flex flex-col">
              user name
              <h1 className="text-[#00274A] font-semibold text-3xl">
                {user?.name}
              </h1>
              user email
              <p className="text-[#00274A]/50 text-md">{user?.email}</p>
              user bio
              <p className="text-[#0E2943]/90 text-lg py-3 pr-16">To be a dreamer, you just need spread your wings and keep on dreaming 
              until you turn your dream in reality.</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
