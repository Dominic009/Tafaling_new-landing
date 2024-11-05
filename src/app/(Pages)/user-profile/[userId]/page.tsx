'use client';
import ActionBtn from '@/components/Buttons/User Profile buttons/ActionBtn';
import SingleUploader from '@/components/Input File/Single File Uploader/SingleUploader';
import Modal from '@/components/Modal/Modal';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/legacy/image';
import React, { useState, useEffect } from 'react';
import { MdEditSquare, MdOutlineEdit, MdSettings } from 'react-icons/md';
import { IoPersonAdd } from 'react-icons/io5';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { updateCoverPhoto, updateProfilePicture } from '@/api/user/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import toast from 'react-hot-toast';
import { getAuthUser } from '@/api/auth/auth';
import { AxiosError, AxiosProgressEvent, AxiosResponse } from 'axios';
import ContentLoader from '@/components/Loader/ContentLoader';
import axiosClient from '@/api/config';
import { getAccessToken } from '@/helpers/tokenStorage';
import ProfileSkeleton from '@/components/Loader/Skeleton/ProfileSkeleton';
import ComingSoon from '@/components/ComingSoon';
import UserPost from '@/components/Post/UserPost/UserPost';
import ActionButton from '@/components/Buttons/ActionButton';
import LoggedInUserProfile from '@/components/UserProfile/LoggedInUserProfile';

interface UserProfileProps {
  params: any;
}

const Page: React.FC<UserProfileProps> = ({ params }) => {
  const { user, login } = useAuth();
  // converting params.userId in number
  const paramId = Number(params?.userId);
  // const paramId = Number('100');
  console.log(user);
  if (user?.userId === paramId) {
    return <LoggedInUserProfile />;
  } else {
    return <h1>other user profile</h1>;
  }
};

export default PrivateRoute(Page);
