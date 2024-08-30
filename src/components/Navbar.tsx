'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { TiHome } from 'react-icons/ti';
import { FaRegNewspaper } from 'react-icons/fa6';
import { BsFillPeopleFill } from 'react-icons/bs';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaRegBell } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <nav className='h-[70px] bg-gradient-to-r from-[#004A99] to-[#003773] flex items-center justify-between px-5'>
      {/* Left Side */}
      <div className=''>
        <Link href={'/home'}>
          <Image
            src={'/Tafaling logo.png'}
            width={130}
            height={130}
            alt='Brand logo'
          ></Image>
        </Link>
      </div>

      {/* Middle Side */}
      <div className='flex gap-9 items-center justify-center fixed left-1/2 transform -translate-x-1/2'>
        <TiHome
          title='Home'
          className='text-3xl text-white border-b-2 border-[#42C6DE] rounded-sm cursor-pointer transition-all duration-200 ease-in-out'
        />
        <FaRegNewspaper
          title='News Feed'
          className='text-2xl text-white/50 hover:text-white hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out'
        />
        <BsFillPeopleFill
          title='Requests'
          className='text-2xl text-white/50 hover:text-white hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out'
        />
      </div>

      {/* Right Side */}
      <div className='flex items-center justify-between w-[20%]'>
        {/* Search field */}
        <div className='relative w-[60%]'>
          <input
            type='text'
            className='outline-none px-4 py-1 rounded-lg bg-[#00274A] text-white w-full'
            placeholder='Search'
          />
          <HiOutlineSearch className='absolute top-[6px] right-2 text-gray-400 text-xl' />
        </div>

        <div className='grid grid-cols-2 items-center gap-2'>
          {/* Notification icon */}
          <div className='relative h-full flex items-center justify-center'>
            <FaRegBell className='text-2xl text-white hover:text-white hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out' />
            <div className='absolute top-1 right-1 bg-[#D6042A] text-center rounded-full w-5 h-5 text-white text-sm'>
              5
            </div>
          </div>

          {/* User Profile */}
          <div
            className='relative transition ease-in-out duration-500'
            onClick={() => setDropdown(!dropdown)}
          >
            <Image
              src={'/ProfileDP/Profile.png'}
              width={50}
              height={50}
              alt='User'
              className='rounded-full cursor-pointer'
            ></Image>

            {dropdown ? (
              <div className='absolute right-4 bg-[#0d1f31] w-48 rounded-lg p-4 flex flex-col justify-between'>
                <ul className='font-semibold flex flex-col gap-2 text-gray-300'>
                  <li className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'>
                    Profile
                  </li>
                  <li className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'>
                    Privacy
                  </li>
                  <li className='hover:bg-[#223a52] p-1 rounded-md cursor-pointer transition-colors ease-linear'>
                    Settings
                  </li>
                </ul>
                <Link href={'/login'}>
                  <button className='bg-[#D6042A] text-white px-6 py-1 rounded-md hover:bg-[#b91a37]  transition ease-in-out duration-200 mt-12 w-full'>
                    LogOut
                  </button>
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
