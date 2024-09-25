import Link from "next/link";
import React from "react";

interface DropDownMenuProps {
  children: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ children }) => {
  return (
    <div className="absolute top-14 right-4 bg-[#0d1f31] w-48 rounded-lg p-4 flex flex-col justify-between animate__animated animate__fadeIn animate__faster">
      <ul className="font-semibold flex flex-col gap-2 text-gray-200">
        {children}
      </ul>
    </div>
  );
};

export default DropDownMenu;
