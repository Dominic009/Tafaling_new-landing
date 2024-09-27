import React from "react";
import Skeleton from "react-loading-skeleton";

const MainPostSkeleton = () => {
  return (
    <div>
      <div className="w-full mx-auto rounded-xl p-3 shadow mb-6 bg-white">
        <div>
          {/* User Profile and Post Button */}
          <div className="flex items-center gap-3 ">
            <div>
              <Skeleton circle width={50} height={50} />
            </div>
            <div className="font-light w-full outline-none bg-gray-100 px-4 py-2 rounded-full text-left transition duration-300 ease-in-out">
              <Skeleton />
            </div>
          </div>

          <div className="border-b w-full mt-2 mb-2"></div>

          {/* Interaction Buttons */}
          <ul className="grid grid-cols-3 text-gray-400">
            <button className={`rounded-full`}>
              <Skeleton width={60} />
            </button>
            <li className="py-1 rounded-1">
              <Skeleton width={60} />
            </li>
            <li className="py-1 rounded-1">
              <Skeleton width={60} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPostSkeleton;
