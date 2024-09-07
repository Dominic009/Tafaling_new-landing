import Image from "next/legacy/image";
import React from 'react';

interface SecondaryBtnProps {
  text: string;
  icon?: boolean;
  width?: string;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ text, icon, width }) => {
  return (
    <button
      className='border-2 border-[#64e3ff] py-2 rounded-md text-white font-bold text-2xl flex items-center justify-center gap-2 hover:bg-[#10a6c8] transition duration-300 ease-in-out hover:scale-105'
      style={{ width }}
    >
      {icon && (
        <Image
          src={'/Icons/register.png'}
          alt='login'
          width={30}
          height={30}
        ></Image>
      )}
      {text}
    </button>
  );
};

export default SecondaryBtn;
