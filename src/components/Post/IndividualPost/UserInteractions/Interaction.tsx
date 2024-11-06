import { useAuth } from '@/context/AuthContext/AuthProvider';
import React, { useEffect, useState } from 'react';
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegShareSquare,
} from 'react-icons/fa';
import { likePost, unlikePost } from '@/api/posts/posts';
import { getAccessToken } from '@/helpers/tokenStorage';
import { Post } from '../../UserPost/UserPost';
import PreviewModal from '@/components/Modal/PreviewModal';

interface InteractionProps {
  post: Post;
  updatePostProperty: (
    postId: number,
    updatedProperties: Partial<Post>
  ) => void;
}

const Interaction: React.FC<InteractionProps> = ({
  post,
  updatePostProperty,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (liked) {
      setLikeCount(prevCount => prevCount - 1);
      setLiked(false);
      updatePostProperty(post.postId, {
        isLiked: 0,
        likeCount: post.likeCount !== 0 ? post.likeCount - 1 : 0,
      });
      try {
        const response = await unlikePost(post.postId, getAccessToken());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setLikeCount(prevCount => prevCount + 1);
        setLiked(true);
        console.log(error);
      }
    } else {
      setLikeCount(prevCount => prevCount + 1);
      setLiked(true);
      updatePostProperty(post.postId, {
        isLiked: 1,
        likeCount: post.likeCount + 1,
      });
      try {
        const response = await likePost(post.postId, getAccessToken());
        setLoading(true);
      } catch (error) {
        setLoading(false);
        setLikeCount(prevCount => prevCount - 1);
        setLiked(false);
        console.log(error);
      }
    }
  };

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

  useEffect(() => {
    setLiked(post.isLiked === 1);
    setLikeCount(post.likeCount);
  }, [post]);

  return (
    <div className='grid grid-cols-3 w-full'>
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
          <span className='text-xl text-gray-600'>
            {action.isActive ? (
              <span className='text-rose-600 drop-shadow-lg'>
                {action.activeIcon}
              </span>
            ) : (
              action.icon
            )}
          </span>
          <span className='text-gray-500'>
            {action.name === 'Like' && likeCount ? likeCount : action.name}
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
