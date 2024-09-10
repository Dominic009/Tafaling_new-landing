import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  text?: string;
  icon?: IconType; // Expecting an icon component from react-icons
}

const ActionBtn: React.FC<ActionBtnProps> = ({ text, icon: Icon }) => {
  return (
    <div className="flex items-center justify-center gap-1 rounded-lg border border-[#00274A] hover:bg-[#00274A] hover:text-white custom-hover px-3">
      {Icon && <Icon className="text-[#00B4DB] text-2xl" />}
      <button className="py-1 lg:text-lg">{text}</button>
    </div>
  );
};

export default ActionBtn;
