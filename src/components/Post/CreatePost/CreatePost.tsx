import PrimaryBtn from '@/components/PrimaryBtn';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface PostProps {
  modal?: React.ReactNode;
}

interface CreatePostType {
  post: string;
}

const CreatePost: React.FC<PostProps> = ({ modal }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostType>();

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [modal]);

  const createPostHandler = (data: CreatePostType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(createPostHandler)}>
      <div className='flex items-center gap-3 border-b border-gray-200'>
        <Image
          alt='User DP'
          src={user?.profile_picture || '/ProfileDP/Dummy.png'}
          width={50}
          height={65}
        />
        <input
          type='text'
          placeholder='Thinking of something...?'
          {...register('post')}
          className='text-gray-400 font-light w-full outline-none h-[100px]'
        />
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <div>
          {/* Interaction Buttons */}
          <ul className='grid grid-cols-3 text-gray-400'>
            <li
              //   onClick={() => openModalForTab("photo-video")}
              className='hover:bg-gray-100 px-4 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Image
                src={'/Icons/media.png'}
                width={30}
                height={30}
                alt='Media icon'
              />
              Photo/Video
            </li>
            <li
              //   onClick={() => openModalForTab("location")}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Image
                src={'/Icons/location.png'}
                width={30}
                height={30}
                alt='Location icon'
              />
              Location
            </li>
            <li
              //   onClick={() => openModalForTab("activity")}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Image
                src={'/Icons/emoji.png'}
                width={30}
                height={30}
                alt='Activity icon'
              />
              Activity
            </li>
          </ul>
        </div>
        <PrimaryBtn text={'Create Post'} width={'15%'}></PrimaryBtn>
      </div>
    </form>
  );
};

export default CreatePost;
