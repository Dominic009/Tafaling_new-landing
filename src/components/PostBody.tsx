import Image from "next/legacy/image";
import React from "react";
import PrimaryBtn from "./PrimaryBtn";

interface PostProps {
    children?: React.ReactNode;
}

const PostBody: React.FC<PostProps> = ({children}) => {
  return (
    <div>
      <div className="flex items-center gap-3 border-b border-gray-200">
        <Image
          alt="User DP"
          src={"/ProfileDP/Profile.png"}
          width={50}
          height={65}
        />
        <input
          type="text"
          placeholder="Thinking of something...?"
          className="text-gray-400 font-light w-full outline-none h-[100px]"
        />
      </div>
      {children}
      <div className="mt-3 flex justify-between items-center">
        <div>
          <ul className="flex text-gray-400">
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/media.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Photo/Video
            </li>
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/location.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Location
            </li>
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/emoji.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Activity
            </li>
          </ul>
        </div>
        <PrimaryBtn text={"Create Post"} width={"15%"}></PrimaryBtn>
      </div>
    </div>
  );
};

export default PostBody;
