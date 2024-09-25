// components/SkeletonLoader.tsx
import React from "react";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "0.375rem", // Tailwind's default rounded-md
}) => {
  return (
    <div
      className="bg-gray-300 animate-pulse"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default SkeletonLoader;
