import Image from "next/legacy/image";
import React, { ButtonHTMLAttributes } from 'react';
import ButtonLoader from './Loader/ButtonLoader';

interface PrimaryBtnProps {
  text: string;
  icon?: boolean;
  width?: string;
  size?: string;
  weight?: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  isLoading?: boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  icon,
  width,
  size,
  weight,
  onclick,
  type,
  disabled,
  isLoading = false,
}) => {
  const bgColor = `${disabled ? 'bg-[#0b819c]' : 'bg-[#00B4DB]'}`;
  const bgHoverColor = `${
    disabled ? 'hover:bg-[#0b819c]' : 'hover:bg-[#10a6c8]'
  }`;

  return (
    <button
      className={`${bgColor} ${bgHoverColor} py-2 rounded-md text-white font-${weight} text-${size} flex items-center justify-center gap-2 transition duration-300 ease-in-out active:scale-90 relative`}
      style={{ width }}
      onClick={onclick}
      type={type}
      disabled = {disabled}
    >
      {icon && (
        <Image
          src={'/Icons/login.png'}
          alt='login'
          width={35}
          height={35}
        ></Image>
      )}
      {isLoading ? <ButtonLoader /> : text}
    </button>
  );
};

export default PrimaryBtn;
