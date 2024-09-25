import Image from 'next/image';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import CreatePost from './CreatePost/CreatePost';

const MainPost = () => {
  const [modal, setModal] = useState<boolean>(false);
  const { user } = useAuth();

  const openModalForTab = (tab: string | null) => {
    // setActiveTab(tab);
    setModal(true); // Open the modal
  };

  const closeModal = () => {
    setModal(false);
    // setActiveTab(null);
  };

  return (
    <div>
      <div className='w-full mx-auto rounded-xl p-3 shadow mb-6 bg-white'>
        <div>
          {/* User Profile and Post Button */}
          <div className='flex items-center gap-3 '>
            <Image
              alt='User DP'
              src={user?.profile_picture || '/ProfileDP/Dummy.png'}
              width={50}
              height={50}
              className='mt-1 rounded-full'
            />
            <button
              onClick={() => openModalForTab(null)}
              className='text-gray-400 font-light w-full outline-none bg-gray-100 px-4 py-2 rounded-full text-left transition duration-300 ease-in-out'
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
              />
              Photo/Video
            </button>
            <li
              //   onClick={() => openModalForTab('location')}
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
              //   onClick={() => openModalForTab('activity')}
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
      </div>

      {/* Post Modal */}
      <Modal isOpen={modal} onClose={closeModal} width={'40%'}>
        <CreatePost modal={modal} setModal={setModal}/>
      </Modal>
    </div>
  );
};

export default MainPost;
