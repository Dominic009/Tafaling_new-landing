"use client";
import React from "react";
import 'animate.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-gray-600/50 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-40 flex items-center justify-center animate__animated animate__fadeIn animate__faster">
      <div className="w-[40%] mx-auto rounded-xl p-3 shadow mb-12 bg-white relative">
        {children}
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-rose-600 hover:text-white`}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
