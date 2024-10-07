import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface UserPostSkeletonProps {
  cards: number;
}

const UserPostSkeleton: React.FC<UserPostSkeletonProps> = ({ cards }) => {
  return (
    <>
      {[...Array(cards)].map((_, idx) => (
        <div
          key={idx}
          className="w-full h-[700px] rounded-xl p-3 mb-4 border border-gray-200 bg-white"
        >
          {/* Header */}
          <div className="flex items-center">
            <div>
              <Skeleton circle width={65} height={65} />
            </div>
            <div className="flex-1 text-left px-2">
              <h1 className="font-semibold text-xl w-[30%]">
                <Skeleton />
              </h1>
              <span className="text-sm text-gray-400 flex gap-2 items-center">
                <Skeleton width={30} height={10} />
                <Skeleton width={60} height={10} />
              </span>
            </div>
          </div>

          {/* Content body */}
          <div className="mt-2 cursor-pointer flex items-center justify-center">
            <div className="rounded-md w-full">
              <Skeleton height={500} />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-3">
            <p className="text-left w-full">
              <Skeleton height={15} count={2} />
            </p>

            <div className="flex mt-1 gap-3">
              <ul className="flex gap-3">
                <Skeleton width={40} height={10} />
                <Skeleton width={40} height={10} />
                <Skeleton width={40} height={10} />
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserPostSkeleton;
