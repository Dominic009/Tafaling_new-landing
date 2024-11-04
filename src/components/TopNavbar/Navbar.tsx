'use client';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { TiHome } from 'react-icons/ti';
import { BsFillPeopleFill } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import 'animate.css';
import { FaUserCircle } from 'react-icons/fa';
import AuthUserNavMenu from './AuthUserNavMenu';
import PrimaryBtn from '../PrimaryBtn';
import { IoMdLogIn } from 'react-icons/io';
import SearchInput from '../Search Input/SearchInput';
import { searchUser } from '@/api/user/user';
import { getAccessToken } from '@/helpers/tokenStorage';
import IndividualSearchUser from './UserSearch/IndividualSearchUser';

export interface ISearchUser {
  userId: number;
  userName: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  profilePicture: string;
  coverPhoto: string;
  gender: string | null;
  registrationDate: string | null;
  countryId: number | null;
  PrivacySettingId: number | null;
  name: string;
  following: number;
  followers: number;
  isFollowing: boolean;
}

const Navbar: React.FC = () => {
  // const [dropdown, setDropdown] = React.useState<boolean>(false);
  const [searchedUsers, setSearchedUsers] = useState<ISearchUser[]>([]);

  //filters for user search
  const [inputValue, setInputValue] = useState('');

  const currentPath = usePathname();
  const { user, isAuthLoading } = useAuth();

  const routes = [
    {
      name: 'Home',
      path: '/home',
      icon: (
        <TiHome
          title='Home'
          className='text-3xl  hover:text-white custom-hover'
        />
      ),
    },
    {
      name: 'Profile',
      path: `/user-profile/${user?.userId}`,
      icon: (
        <FaUserCircle
          title='Profile'
          className='text-2xl mb-1 hover:text-white custom-hover'
        />
      ),
    },
    {
      name: 'Requests',
      path: '/requests',
      icon: (
        <BsFillPeopleFill
          title='Requests'
          className='text-2xl  hover:text-white custom-hover'
        />
      ),
    },
  ];

  if (currentPath === '/login' || currentPath === '/register') {
    return null; // Do not render the Navbar on these paths
  }

  const searchUserHandler = async () => {
    if (inputValue.length < 3) return;
    try {
      const res = await searchUser(inputValue, 0, 5, getAccessToken());
      setSearchedUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='h-[70px] grid grid-cols-2 md:grid-cols-3 gap-5 bg-gradient-to-r from-secondary to-[#012349] items-center px-5 w-full custom-hover'>
      {/* Left Section */}
      <div>
        <Link href={'/home'}>
          <Image
            src={'/Tafaling logo.png'}
            width={130}
            height={55}
            alt='Brand logo'
          ></Image>
        </Link>
      </div>

      {/* Middle Section Navlinks*/}
      <div className='hidden md:block'>
        <div className='flex gap-9 items-center justify-center'>
          {routes.map(path => {
            const isActive = path.path === currentPath;
            return (
              <Link
                href={path.path}
                key={path.name}
                className={`${
                  isActive
                    ? 'text-white border-b-2 border-[#42C6DE]'
                    : 'text-white/50'
                }`}
              >
                <span>{path.icon}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Section */}
      <div className={`relative ${user ? 'flex justify-end' : 'grid-cols-2'}`}>
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 ${
            !user && 'flex'
          } items-center gap-5`}
        >
          {/* Search field */}
          <div className='hidden md:block relative lg:col-span-3'>
            <SearchInput
              setInputValue={setInputValue}
              inputValue={inputValue}
              searchUserHandler={searchUserHandler}
              user={searchedUsers}
              setSearchedUsers={setSearchedUsers}
            />
          </div>

          <div className='absolute top-[70px] left-[160px] flex flex-col'>
            {searchedUsers.length !== 0 && (
              <div className='bg-slate-500'>
                {searchedUsers.map((item, i) => (
                  <IndividualSearchUser key={i} user={item} />
                ))}

                <Link
                  onClick={() => {
                    setSearchedUsers([]);
                    setInputValue('');
                  }}
                  href={`/search-more-users`}
                >
                  See more
                </Link>
              </div>
            )}
          </div>
          <HiOutlineSearch className='text-gray-100 text-3xl md:hidden cursor-pointer' />

          <div>
            {user?.user_name && <AuthUserNavMenu />}
            {!user?.user_name && !isAuthLoading && (
              <Link href={`login`} className='w-full'>
                <PrimaryBtn
                  text='Login'
                  width='100%'
                  disabled={false}
                  icon={IoMdLogIn}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
