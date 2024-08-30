import Image from 'next/image';
import React from 'react';

interface PrimaryBtnProps {
  text: string;
  icon?: boolean;
  width?: string;
  size?: string;
  weight?: string;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ text, icon, width, size, weight }) => {
  return (
    <button
      className={`bg-[#00B4DB] py-2 rounded-md text-white font-${weight} text-${size} flex items-center justify-center gap-2 hover:bg-[#10a6c8] transition duration-300 ease-in-out hover:scale-105`}
      style={{ width }}
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
