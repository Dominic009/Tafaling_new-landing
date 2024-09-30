/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import MainPost from '@/components/Post/MainPost';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import UserPost from '@/components/UserPost';
import React, { useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa6';
import { TiHome } from 'react-icons/ti';
import NextNProgress from 'nextjs-progressbar';
import ComingSoon from '@/components/ComingSoon';

export interface IRefetchUserPostProp {
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUserPost?: boolean;
}

const page = () => {
  //const router = useRouter();
  //const { user} = useAuth();
  const [refetchUserPost, setRefetchUserPost] = useState<boolean>(false);

  return (
    <div>
      {/* Page Layout */}
      <div className="grid lg:grid-cols-4 gap-8 w-full md:w-[90%] lg:w-[90%] mx-auto px-2 md:px-5 text-center">
        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          <ComingSoon/>
        </div>
        <NextNProgress options={{ easing: "ease", speed: 500 }} />
        <div className="lg:col-span-2 py-6 relative">
          {/* Create Post section */}
          <div>
            <MainPost setRefetchUserPost={setRefetchUserPost}></MainPost>
          </div>
          {/* User Posts */}
          <div>
            <UserPost
              refetchUserPost={refetchUserPost}
              setRefetchUserPost={setRefetchUserPost}
            ></UserPost>
          </div>

          {/* Virtual navigation for mobile devices */}
          
        </div>

        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          <ComingSoon/>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(page);
