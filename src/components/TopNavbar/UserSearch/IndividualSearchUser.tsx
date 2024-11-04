/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ISearchUser } from "../Navbar";
import Image from "next/legacy/image";
import ActionBtn from "@/components/Buttons/User Profile buttons/ActionBtn";
import { BsPersonFillAdd } from "react-icons/bs";

interface IIndividualSearchUser {
  user: ISearchUser;
}

const IndividualSearchUser: React.FC<IIndividualSearchUser> = ({ user }) => {
  return (
    <div className=" max-w-[400px] z-50 flex">
      <div className="grid grid-cols-6 gap-3 items-center justify-center mb-2 px-1 bg-gray-50 rounded-lg drop-shadow scale-90">
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
        <div className="col-span-3 text-left">
          <h1 className="font-semibold text-lg leading-5">{user?.name}</h1>
          <small className="text-gray-400 font-semibold">
            {user?.followers} followers
          </small>
        </div>
        <div className="col-span-2 flex justify-end">
          <div className="w-[70%]  ">
            <ActionBtn text="Follow" icon={BsPersonFillAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSearchUser;
