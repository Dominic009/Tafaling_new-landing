import React, { useState, useEffect } from 'react';

interface DropDownMenuProps {
  children: React.ReactNode;
  top?: string;
  right?: string;
  bg?: string;
  duration?: number;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  children,
  top,
  right,
  bg,
  duration = 50000, // default to 3 seconds
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => setIsVisible(false), 800);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  const bgColor = bg ? `bg-${bg}` : `bg-[#0d1f31]`;
  const topPosition = top ? `top-${top}` : `top-14`;
  const rightPosition = right ? `right-${right}` : `right-5`;

  return (
    <div
      className={`absolute ${topPosition} ${rightPosition} ${bgColor} w-48 rounded-lg p-4 flex flex-col justify-between ${
        isClosing
          ? 'animate__animated animate__fadeOut animate__faster'
          : 'animate__animated animate__fadeIn animate__faster'
      }`}
    >
      <ul className='font-semibold flex flex-col gap-2 text-gray-200'>
        {children}
      </ul>
    </div>
  );
};

export default DropDownMenu;
