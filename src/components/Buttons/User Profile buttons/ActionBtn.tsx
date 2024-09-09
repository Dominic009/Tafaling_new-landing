import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  text?: string;
  icon?: IconType; // Expecting an icon component from react-icons
}

const ActionBtn: React.FC<ActionBtnProps> = ({ text, icon: Icon }) => {
  return (
    <div className="flex items-center justify-center w-[30%] rounded-xl border border-[#00274A] hover:bg-[#00274A] hover:text-white custom-hover">
      {Icon && <Icon className="text-[#00B4DB] text-2xl" />}{" "}
      <button className="px-2 py-2 text-lg">{text}</button>
    </div>
  );
};

export default ActionBtn;
