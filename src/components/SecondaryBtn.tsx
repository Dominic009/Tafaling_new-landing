import Image from 'next/image';
import React from 'react';

const SecondaryBtn = ({ text, icon, width }) => {
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
