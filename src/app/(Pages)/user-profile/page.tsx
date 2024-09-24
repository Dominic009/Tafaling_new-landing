'use client';
import ActionBtn from '@/components/Buttons/User Profile buttons/ActionBtn';
import SingleUploader from '@/components/Input File/Single File Uploader/SingleUploader';
import Modal from '@/components/Modal/Modal';
import UserPost from '@/components/UserPost';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { MdEditSquare, MdOutlineEdit, MdSettings } from 'react-icons/md';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { updateCoverPhoto, updateProfilePicture } from '@/api/user/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import toast from 'react-hot-toast';
import { getAuthUser } from '@/api/auth/auth';
import { AxiosError } from 'axios';
import ContentLoader from '@/components/Loader/ContentLoader';

const Page = () => {
  const { user, login } = useAuth();
  const [modalProfilePicture, setModalProfilePicture] =
    useState<boolean>(false);
  const [modalCoverPhoto, setModalCoverPhoto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { item: accessToken } = useLocalStorage('auth-token');

  const closeModalProfilePicture = () => {
    setModalProfilePicture(false);
  };

  const closeModalCoverPhoto = () => {
    setModalCoverPhoto(false);
  };

  console.log(user);

  const fetchUserData = async () => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    try {
      const { data, status } = await getAuthUser(lsItem);
      const { data: userData } = data;
      // console.log(userData);

      login({
        user_name: userData.user_name,
        email: userData.email,
        cover_photo: userData.cover_photo,
        profile_picture: userData.profile_picture,
        name: userData.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //upload picture handler
  const handleUploadProfilePicture = async (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    const formData = new FormData();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      formData.append('profilePhoto', fileInputRef.current.files[0]);
    }

    try {
      const { data, status } = await updateProfilePicture(formData, lsItem);
      //console.log(data);

      if (status === 201) {
        closeModalProfilePicture();
        toast.success(data.message);
        fetchUserData();
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      //console.log(error);

      error.response?.data.message && toast.error(error.response?.data.message);
    }
  };

  //upload picture handler
  const handleUploadCoverPhoto = async (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    const formData = new FormData();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      formData.append('coverPhoto', fileInputRef.current.files[0]);
    }

    try {
      const { data, status } = await updateCoverPhoto(formData, lsItem);
      //console.log(data);

      if (status === 201) {
        closeModalCoverPhoto();
        toast.success(data.message);
        fetchUserData();
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      //console.log(error);

      error.response?.data.message && toast.error(error.response?.data.message);
    }
  };

  return (
    <div className='w-full lg:w-[80%] mx-auto'>
      <div className='relative border-b pb-7'>
        {/* Timeline IMG */}
        <div className='relative h-[240px] md:h-[300px] lg:h-[450px] group transition ease-in-out duration-500'>
          {/* overlay div */}
          <div className='w-full h-full bg-black z-20 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-b-lg'></div>
          {/* Change timeline image button */}
          <div className='absolute bottom-6 right-6 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
            <button
              onClick={() => setModalCoverPhoto(!modalCoverPhoto)}
              className='bg-gray-200 text-center rounded py-1 px-2 font-semibold hover:bg-white hover:text-[#00B4DB]'
            >
              Change Picture
            </button>
          </div>
          <Image
            src={user?.cover_photo || '/Profile banner/banner.png'}
            alt='Banner Image'
            layout='fill'
            objectFit='cover'
            className=' rounded-b-lg'
            onLoadingComplete={() => setIsLoading(false)}
            />
            { isLoading && <ContentLoader/> }
        </div>
        {/* modal for profile picture upload */}
        <Modal
          isOpen={modalProfilePicture}
          onClose={closeModalProfilePicture}
          width={'30%'}
        >
          <div className='py-7 px-2 rounded-lg flex flex-col justify-center items-center'>
            <h1 className='text-xl text-gray-500 font-semibold text-center underline mb-4'>
              Select Profile Picture from device
            </h1>
            <SingleUploader
              handleUploadPicture={handleUploadProfilePicture}
            ></SingleUploader>
          </div>
        </Modal>

        {/* modal for cover photo upload */}
        <Modal
          isOpen={modalCoverPhoto}
          onClose={closeModalCoverPhoto}
          width={'30%'}
        >
          <div className='py-7 px-2 rounded-lg flex flex-col justify-center items-center'>
            <h1 className='text-xl text-gray-500 font-semibold text-center underline mb-4'>
              Select Cover Photo from device
            </h1>
            <SingleUploader
              handleUploadPicture={handleUploadCoverPhoto}
            ></SingleUploader>
          </div>
        </Modal>

        {/* User DP */}
        <div className='flex flex-col lg:flex-row gap-5 w-[90%] mx-auto -mt-16'>
          {/* overlay div */}
          <div className='w-48 md:w-[250px] lg:w-[300px] h-48 md:h-[250px] lg:h-[300px] group relative'>
            <div className='w-full h-full bg-black z-40 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-lg overflow-hidden'></div>
            {/* Change timeline image button */}
            <div className='absolute bottom-6 right-6 z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
              <button
                onClick={() => setModalProfilePicture(!modalProfilePicture)}
                className='bg-gray-200 text-center rounded py-1 px-2 font-semibold hover:bg-white hover:text-[#00B4DB]'
              >
                Change Picture
              </button>
            </div>
            <Image
              src={user?.profile_picture || '/ProfileDP/Dummy.png'}
              width={400}
              height={400}
              alt='User DP'
              objectFit='fill'
              className='bottom-0 rounded-lg drop-shadow-md z-30 group'
              onLoadingComplete={() => setIsLoading(false)}
            ></Image>
          </div>
          <div className='grid'>
            <div></div>
            <div className='flex flex-col justify-between lg:pt-10'>
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
                <ActionBtn
                  text='Edit Info'
                  icon={MdOutlineEdit}
                  add={'/user-profile/settings/edit-info'}
                />
                <ActionBtn
                  text='Settings'
                  icon={MdSettings}
                  add={'/user-profile/settings'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Content section */}
      <section className='mt-9 flex gap-5 w-[90%] mx-auto'>
        <div className='h-[80vh] w-[20%] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl text-center'>
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
