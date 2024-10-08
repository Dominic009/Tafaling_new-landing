"use client";
import Image from "next/legacy/image";
import React from "react";
import { TiHome } from "react-icons/ti";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineLogout, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { logoutUser } from "@/api/auth/auth";
import useLocalStorage from "@/hooks/useLocalStorage";
import "animate.css";
import { getAccessToken } from "@/helpers/tokenStorage";
import Notification from "../Notification panel/Notification";
import DropDownMenu from "../Drop down menu/DropDownMenu";
import { FaUserCircle } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import AuthUserNavMenu from "./AuthUserNavMenu";
import PrimaryBtn from "../PrimaryBtn";
import { IoMdLogIn } from "react-icons/io";

const Navbar: React.FC = () => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const currentPath = usePathname();
  const { user } = useAuth();

  const routes = [
    {
      name: "Home",
      path: "/home",
      icon: (
        <TiHome
          title="Home"
          className="text-3xl  hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Profile",
      path: "/user-profile",
      icon: (
        <FaUserCircle
          title="Profile"
          className="text-2xl mb-1 hover:text-white custom-hover"
        />
      ),
    },
    {
      name: "Requests",
      path: "/requests",
      icon: (
        <BsFillPeopleFill
          title="Requests"
          className="text-2xl  hover:text-white custom-hover"
        />
      ),
    },
  ];

  if (currentPath === "/login" || currentPath === "/register") {
    return null; // Do not render the Navbar on these paths
  }

  return (
    <nav className="h-[70px] grid grid-cols-2 md:grid-cols-3 gap-5 bg-gradient-to-r from-[#004A99] to-[#012349] items-center px-5 w-full custom-hover">
      {/* Left Section */}
      <div>
        <Link href={"/home"}>
          <Image
            src={"/Tafaling logo.png"}
            width={130}
            height={55}
            alt="Brand logo"
          ></Image>
        </Link>
      </div>

      {/* Middle Section Navlinks*/}
      <div className="hidden md:block">
        <div className="flex gap-9 items-center justify-center">
          {routes.map((path) => {
            const isActive = path.path === currentPath;
            return (
              <Link
                href={path.path}
                key={path.name}
                className={`${
                  isActive
                    ? "text-white border-b-2 border-[#42C6DE]"
                    : "text-white/50"
                }`}
              >
                <span>{path.icon}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-end">
        <div className="flex items-center justify-between lg:w-[80%]">
          {/* Search field */}
          <div className="hidden md:block md:w-full lg:w-[50%] relative">
            <input
              type="text"
              className="outline-none px-4 py-1 rounded-lg bg-[#062139] text-white w-full font-light"
              placeholder="Search"
            />
            <HiOutlineSearch className="absolute top-[6px] right-3 text-gray-400 text-xl" />
          </div>
          <HiOutlineSearch className="text-gray-100 text-3xl md:hidden cursor-pointer" />

          <div className="w-[30%] border">
            {user?.user_name ? (
              <AuthUserNavMenu />
            ) : (
              <Link href={`login`} className="w-full">
                <PrimaryBtn text="Login" width="100%" disabled={false} icon={IoMdLogIn}/>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
