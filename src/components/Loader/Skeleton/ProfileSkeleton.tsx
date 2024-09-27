import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="w-full lg:w-[90%] mx-auto">
      <div className="relative border-b pb-7">
        {/* Timeline IMG */}
        <div className="relative h-[240px] md:h-[300px] lg:h-[450px]">
          <Skeleton height={400} />
        </div>

        {/* User DP */}
        <div className="flex flex-col lg:flex-row gap-5 w-[90%] mx-auto -mt-24">
          {/* overlay div */}
          <div className="w-48 md:w-[250px] lg:w-[300px] h-48 md:h-[250px] lg:h-[300px] group relative">
            <Skeleton height={300} />
          </div>
          <div className="grid">
            <div></div>
            <div className="flex flex-col justify-between lg:pt-10">
              <div>
                {/* user name */}
                <h1 className="text-[#00274A] font-semibold text-3xl mb-2">
                  <Skeleton />
                </h1>
                {/* user email */}
                <p className="text-[#00274A]/50 text-md -mt-2">
                  <Skeleton />
                </p>
              </div>
              {/* user bio */}
              <p className="text-[#0E2943]/90 text-lg py-1 pr-16 flex items-center gap-2">
                <Skeleton width={480} />
              </p>

              <div className="flex items-center gap-4">
                <h5 className="text-[#00274A] flex gap-2">
                  <span className="text-xl font-semibold">
                    <Skeleton width={30} />
                  </span>{" "}
                  <Skeleton width={65} />
                </h5>
                <span className="w-2 h-2 rounded-full bg-[#00274A]"></span>
                <h5 className="text-[#00274A] flex gap-2">
                  <span className="text-xl font-semibold">
                    <Skeleton width={30} />
                  </span>{" "}
                  <Skeleton width={65} />
                </h5>
              </div>

              <div className="flex items-center gap-5 w-[50%]">
                <Skeleton width={65} />
                <Skeleton width={65} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
