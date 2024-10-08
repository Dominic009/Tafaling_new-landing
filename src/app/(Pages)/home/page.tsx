/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import MainPost from "@/components/Post/MainPost";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import React, { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import ComingSoon from "@/components/ComingSoon";
import UserPost from "@/components/Post/UserPost/UserPost";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import PublicPost from "@/components/Post/PublicPost/PublicPost";
import PreviewModal from "@/components/Modal/PreviewModal";

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
        <PreviewModal isOpen={message} onClose={() => setMessage(false)} />
      )}
    </div>
  );
};

export default page;
