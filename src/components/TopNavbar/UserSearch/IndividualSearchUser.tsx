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

interface IIndividualSearchUser {
  user: ISearchUser;
  forNavBar?: boolean;
}

const IndividualSearchUser: React.FC<IIndividualSearchUser> = ({
  user,
  forNavBar,
}) => {
  const { user: loggedInuser } = useAuth();
  const [searchedUser, setSearchedUser] = useState<ISearchUser>(user);

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
            <Image
              alt='User DP'
              src={searchedUser?.profilePicture || '/ProfileDP/Dummy.png'}
              width={50}
              height={50}
              objectFit='cover'
              className='rounded-full'
            ></Image>
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
            <div className='w-[70%]  '>
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
                    icon={BsPersonFillAdd}
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
      <div className='grid lg:grid-cols-6 gap-1 items-center justify-center mb-2 px-3 bg-gray-50 rounded-lg drop-shadow w-[98%] mx-auto scale-90'>
        <div className='w-16 h-16 rounded-full flex items-center justify-center'>
          <Image
            alt='User DP'
            src={searchedUser?.profilePicture || '/ProfileDP/Dummy.png'}
            width={50}
            height={50}
            objectFit='cover'
            className='rounded-full'
          ></Image>
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
          <div className='w-[70%]  '>
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
                  icon={BsPersonFillAdd}
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
