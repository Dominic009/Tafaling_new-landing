import { useAuth } from "@/context/AuthContext/AuthProvider";
import React, { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";
import PreviewModal from "../Modal/PreviewModal";
import { Post } from "../Post/UserPost/UserPost";
import { likePost, unlikePost } from "@/api/posts/posts";
import { getAccessToken } from "@/helpers/tokenStorage";

interface InteractionProps {
  post: Post;
}

const Interaction: React.FC<InteractionProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked === 1);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (liked) {
      try {
        const response = await unlikePost(post.postId, getAccessToken());
        console.log(response);
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await likePost(post.postId, getAccessToken());
        console.log(response);
        setLiked(true); 
        setLikeCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const actions = [
    {
      name: "Like",
      onClick: handleLike,
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
    <div className="grid grid-cols-3">
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
            {action.isActive ? (
              <span className="text-blue-600">{action.activeIcon}</span>
            ) : (
              action.icon
            )}
          </span>
          <span className="text-gray-500">
            {action.name === "Like" && likeCount ? likeCount : action.name}
          </span>
        </button>
      ))}
      <PreviewModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </div>
  );
};

export default Interaction;
