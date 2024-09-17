import SideNav from "@/components/Profile Settings Nav/SideNav";
import React from "react";

const SettingsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-[#f4f7f8] p-8">
      <div className="border rounded-lg w-[80%] mx-auto flex flex-col items-center justify-center py-6">
        <div className="w-[90%] mb-4">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-gray-400">
            Manage your account settings and many more
          </p>
        </div>
        <div className="flex gap-5 w-[90%] mx-auto bg-white rounded-md">
          <SideNav></SideNav>
          <div className="flex-1 h-[80vh] overflow-auto overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
