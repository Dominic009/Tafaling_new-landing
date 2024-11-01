'use client';
import React from 'react';
import 'animate.css';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  bg?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  bg = 'white',
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className='bg-gray-600/50 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster pt-24 custom-scrollbar overflow-hidden overflow-y-scroll'>
      <div
        className={`mx-auto rounded-xl p-3 shadow mb-12 bg-${bg} ${className} relative`}
        style={{ width }}
      >
        {children}
        <button
          onClick={onClose}
          className={`absolute -top-3 -right-3 font-semibold text-gray-500 bg-gray-100 px-2 py-2 rounded-full hover:bg-red-600 hover:text-white custom-hover`}
        >
          <IoClose className='text-xl' />
        </button>
      </div>
    </div>
  );
};

export default Modal;
