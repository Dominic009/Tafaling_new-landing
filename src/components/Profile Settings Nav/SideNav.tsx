"use client";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GrUserSettings } from "react-icons/gr";
import { MdOutlinePrivacyTip, MdOutlineEdit } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const SideNav = () => {
  const currentPath = usePathname();
  const { user } = useAuth();
  const routes = [
    {
      name: "General",
      path: "/user-profile/settings",
      icon: (
        <GrUserSettings
          title="Settings"
          className="text-2xl hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Privacy",
      path: "/user-profile/settings/privacy",

      icon: (
        <MdOutlinePrivacyTip
          title="News Feed"
          className="text-2xl hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Edit Info",
      path: "/user-profile/settings/edit-info",
      icon: (
        <MdOutlineEdit
          title="Requests"
          className="text-2xl  hover:text-white custom-hover"
        />
      ),
    },
  ];
  return (
    <div
      className=" w-[20%] bg-[#00274A] rounded-md py-4 px-2 relative"
      style={{
        backgroundImage: `url('/Pattern 3.png')`,
        backgroundSize: "1500px",
        backgroundPosition: "-600px -150px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="block lg:hidden absolute text-white right-2">
        <RxHamburgerMenu className="" />
      </div>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="rounded-full w-20 h-20 relative">
          <Image
            src={user?.profile_picture || "/ProfileDP/Dummy.png"}
            layout="fill"
            alt="User"
            className="rounded-full"
          ></Image>
        </div>
        <h1 className="text-white">{user?.name || "User"}</h1>
      </div>
      <ul className="text-lg flex flex-col items-center h-full">
        {routes.map((path) => {
          const isActive = path.path === currentPath;
          return (
            <Link
              href={path.path}
              key={path.name}
              className={`${
                isActive &&
                "text-left font-semibold text-white bg-[#155a97] custom-hover py-2"
              }  text-gray-400 hover:bg-[#0b467a] rounded-md px-2 w-[100%] custom-hover mb-5 flex items-center gap-2`}
            >
              <span>{path.icon}</span>
              <span>{path.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
