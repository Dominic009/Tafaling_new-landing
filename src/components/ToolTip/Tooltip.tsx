import React from "react";

interface TooltipProps {
  title?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title }) => {
  return (
    <div className="hidden group-active:block absolute -bottom-6 right-3 z-50 bg-[#2f94ff] text-white px-3 py-1 rounded-xl">
      {title}
    </div>
  );
};

export default Tooltip;
