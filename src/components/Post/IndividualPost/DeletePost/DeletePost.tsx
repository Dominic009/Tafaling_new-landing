import { removePost } from '@/api/posts/posts';
import ActionButton from '@/components/Buttons/ActionButton';
import PrimaryBtn from '@/components/PrimaryBtn';
import { getAccessToken } from '@/helpers/tokenStorage';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { Post } from '../../UserPost/UserPost';
import toast from 'react-hot-toast';

interface IDeletePost {
  modal?: React.ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  post: Post;
  setRemoveId?: Dispatch<SetStateAction<number | null>>;
  setToggleEditPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePost: React.FC<IDeletePost> = ({
  modal,
  setModal,
  post,
  setRemoveId,
  setToggleEditPost,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [modal]);

  const deletePostHandler = async () => {
    try {
      setIsLoading(true);
      const res = await removePost(post.postId, getAccessToken());

      if (res.status === 200) {
        setRemoveId && setRemoveId(post.postId);
        setModal(false);
        setToggleEditPost(false);
        toast.success(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-center pt-2 pb-4 '>
        <p className='text-xl font-medium'>
          Are you sure you want to delete this post?
        </p>
      </div>
      <hr />
      <div className='px-14 py-3'>
        <div className='flex justify-around mt-2'>
          <ActionButton
            onClickFn={deletePostHandler}
            text={'Yes'}
            icon={FaCheck}
            btnColor='bg-[#e62d2d]'
            btnHoverColor='bg-[#c92626]'
            isLoading={isLoading}
          />
          <ActionButton
            onClickFn={() => setModal(!modal)}
            text={'No'}
            icon={FaXmark}
            btnColor='bg-[#217021]'
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
