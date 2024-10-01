'use client'
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const VirtualNav = () => {
  const { user } = useAuth();
  const currentPath = usePathname();

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

  if (
    currentPath === "/" ||
    currentPath === "/login" ||
    currentPath === "/register" ||
    !user
  ) {
    return null; // Do not render the Navbar on these paths
  }
  return (
    <div className="md:hidden bg-[#F1FEFF]/60 backdrop-blur-sm w-[220px] mx-auto py-3 px-5 rounded-2xl sticky bottom-5">
      <div className="flex gap-9 items-center justify-center">
        {routes.map((path) => {
          const isActive = path.path === currentPath;
          return (
            <Link
              href={path.path}
              key={path.name}
              className={`${
                isActive
                  ? "text-[#265158] bg-inherit border-b-2 border-[#095563] rounded-sm"
                  : "text-2xl text-[#407C87]/50 hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
              }`}
            >
              <span>{path.icon}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualNav;
