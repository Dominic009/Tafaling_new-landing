import { useAuth } from '@/context/AuthContext/AuthProvider';
import React, { useState } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegShareSquare,
} from 'react-icons/fa';
import PreviewModal from '../Modal/PreviewModal';
import { Post } from '../Post/UserPost/UserPost';
import { likePost, unlikePost } from '@/api/posts/posts';
import { getAccessToken } from '@/helpers/tokenStorage';

interface InteractionProps {
  post: Post;
}

const Interaction: React.FC<InteractionProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked === 1 ? true : false);
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
        setLiked(!liked);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await likePost(post.postId, getAccessToken());
        console.log(response);
        setLiked(!liked);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log('interaction component', post.isLiked);

  const actions = [
    {
      name: 'Like',
      onClick: handleLike,
      icon: <FaRegHeart />,
      activeIcon: <FaHeart />,
      isActive: liked,
    },
    {
      name: 'Comment',
      onClick: () => console.log('Comment'),
      icon: <FaRegComment />,
      activeIcon: '',
      disabled: true,
    },
    {
      name: 'Share',
      onClick: () => console.log('Share'),
      icon: <FaRegShareSquare />,
      activeIcon: '',
      disabled: true,
    },
  ];

  return (
    <div className=' grid grid-cols-3'>
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick ? action.onClick : undefined}
          disabled={action?.disabled}
          className={`flex items-center gap-1 justify-center ${
            !action.disabled && 'cursor-pointer'
          } hover:bg-gray-100 py-1 custom-hover rounded-md ${
            action?.disabled && 'cursor-not-allowed'
          }`}
        >
          <span className='text-2xl text-gray-600'>
            {action.isActive ? (
              <span className='text-blue-600'>{action.activeIcon}</span>
            ) : (
              action.icon
            )}
          </span>
          <span className='text-gray-500'>{action.name}</span>
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
