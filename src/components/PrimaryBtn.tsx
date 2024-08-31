import Image from 'next/image';
import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryBtnProps {
  text: string;
  icon?: boolean;
  width?: string;
  size?: string;
  weight?: string;
  onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  text,
  icon,
  width,
  size,
  weight,
  onclick,
  type,
}) => {
  return (
    <button
      className={`bg-[#00B4DB] py-2 rounded-md text-white font-${weight} text-${size} flex items-center justify-center gap-2 hover:bg-[#10a6c8] transition duration-300 ease-in-out hover:scale-105`}
      style={{ width }}
      onClick={onclick}
      type={type}
    >
      {icon && (
        <Image
          src={'/Icons/login.png'}
          alt='login'
          width={35}
          height={30}
        ></Image>
      )}
      {text}
    </button>
  );
};

export default PrimaryBtn;
