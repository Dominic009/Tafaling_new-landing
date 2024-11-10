import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import CreatePost from './CreatePost/CreatePost';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import MainPostSkeleton from '../Loader/Skeleton/MainPostSkeleton';
import { getUserPrivacy } from '@/api/auth/auth';
import { PrivacySetting } from '@/types/Auth';

const MainPost: React.FC<IRefetchUserPostProp> = ({ setRefetchUserPost }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, login } = useAuth();
  // const [userPrivacy, setUserPrivacy] = useState<PrivacySetting[] | []>([]);
  const isUserPrivacyFetched = useRef(false);

  const openModalForTab = (tab: string | null) => {
    // setActiveTab(tab);
    setModal(true); // Open the modal
  };

  const closeModal = () => {
    setModal(false);
    // setActiveTab(null);
  };

  // Setting the loading state to false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {isLoading ? (
        <MainPostSkeleton />
      ) : (
        <div className='w-full mx-auto rounded-xl p-3 shadow mb-6 bg-white'>
          {/* User Profile and Post Button */}
          <div className='flex items-center gap-3'>
            <div className='w-12 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center'>
              <Image
                alt='User DP'
                src={user?.profile_picture || '/ProfileDP/Dummy.png'}
                width={50}
                height={50}
                objectFit='cover'
                className='w-10 h-10 md:w-16 md:h-16 rounded-full'
              />
            </div>
            <button
              onClick={() => openModalForTab(null)}
              className='text-gray-400 text-sm md:text-lg font-light w-full outline-none bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-full text-left transition duration-300 ease-in-out'
            >
              Thinking about something...?
            </button>
          </div>

          <div className='border-b w-full mt-2 mb-2'></div>

          {/* Interaction Buttons */}
          <ul className='grid grid-cols-3 text-gray-400'>
            <button
              onClick={() => openModalForTab(null)}
              className={`hover:bg-gray-100 px-4 rounded-full cursor-pointer flex items-center justify-center gap-1`}
            >
              <Image
                src={'/Icons/media.png'}
                width={30}
                height={30}
                alt='Media icon'
                className='w-5 h-5 md:w-9 md:h-9'
              />
              <span className='hidden md:block text-[12px] md:text-lg'>Photo/Video</span>
              <span className='block md:hidden text-[12px] md:text-lg'>Media</span> 
            </button>
            <li
              //   onClick={() => openModalForTab('location')}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1 text-[12px] md:text-lg'
            >
              <Image
                src={'/Icons/location.png'}
                width={30}
                height={30}
                alt='Location icon'
                className='w-5 h-5 md:w-9 md:h-9'
              />
              Location
            </li>
            <li
              //   onClick={() => openModalForTab('activity')}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1 text-[12px] md:text-lg'
            >
              <Image
                src={'/Icons/emoji.png'}
                width={30}
                height={30}
                alt='Activity icon'
                className='w-5 h-5 md:w-9 md:h-9'
              />
              Activity
            </li>
          </ul>
        </div>
      )}

      {/* Post Modal */}
      <Modal isOpen={modal} onClose={closeModal}>
        <CreatePost
          modal={modal}
          setModal={setModal}
          setRefetchUserPost={setRefetchUserPost}
          userPrivacy={user?.userPrivacy!}
        />
      </Modal>
    </>
  );
};

export default MainPost;
