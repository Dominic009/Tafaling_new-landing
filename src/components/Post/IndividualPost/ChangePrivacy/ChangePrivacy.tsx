import { updatePostPrivacy } from '@/api/posts/posts';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import PrimaryBtn from '@/components/PrimaryBtn';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { getAccessToken } from '@/helpers/tokenStorage';
import { PrivacySetting } from '@/types/Auth';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGlobe, FaUserLock, FaUsers } from 'react-icons/fa6';
import { Post } from '../../UserPost/UserPost';

interface PostProps extends IRefetchUserPostProp {
  modal?: React.ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  userPrivacy: PrivacySetting[] | [] | undefined;
  postData: {
    postId: number | null;
    privacyId: number | null;
  };
  setToggleEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  setPostPrivacy: React.Dispatch<React.SetStateAction<PrivacySetting>>;
  updatePostProperty: (
    postId: number,
    updatedProperties: Partial<Post>
  ) => void;
}

interface ChangePrivacyType {
  post: string;
  file: string | any;
  privacy: string;
}

const ChangePrivacy: React.FC<PostProps> = ({
  modal,
  setModal,
  setRefetchUserPost,
  userPrivacy,
  postData,
  setToggleEditPost,
  setPostPrivacy,
  updatePostProperty,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm<ChangePrivacyType>({
    defaultValues: {
      privacy: postData?.privacyId?.toString(),
    },
  });

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [modal]);

  const ChangePrivacyHandler = async (data: ChangePrivacyType) => {
    const postBody = {
      privacy_id: parseInt(data.privacy, 10),
      post_id: postData.postId,
    };

    try {
      setIsLoading(true);
      const response = await updatePostPrivacy(postBody, getAccessToken());
      toast.success(response.data.message);

      // update post privacy text
      const userPirvacyText = user?.userPrivacy?.find(
        item => item.privacy_setting_id === parseInt(data.privacy, 10)
      );

      setPostPrivacy(userPirvacyText!);
      updatePostProperty(postData.postId as number, {
        privacyId: parseInt(data.privacy),
      });

      setModal(false);
      setToggleEditPost(false);

      setRefetchUserPost && setRefetchUserPost(true);
    } catch (error) {
      toast.error('Privacy update failed');
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-center pt-2 pb-4'>
        <p className='text-xl font-medium'>Select audience</p>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit(ChangePrivacyHandler)}
        className='px-14 py-3'
      >
        {/* select audience */}
        <div className='flex items-center p-3 hover:bg-slate-300 transition rounded'>
          <label className='flex items-center w-full cursor-pointer'>
            <div className='h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center'>
              <FaGlobe className='text-[#00B4DB]' />
            </div>
            <span className=' ps-2'>Public</span>
            <input
              type='radio'
              value='1'
              {...register('privacy', { required: true })}
              className='ml-auto'
            />
          </label>
        </div>

        <div className='flex items-center p-3 hover:bg-slate-300 transition rounded'>
          <label className='flex items-center w-full cursor-pointer'>
            <div className='h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center'>
              <FaUsers className='text-[#00B4DB]' />
            </div>
            <span className=' ps-2'>Friends</span>
            <input
              type='radio'
              value='2'
              {...register('privacy', { required: true })}
              className='ml-auto'
            />
          </label>
        </div>

        <div className='flex items-center p-3 hover:bg-slate-300 transition rounded'>
          <label className='flex items-center w-full cursor-pointer '>
            <div className='h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center'>
              <FaUserLock className='text-[#00B4DB]' />
            </div>
            <span className=' ps-2'>Only Me</span>
            <input
              type='radio'
              value='3'
              {...register('privacy', { required: true })}
              className='ml-auto'
            />
          </label>
        </div>

        <div className='flex justify-end mt-2'>
          <PrimaryBtn
            text={'Save'}
            width={'20%'}
            onclick={handleSubmit(ChangePrivacyHandler)}
            isLoading={isLoading}
            disabled={isLoading}
          ></PrimaryBtn>
        </div>
      </form>
    </div>
  );
};

export default ChangePrivacy;
