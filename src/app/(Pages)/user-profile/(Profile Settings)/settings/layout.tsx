import ActionBtn from "@/components/Buttons/User Profile buttons/ActionBtn";
import SideNav from "@/components/Profile Settings Nav/SideNav";
import React from "react";
import { FaRegSave } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";

const SettingsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-[#f4f7f8] p-8">
      <div className="border rounded-lg w-full mx-auto flex flex-col items-center justify-center py-6">
        <div className="w-[95%] mb-4 flex gap-3 items-center">
          <FaCogs className="text-5xl text-[#00B4DB]"></FaCogs>
          <div>
            <h1 className="text-2xl font-semibold">Account Settings</h1>
            <p className="text-gray-400">
              Manage your account settings and many more
            </p>
          </div>
        </div>
        <div className="flex gap-5 w-[95%] mx-auto bg-white rounded-md">
          <SideNav></SideNav>
          <div className="w-full py-4 px-6">
            <div className="flex-1 h-[60vh] overflow-auto overflow-y-auto ">
              {children}
            </div>
            <div className="h-[80px] flex justify-end items-center px-5">
              <ActionBtn
                text="Save changes"
                add=""
                icon={FaRegSave}
              ></ActionBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
