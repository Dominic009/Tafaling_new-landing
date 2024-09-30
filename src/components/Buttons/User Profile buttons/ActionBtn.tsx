import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface ActionBtnProps {
  text?: string;
  icon?: IconType; // Expecting an icon component from react-icons
  add: string;
  secondaryText?: string;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  text,
  icon: Icon,
  add: address,
  secondaryText,
}) => {
  return (
    <Link href={`${address}`}>
      <div className="flex items-center justify-center gap-2 rounded-lg border border-[#00274A] hover:bg-[#00274A] hover:text-white custom-hover px-3">
        {Icon && <Icon className="text-[#00B4DB] text-2xl" />}

        <button className="py-1 lg:text-lg flex items-center gap-1">{text} <span className="hidden md:block"> {secondaryText}</span></button>
      </div>
    </Link>
  );
};

export default ActionBtn;
