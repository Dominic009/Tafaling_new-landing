'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import PrimaryBtn from './PrimaryBtn';

const Post: React.FC = () => {
  const [modal, setModal] = useState(false);

  console.log(modal);

  return (
    <div>
      <div className='w-[90%] mx-auto backdrop-blur-md rounded-xl p-3 shadow mb-12 bg-white'>
        <div>
          <div className='flex items-center gap-3'>
            <Image
              alt='User DP'
              src={'/ProfileDP/Profile.png'}
              width={50}
              height={50}
              className='mt-1'
            ></Image>
            <button
              onClick={() => setModal(!modal)}
              className='text-gray-400 font-light w-full outline-none bg-gray-100 px-4 py-2 rounded-full text-left transition duration-300 ease-in-out'
            >
              Thinking about something...?
            </button>
          </div>

          <div className='border-b w-full mt-2 mb-2'></div>

          <div>
            <ul className='grid grid-cols-3 text-gray-400'>
              <li className='hover:bg-gray-100 px-4 rounded-full cursor-pointer flex items-center justify-center gap-1'>
                <Image
                  src={'/Icons/media.png'}
                  width={30}
                  height={30}
                  alt='Media icon'
                ></Image>
                Photo/Video
              </li>
              <li className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'>
                <Image
                  src={'/Icons/location.png'}
                  width={30}
                  height={30}
                  alt='Media icon'
                ></Image>
                Location
              </li>
              <li className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'>
                <Image
                  src={'/Icons/emoji.png'}
                  width={30}
                  height={30}
                  alt='Media icon'
                ></Image>
                Activity
              </li>
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <div className='bg-gray-600/50 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-30 flex items-center justify-center'>
          <div className='w-[40%] mx-auto rounded-xl p-3 shadow mb-12 bg-white relative'>
            <div className='h-28 border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <Image
                  alt='User DP'
                  src={'/Profile.png'}
                  width={50}
                  height={65}
                ></Image>
                <input
                  type='text'
                  placeholder='Thinking of something...?'
                  className='text-gray-400 font-light w-full outline-none h-[100px]'
                />
              </div>
            </div>
            <div className='mt-3 flex justify-between items-center'>
              <div>
                <ul className='flex text-gray-400'>
                  <li className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1'>
                    <Image
                      src={'/Icons/media.png'}
                      width={30}
                      height={30}
                      alt='Media icon'
                    ></Image>
                    Photo/Video
                  </li>
                  <li className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1'>
                    <Image
                      src={'/Icons/location.png'}
                      width={30}
                      height={30}
                      alt='Media icon'
                    ></Image>
                    Location
                  </li>
                  <li className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1'>
                    <Image
                      src={'/Icons/emoji.png'}
                      width={30}
                      height={30}
                      alt='Media icon'
                    ></Image>
                    Activity
                  </li>
                </ul>
              </div>
              <PrimaryBtn text={'Create Post'} width={'15%'}></PrimaryBtn>
            </div>

            <button
              onClick={() => setModal(false)}
              className='absolute top-2 right-2 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-rose-600 hover:text-white transition duration-300 ease-in-out'
            >
              X
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Post;
