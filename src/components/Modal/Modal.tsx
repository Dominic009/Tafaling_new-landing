"use client";
import React from "react";
import "animate.css";
import { IoClose } from "react-icons/io5";

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
  bg = "white",
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-600/50 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster pt-12">
      <div
        className={`mx-auto rounded-xl p-3 shadow mb-12 bg-${bg} ${className} relative w-[90%] md:w-2.5/3 lg:w-[40%] `}
      >
        <div className="max-h-[800px] overflow-auto hide-scrollbar" style={width ? { width } : {}}>
          {children}
          <button
            onClick={onClose}
            className={`absolute -top-3 -right-3 font-semibold text-gray-500 bg-gray-100 px-2 py-2 rounded-full hover:bg-red-600 hover:text-white custom-hover`}
          >
            <IoClose className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
