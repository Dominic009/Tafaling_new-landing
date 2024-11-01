import React from 'react';
import { IconType } from 'react-icons';

interface IActionButtonProps {
  text?: string;
  icon?: IconType; // Expecting an icon component from react-icons
  add?: string;
  secondaryText?: string;
  btnColor?: string;
  btnHoverColor?: string;
  outline?: boolean;
  onClickFn?: () => void;
  isLoading?: boolean;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  text,
  icon: Icon,
  add,
  secondaryText,
  outline,
  btnColor,
  btnHoverColor,
  onClickFn,
  isLoading,
}) => {
  if (outline) {
    return (
      <button
        disabled={isLoading}
        className={`flex items-center justify-center ${
          text && 'gap-2'
        } rounded-lg border border-[#00274A] hover:bg-[#00274A] hover:text-white custom-hover px-3`}
      >
        {Icon && <Icon className='text-[#00B4DB] text-2xl' />}
        <span className='py-1 flex items-center gap-1'>{text}</span>
        <span className='hidden md:block'> {secondaryText}</span>
      </button>
    );
  }

  return (
    <button
      disabled={isLoading}
      onClick={onClickFn}
      className={`flex items-center justify-center ${
        text && 'gap-2'
      } rounded-lg ${btnColor} hover:${btnHoverColor} text-white hover:text-white custom-hover px-3`}
    >
      {Icon && <Icon className='text-[#fff] text-2xl' />}
      <span className='py-1 flex items-center gap-1'>{text}</span>
      <span className='hidden md:block'> {secondaryText}</span>
    </button>
  );
};

export default ActionButton;
