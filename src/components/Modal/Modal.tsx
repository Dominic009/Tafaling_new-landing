"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-600/50 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-30 flex items-center justify-center">
      <div className="w-[40%] mx-auto rounded-xl p-3 shadow mb-12 bg-white relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-rose-600 hover:text-white transition duration-300 ease-in-out"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
