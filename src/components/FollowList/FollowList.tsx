"use Client";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import SecondaryBtn from "../SecondaryBtn";
import ActionBtn from "../Buttons/User Profile buttons/ActionBtn";

interface FollowProps {
  name?: string;
  totalFollowers?: number;
  profile_picture?: string;
}

const FollowList: React.FC<FollowProps> = () => {
  const [users, setUsers] = useState<FollowProps[]>([]);

  useEffect(() => {
    fetch("fakeUsers.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      {users.map((user, idx) => (
        <div key={idx} className="grid grid-cols-4 items-center justify-center mb-2 bg-gray-50 rounded-lg px-2 drop-shadow scale-90">
          <div className="w-16 h-16 rounded-full flex items-center justify-center">
            <Image
              alt="User DP"
              src={user?.profile_picture || "/ProfileDP/Dummy.png"}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            ></Image>
          </div>
          <div className="col-span-2 text-left -ml-3">
            <h1 className="font-semibold text-lg">{user?.name}</h1>
            <small className="text-gray-400 font-semibold">{user?.totalFollowers} followers</small>
          </div>
          <div>
            <ActionBtn text="Follow" textSize="sm" fontWeight="semibold"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowList;
