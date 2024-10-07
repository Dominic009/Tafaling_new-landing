/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import MainPost from '@/components/Post/MainPost';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React, { useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa6';
import { TiHome } from 'react-icons/ti';
import NextNProgress from 'nextjs-progressbar';
import ComingSoon from '@/components/ComingSoon';
import UserPost from '@/components/Post/UserPost/UserPost';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import PublicPost from '@/components/Post/PublicPost/PublicPost';

export interface IRefetchUserPostProp {
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUserPost?: boolean;
}

const page = () => {
  const [refetchUserPost, setRefetchUserPost] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <div className='grid lg:grid-cols-4 gap-8 w-full md:w-[90%] lg:w-[90%] mx-auto px-2 md:px-5 text-center'>
      <aside className='h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl '>
        <ComingSoon />
      </aside>
      <NextNProgress options={{ easing: 'ease', speed: 500 }} />

      <main className='lg:col-span-2 py-6 relative'>
        {/* Create Post section */}
        {user?.user_name && (
          <MainPost setRefetchUserPost={setRefetchUserPost}></MainPost>
        )}

        {/* User Posts */}
        {user?.user_name ? (
          <UserPost
            refetchUserPost={refetchUserPost}
            setRefetchUserPost={setRefetchUserPost}
          ></UserPost>
        ) : (
          <PublicPost />
        )}

        {/* Virtual navigation for mobile devices */}
      </main>

      <aside className='h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl '>
        <ComingSoon />
      </aside>
    </div>
  );
};

export default page;
