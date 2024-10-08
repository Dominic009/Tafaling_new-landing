import React, { useEffect, useState } from "react";
import ButtonLoader from "./Loader/ButtonLoader";
import { IconType } from "react-icons";

interface PrimaryBtnProps {
  text: string;
  icon?: IconType;
  width?: string;
  size?: string;
  weight?: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  isLoading?: boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  icon: Icon,
  width,
  size,
  weight,
  onclick,
  type,
  disabled,
  isLoading = false,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //to hide the icon for small screens
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bgColor = `${disabled ? "bg-[#0b819c]" : "bg-[#10b9d8]"}`;
  const bgHoverColor = `${
    disabled ? "hover:bg-[#0b819c] cursor-not-allowed" : "hover:bg-[#0c92ab]"
  }`;

  return (
    <button
      className={`${bgColor} ${bgHoverColor} py-2 rounded-md text-white font-${weight} md:text-${size} flex items-center justify-center gap-2 transition duration-300 ease-in-out active:scale-90 relative`}
      style={{ width }}
      onClick={onclick}
      type={type}
      disabled={disabled}
    >
      {Icon && !isSmallScreen && <Icon className="text-white text-2xl" />}
      {isLoading ? <ButtonLoader /> : text}
    </button>
  );
};

export default PrimaryBtn;
