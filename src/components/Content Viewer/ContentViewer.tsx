import Image from "next/legacy/image";
import React from "react";

interface ContentProps {
  imageURL: string;
  onClose: () => void;
}

const ContentViewer: React.FC<ContentProps> = ({ imageURL, onClose }) => {
  return (
    <div className="bg-gray-900/70 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster pt-[100px] overflow-hidden">
      <div className="mx-auto w-[95%] h-full rounded-xl p-3 shadow mb-12 bg-black/60 relative grid lg:grid-cols-4 gap-5">
        <div className="col-span-3 relative">
          <Image
            alt="Image"
            src={imageURL}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div className="border bg-[#f4f7f8] rounded-md">
          <h1>Comment section</h1>
        </div>
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white`}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ContentViewer;
