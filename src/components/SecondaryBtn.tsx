import Image from "next/legacy/image";
import React from "react";
import { IconType } from "react-icons";

interface SecondaryBtnProps {
  text: string;
  Icon?: IconType;
  width?: string;
  onClose: () => void;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ text, Icon: Icon, width, onClose }) => {
  return (
    <button
    onClick={onClose}
      className="border-2 border-[#64e3ff] py-2 rounded-md text-white font- text-xl flex items-center justify-center gap-2 hover:bg-[#10a6c8] transition duration-300 ease-in-out hover:scale-105"
      style={{ width }}
    >
      {Icon && <Icon className="text-white text-2xl" />}
      {text}
    </button>
  );
};

export default SecondaryBtn;
