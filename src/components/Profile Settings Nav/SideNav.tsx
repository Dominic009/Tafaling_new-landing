'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
  const currentPath = usePathname();
  console.log(currentPath)
  const routes = [
    {
      name: "Change Pass",
      path: "/user-profile/settings/change-pass",
      //   icon: (
      //     <TiHome
      //       title='Home'
      //       className='text-3xl  hover:text-white custom-hover'
      //     />
      //   ),
    },
    {
      name: "Privacy",
      path: "/user-profile/settings/privacy",
      //   icon: (
      //     <FaRegNewspaper
      //       title='News Feed'
      //       className='text-2xl  hover:text-white custom-hover'
      //     />
      //   ),
    },
    {
      name: "Edit Info",
      path: "",
      //   icon: (
      //     <BsFillPeopleFill
      //       title='Requests'
      //       className='text-2xl  hover:text-white custom-hover'
      //     />
      //   ),
    },
  ];
  return (
    <div className=" w-[20%] bg-[#00274A] rounded-md">
      <ul className="text-xl flex flex-col justify-evenly items-center h-[40%] p-5">
        {routes.map((path) => {
          const isActive = path.path === currentPath;
          return (
            <Link
              href={path.path}
              key={path.name}
              className={`${
                isActive
                  ? "text-left font-semibold text-white bg-blue-700 rounded-md px-2 w-[90%]"
                  : "text-white/50 hover:bg-blue-300 w-[90%]"
              }`}
            >
              {/* <span>{path.icon}</span> */}
              <span>{path.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
