import Image from 'next/legacy/image';
import React, { ButtonHTMLAttributes, useEffect, useState } from 'react';
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //to hide the icon for small screens
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bgColor = `${disabled ? 'bg-[#0b819c]' : 'bg-[#10b9d8]'}`;
  const bgHoverColor = `${
    disabled ? 'hover:bg-[#0b819c] cursor-not-allowed' : 'hover:bg-[#10b9d8]'
  }`;

  return (
    <button
      className={`${bgColor} ${bgHoverColor} py-2 rounded-md text-white font-${weight} md:text-${size} flex items-center justify-center gap-2 transition duration-300 ease-in-out active:scale-90 relative`}
      style={{ width }}
      onClick={onclick}
      type={type}
      disabled={disabled}
    >
      {icon && !isSmallScreen && (
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
