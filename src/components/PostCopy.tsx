'use client';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import PostBody from './PostBodyCopy';
import FileUploader from './Input File/FileUploader';
import { useAuth } from '@/context/AuthContext/AuthProvider';

const Post: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { user } = useAuth();

  // Function to handle the opening of the modal for different tabs
  const openModalForTab = (tab: string | null) => {
    setActiveTab(tab);
    setModal(true); // Open the modal
  };

  // Function to close the modal and reset the active tab
  const closeModal = () => {
    setModal(false);
    setActiveTab(null);
  };

  // console.log(activeTab)

  return (
    <div>
      <div className='w-full mx-auto rounded-xl p-3 shadow mb-6 bg-white'>
        <div>
          {/* User Profile and Post Button */}
          <div className='flex items-center gap-3 '>
            <Image
              alt='User DP'
              // src={user?.profile_picture || '/ProfileDP/Dummy.png'}
              src={'/ProfileDP/Dummy.png'}
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
              onClick={() => openModalForTab('photo-video')}
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
              onClick={() => openModalForTab('location')}
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
              onClick={() => openModalForTab('activity')}
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

      {/* Modal Content Based on Active Tab */}
      <Modal isOpen={modal} onClose={closeModal}>
        {/* Default Modal for "Thinking about something...?" */}
        {!activeTab && <PostBody></PostBody>}

        {/* Modal for Photo/Video Upload */}
        {activeTab === 'photo-video' && (
          <div>
            <PostBody>
              {/* new */}
              <FileUploader></FileUploader>
            </PostBody>
          </div>
        )}

        {/* Modal for Location */}
        {activeTab === 'location' && (
          <PostBody>
            {' '}
            <div>
              <h2 className='text-xl mb-4'>Add Location</h2>
              <input
                type='text'
                placeholder='Enter location...'
                className='w-full border border-gray-300 p-2 rounded-md mb-4'
              />
            </div>
          </PostBody>
        )}

        {/* Modal for Activity */}
        {activeTab === 'activity' && (
          <PostBody>
            {' '}
            <div>
              <h2 className='text-xl mb-4'>Add Activity</h2>
              <input
                type='text'
                placeholder='What are you doing?'
                className='w-full border border-gray-300 p-2 rounded-md mb-4'
              />
            </div>
          </PostBody>
        )}
      </Modal>
    </div>
  );
};

export default Post;
