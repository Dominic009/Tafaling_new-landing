/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ISearchUser } from '../Navbar';
import Image from 'next/legacy/image';
import ActionBtn from '@/components/Buttons/User Profile buttons/ActionBtn';
import { BsPersonFillAdd } from 'react-icons/bs';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { followUser, unfollowUser } from '@/api/user/user';
import { getAccessToken } from '@/helpers/tokenStorage';
import ActionButton from '@/components/Buttons/ActionButton';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';

interface IIndividualSearchUser {
  user: ISearchUser;
  forNavBar?: boolean;
}

const IndividualSearchUser: React.FC<IIndividualSearchUser> = ({
  user,
  forNavBar,
}) => {
  const router = useRouter();
  const { user: loggedInuser } = useAuth();
  const [searchedUser, setSearchedUser] = useState<ISearchUser>(user);
  const pathname = usePathname();

  // follow user handler
  const followUserHandler = async () => {
    try {
      const res = await followUser(searchedUser.userId, getAccessToken());

      if (res.status === 201) {
        console.log(res);
        setSearchedUser(prevState => {
          return { ...prevState, isFollowing: true };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // follow user handler
  const unfollowUserHandler = async () => {
    try {
      const res = await unfollowUser(searchedUser.userId, getAccessToken());

      if (res.status === 201) {
        console.log(res);
        setSearchedUser(prevState => {
          return { ...prevState, isFollowing: false };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for navabar
  if (forNavBar) {
    return (
      <div className='z-50 flex'>
        <div className='grid lg:grid-cols-6 gap-1 items-center justify-center mb-2 px-3 bg-gray-50 rounded-lg drop-shadow w-[98%] mx-auto scale-90'>
          <div className='w-16 h-16 rounded-full flex items-center justify-center'>
            {/* <Link href={`user-profile/${searchedUser.userId}`}> */}
            <Image
              onClick={() => {
                router.push(`/user-profile/${searchedUser.userId}`);
              }}
              alt='User DP'
              src={searchedUser?.profilePicture || '/ProfileDP/Dummy.png'}
              width={50}
              height={50}
              objectFit='cover'
              className='rounded-full'
            ></Image>
            {/* </Link> */}
          </div>
          <div className='col-span-3 text-left'>
            <h1 className='font-semibold text-lg leading-5'>
              {searchedUser?.name}
            </h1>
            <small className='text-gray-400 font-semibold'>
              {searchedUser?.followers} followers
            </small>
          </div>
          <div className='col-span-2 flex justify-end'>
            <div>
              {searchedUser?.userId !== loggedInuser?.userId &&
                !searchedUser.isFollowing && (
                  <ActionButton
                    onClickFn={followUserHandler}
                    text='Follow'
                    icon={BsPersonFillAdd}
                    outline={true}
                  />
                )}

              {loggedInuser?.userId !== searchedUser.userId &&
                searchedUser.isFollowing && (
                  <ActionButton
                    onClickFn={unfollowUserHandler}
                    text='Unfollow'
                    outline={true}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // for search page and other pages
  return (
    <div className='z-50 flex'>
      <div className='grid grid-cols-6 lg:grid-cols-6 lg:gap-1 items-center justify-center mb-2 px-3 bg-gray-50 rounded-lg drop-shadow w-full lg:min-w-[70%] lg:max-w-[70%] mx-auto'>
        <div className='w-14 md:w-16 lg:w-24 h-14 md:h-16 lg:h-24 flex items-center justify-center '>
          <Image
            alt='User DP'
            src={searchedUser?.profilePicture || '/ProfileDP/Dummy.png'}
            width={80}
            height={80}
            objectFit='cover'
            className='rounded-full border border-orange-400'
          ></Image>
        </div>
        <div className='col-span-4 lg:col-span-3 text-left'>
          <h1 className='font-semibold text-sm md:text-lg lg:text-xl'>
            {searchedUser?.name}
          </h1>
          <div className='flex flex-col text-gray-400'>
            <small>{searchedUser?.email}</small>
            <small className='mt-3 font-semibold'>
              {searchedUser?.followers} followers
            </small>
          </div>
        </div>
        <div className='lg:col-span-2 flex justify-end'>
          <div>
            {searchedUser?.userId !== loggedInuser?.userId &&
              !searchedUser.isFollowing && (
                <ActionButton
                  onClickFn={followUserHandler}
                  text='Follow'
                  icon={BsPersonFillAdd}
                  outline={true}
                />
              )}

            {loggedInuser?.userId !== searchedUser.userId &&
              searchedUser.isFollowing && (
                <ActionButton
                  onClickFn={unfollowUserHandler}
                  text='Unfollow'
                  outline={true}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSearchUser;
