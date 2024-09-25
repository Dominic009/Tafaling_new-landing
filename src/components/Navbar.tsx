"use client";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { FaRegNewspaper } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { logoutUser } from "@/api/auth/auth";
import useLocalStorage from "@/hooks/useLocalStorage";
import "animate.css";
import { getAccessToken } from "@/helpers/tokenStorage";
import DropDownMenu from "./Drop down menu/DropDownMenu";

const Navbar: React.FC = () => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const currentPath = usePathname();
  const { logout, user } = useAuth();
  const { item } = useLocalStorage("auth-token");

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
      name: "News Feed",
      path: "/news-feed",
      icon: (
        <FaRegNewspaper
          title="News Feed"
          className="text-2xl  hover:text-white custom-hover"
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

  const dropdownRoutes = [
    {
      name: "Profile",
      path: "/user-profile",
    },
    {
      name: "Privacy",
      path: "/user-profile/settings/privacy",
    },
    {
      name: "Settings",
      path: "/user-profile/settings",
    },
  ];

  const handleLogoutUser = async () => {
    try {
      const { data, status } = await logoutUser(getAccessToken());
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      logout();
    }
  };

  if (
    currentPath === "/" ||
    currentPath === "/login" ||
    currentPath === "/register" ||
    !user
  ) {
    return null; // Do not render the Navbar on these paths
  }

  return (
    <nav className="h-[70px] grid grid-cols-2 md:grid-cols-3 gap-5 bg-gradient-to-r from-[#004A99] to-[#012349] items-center px-5 w-full min-w-[450px] custom-hover">
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

          <div className="grid grid-cols-2 items-center gap-2">
            {/* Notification icon */}
            <div className="relative h-full flex items-center justify-center">
              <FaRegBell className="text-2xl text-white hover:text-white hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out" />
              <div className="absolute top-1 right-1 bg-[#D6042A] text-center rounded-full w-5 h-5 text-white text-sm">
                5
              </div>
            </div>

            {/* User Profile */}
            <div
              className="relative transition ease-in-out duration-500 group hover:outline outline-blue-400 rounded-full flex items-center justify-center custom-hover"
              onClick={() => setDropdown(!dropdown)}
            >
              <Image
                // src={user?.profile_picture || '/ProfileDP/Dummy.png'}
                src={user?.profile_picture || "/ProfileDP/Dummy.png"}
                width={50}
                height={50}
                alt="User"
                className="rounded-full cursor-pointer"
              ></Image>

              {/* {dropdown ? (
                <div className='absolute top-14 right-4 bg-[#0d1f31] w-48 rounded-lg p-4 flex flex-col justify-between animate__animated animate__fadeIn animate__faster'>
                  <ul className='font-semibold flex flex-col gap-2 text-gray-200'>
                    <Link href={'/user-profile'}>
                      <li className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'>
                        Profile
                      </li>
                    </Link>
                    <li className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'>
                      Privacy
                    </li>
                    <Link
                      href={'/user-profile/settings'}
                      className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'
                    >
                      Settings
                    </Link>
                  </ul>
                  <button
                    onClick={handleLogoutUser}
                    className='bg-[#D6042A] text-white px-6 py-1 rounded-md hover:bg-[#b91a37]  transition ease-in-out duration-200 mt-12 w-full'
                  >
                    LogOut
                  </button>
                </div>
              ) : (
                ''
              )} */}

              {dropdown && (
                <DropDownMenu>
                  {" "}
                  {dropdownRoutes.map((path) => {
                    return (
                      <Link
                        href={path.path}
                        key={path.name}
                        className="hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear"
                      >
                        <span>{path.name}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogoutUser}
                    className="bg-[#D6042A] text-white px-6 py-1 rounded-md hover:bg-[#b91a37]  transition ease-in-out duration-200 mt-12 w-full"
                  >
                    LogOut
                  </button>
                </DropDownMenu>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
