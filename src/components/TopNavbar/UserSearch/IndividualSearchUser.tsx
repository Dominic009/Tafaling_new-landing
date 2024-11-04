/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ISearchUser } from "../Navbar";
import Image from "next/legacy/image";
import ActionButton from "@/components/Buttons/ActionButton";

interface IIndividualSearchUser {
  user: ISearchUser;
}

const IndividualSearchUser: React.FC<IIndividualSearchUser> = ({ user }) => {
  return (
    <div className=" w-[320px] z-50 flex">
      {/* <img src={user.profilePicture} alt='user' className='w-24' />
      <h1>{user.name}</h1> */}
      <div className="grid grid-cols-4 items-center justify-center mb-2 bg-gray-50 rounded-lg px-2 drop-shadow scale-90">
        <div className="w-16 h-16 rounded-full flex items-center justify-center">
          <Image
            alt="User DP"
            src={user?.profilePicture || "/ProfileDP/Dummy.png"}
            width={50}
            height={50}
            objectFit="cover"
            className="rounded-full"
          ></Image>
        </div>
        <div className="col-span-2 text-left -ml-3">
          <h1 className="font-semibold text-lg">{user?.name}</h1>
          {/* <small className="text-gray-400 font-semibold">
            {user?.totalFollowers} followers
          </small> */}
        </div>
        <div>
          <ActionButton text="Follow" outline/>
        </div>
      </div>
    </div>
  );
};

export default IndividualSearchUser;
