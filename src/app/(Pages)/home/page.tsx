import Navbar from '@/components/Navbar';
import Post from '@/components/Post';
import UserPost from '@/components/UserPost';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className='fixed z-50 w-full'>
        <Navbar></Navbar>
      </div>
      {/* Page Layout */}
      <div className='w-full grid gap-3 text-center justify-center px-8 py-20'>
        <div className='border h-[80vh] fixed left-20 w-[18%]'>
          Left Section
        </div>

        <div className='w-[900px]'>
          {/* Create Post section */}
          <div>
            <Post></Post>
          </div>
          {/* User Posts */}
          <div>
            <UserPost></UserPost>
          </div>
        </div>

        <div className='border h-[80vh] fixed right-20 w-[18%]'>
          Right Section
        </div>
      </div>
    </div>
  );
};

export default page;
