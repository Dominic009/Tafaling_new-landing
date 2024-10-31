"use client";
import Image from "next/legacy/image";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
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
import { MdOutlinePrivacyTip, MdSettings } from "react-icons/md";
const AuthUserNavMenu = () => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const currentPath = usePathname();
  const { user, logout } = useAuth();
  const { item } = useLocalStorage("auth-token");

  const dropdownRoutes = [
    {
      name: "Profile",
      path: `/user-profile/${user?.userId}`,
      icon: <FaUserCircle className="text-xl" />,
    },
    {
      name: "Privacy",
      path: `/user-profile/${user?.userId}/settings/privacy`,
      icon: <MdOutlinePrivacyTip className="text-xl" />,
    },
    {
      name: "Settings",
      path: `/user-profile/${user?.userId}/settings`,
      icon: <MdSettings className="text-xl" />,
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

  return (
    <div className="grid grid-cols-2">
      {/* Notification icon */}
      <Notification />

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
                  <span className="flex items-center gap-2">
                    {path.icon} {path.name}
                  </span>
                </Link>
              );
            })}
            <button
              onClick={handleLogoutUser}
              className="bg-[#D6042A] text-white px-6 py-1 rounded-md hover:bg-[#b91a37]  transition ease-in-out duration-200 mt-12 w-full"
            >
              <span className="flex items-center justify-center gap-1">
                <HiOutlineLogout className="text-xl" />
                LogOut
              </span>
            </button>
          </DropDownMenu>
        )}
      </div>
    </div>
  );
};

export default AuthUserNavMenu;
