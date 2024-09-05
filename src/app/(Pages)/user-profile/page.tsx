"use client";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import React from "react";

const Page = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      {user?.name} <br />
      {user?.email}
    </div>
  );
};

export default Page;
