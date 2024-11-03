import DropDownMenu from "@/components/Drop down menu/DropDownMenu";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface PostSettingsProps {
  isToggled: boolean;
  onEditPrivacy: () => void;
  onDeletePost: () => void;
  bg?: string;
  top?: string;
  right?: string;
}

const PostSettings: React.FC<PostSettingsProps> = ({
  isToggled,
  onEditPrivacy,
  onDeletePost,
}) => {
  if (!isToggled) return null;

  return (
    <DropDownMenu bg="[#f4f7f8]" top="6" right="3">
      {/* Edit Privacy Button */}
      <button
        className="hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear"
        onClick={onEditPrivacy}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <FaUserCircle className="text-xl text-[#00B4DB]" /> Edit Privacy
        </span>
      </button>

      {/* Delete Post Button */}
      <button
        className="hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear"
        onClick={onDeletePost}
      >
        <span className="flex items-center gap-2 text-gray-800">
          <MdDeleteForever className="text-xl text-[#dc2626]" /> Delete Post
        </span>
      </button>
    </DropDownMenu>
  );
};

export default PostSettings;
