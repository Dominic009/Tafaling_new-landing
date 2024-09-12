"use client";
import ActionBtn from "@/components/Buttons/User Profile buttons/ActionBtn";
import SingleUploader from "@/components/Input File/Single File Uploader/SingleUploader";
import Modal from "@/components/Modal/Modal";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import UserPost from "@/components/UserPost";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { MdEditSquare, MdOutlineEdit, MdSettings } from "react-icons/md";

const Page = () => {
  const { user } = useAuth();
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="w-full lg:w-[80%] mx-auto">
      <div className="relative">
        {/* Timeline IMG */}
        <div className="relative h-[240px] md:h-[300px] lg:h-[450px]">
          <Image
            src='/Profile banner/banner.jpg'
            alt='Banner Image'
            layout='fill'
            objectFit='cover'
            className=' rounded-b-lg '
          />
        </div>
        <Modal isOpen={modal} onClose={closeModal} width={'40%'}>
          <div className="py-7 px-2 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl text-gray-500 font-semibold text-center underline mb-4">
              Select Picture from device
            </h1>
            <SingleUploader></SingleUploader>
          </div>
        </Modal>

        {/* User DP */}
        <div className="flex flex-col lg:flex-row gap-5 top-80 w-[90%] mx-auto -mt-16">
          <div className="w-48 md:w-[250px] lg:w-[300px] h-48 md:h-[250px] lg:h-[300px] bg-gray-600 bottom-0 rounded-lg drop-shadow-md z-30"></div>
          <div className="grid">
            <div></div>
            <div className="flex flex-col justify-between lg:pt-10">
              <div>
                {/* user name */}
                <h1 className='text-[#00274A] font-semibold text-3xl'>
                  {user?.name}
                </h1>
                {/* user email */}
                <p className='text-[#00274A]/50 text-md -mt-2'>{user?.email}</p>
              </div>
              {/* user bio */}
              <p className='text-[#0E2943]/90 text-lg py-1 pr-16 flex items-center gap-2'>
                To be a dreamer, you just need spread your wings and keep on
                dreaming until you turn your dream in reality.
                <MdEditSquare className='text-2xl text-[#00B4DB] hover:text-[#287f92] cursor-pointer custom-hover' />
              </p>

              <div className='flex items-center gap-4'>
                <h5 className='text-[#00274A]'>
                  <span className='text-xl font-semibold'>1.5k</span> Followers
                </h5>
                <span className='w-2 h-2 rounded-full bg-[#00274A]'></span>
                <h5 className='text-[#00274A]'>
                  <span className='text-xl font-semibold'>1k</span> Following
                </h5>
              </div>

              <div className='flex items-center gap-5 w-[50%]'>
                <ActionBtn text='Edit Info' icon={MdOutlineEdit} />
                <ActionBtn text='Settings' icon={MdSettings} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Content section */}
      <section className="mt-9 flex gap-5 w-[90%] mx-auto">
        <div className="h-[80vh] w-[20%] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl text-center">
          Left Section
        </div>
        <div>
          <UserPost></UserPost>
        </div>
      </section>
    </div>
  );
};

export default PrivateRoute(Page);
