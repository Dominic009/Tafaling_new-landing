import React from "react";

interface HeadingProps {
  heading: string;
}

const Heading: React.FC<HeadingProps> = ({ heading }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-5">{heading}</h1>
    </div>
  );
};

export default Heading;
