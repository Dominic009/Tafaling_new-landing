/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Post from "@/components/Post";
import MainPost from "@/components/Post/MainPost";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserPost from "@/components/UserPost";
import React from "react";
import NextNProgress from "nextjs-progressbar";


const page = () => {
  //const router = useRouter();


  return (
    <div>
      {/* Page Layout */}
      <div className="grid lg:grid-cols-4 gap-8 w-full md:w-[90%] lg:w-[90%] mx-auto px-2 md:px-5 text-center">
        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Left Section
        </div>
        <NextNProgress options={{ easing: "ease", speed: 500 }} />
        <div className="lg:col-span-2 py-6 relative">
          {/* Create Post section */}
          <div>
            <MainPost></MainPost>
          </div>
          {/* User Posts */}
          <div>
            <UserPost></UserPost>
          </div>

          {/* Virtual navigation for mobile devices */}
          
        </div>

        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Right Section
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(page);
