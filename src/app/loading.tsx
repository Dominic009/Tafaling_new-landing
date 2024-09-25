// components/SkeletonLoader.tsx
import React from "react";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height,
  borderRadius = "0.375rem",
}) => {
  return (
    <div
      className="mb-4 mx-auto bg-white rounded-xl p-3 shadow animate-pulse  "
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      {/* Header */}
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="flex-1 text-left px-2">
          <h1 className="font-semibold text-xl bg-gray-300 w-9 h-2"></h1>
          <span className="text-sm text-gray-400 flex gap items-center bg-gray-300 w-5 h-2">
          </span>
        </div>
        <div>
          <div className="text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl w-6 h-3"/>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
