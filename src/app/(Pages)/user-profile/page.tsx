"use client";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import Image from "next/image";
import React from "react";

const Page = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="w-[80%] mx-auto">
      <div>
        <div className="relative h-48 lg:h-96">
          <Image
            src="/Profile banner/banner.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className=""
          />
        </div>
      </div>
      {user?.name} <br />
      {user?.email}
    </div>
  );
};

export default Page;
