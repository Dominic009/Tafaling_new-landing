import React, { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";

interface InteractionProps {}

const Interaction = () => {
  const [liked, setLiked] = useState(false);
  const actions = [
    {
      name: "Like",
      onClick: () => setLiked(!liked),
      icon: <FaRegHeart />,
      activeIcon: <FaHeart />,
      isActive: liked,
    },
    {
      name: "Comment",
      onClick: () => console.log("Comment"),
      icon: <FaRegComment />,
      activeIcon: "",
      disabled: true,
    },
    {
      name: "Share",
      onClick: () => console.log("Share"),
      icon: <FaRegShareSquare />,
      activeIcon: "",
      disabled: true,
    },
  ];

  return (
    <div className=" grid grid-cols-3">
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick ? action.onClick : undefined}
          disabled={action?.disabled}
          className={`flex items-center gap-1 justify-center ${
            !action.disabled && "cursor-pointer"
          } hover:bg-gray-100 py-1 custom-hover rounded-md ${
            action?.disabled && "cursor-not-allowed"
          }`}
        >
          <span className="text-2xl text-gray-600">
            {action.isActive ? <span className="text-blue-600">{action.activeIcon}</span> : action.icon}
          </span>
          <span className="text-gray-500">{action.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Interaction;
