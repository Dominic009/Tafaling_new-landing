'use client';
import { getAuthUser } from '@/api/auth/auth';
import Loader from '@/app/loading';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

const PrivateRoute = <T extends {}>(Component: ComponentType<T>) => {
  return function PrivateRoute(props: T) {
    const router = useRouter();
    const { user, isAuthLoading, login } = useAuth();
    const { item } = useLocalStorage('auth-token');

    const isAuthenticated = user ? true : false;

    // useEffect(() => {
    //   if (!isAuthenticated) {
    //     let lsItem = item && JSON.parse(item).accessT;
    //     const fetchUserData = async () => {
    //       try {
    //         const { data, status } = await getAuthUser(lsItem);
    //         const { data: userData } = data;
    //         // console.log(userData);

    //         login({
    //           user_name: userData.user_name,
    //           email: userData.email,
    //           cover_photo: userData.cover_photo,
    //           profile_picture: userData.profile_picture,
    //           name: userData.name,
    //         });
    //         return;
    //       } catch (error) {
    //         console.log(error);

    //         router.push('login');
    //       }
    //     };

    //     fetchUserData();
    //   }
    // }, [isAuthenticated, router, item, login]);

    if (isAuthLoading) {
      return (
        <div className='h-[90vh] flex justify-center items-center'>
          <Loader></Loader>
        </div>
      );
    }

    if (user?.user_name && !user.email_verified_at) {
      // console.log(
      //   'redirected to email verify page in private route: ',
      //   user.email_verified_at
      // );
      return router.push('/verifyEmail');
    }

    if (user?.user_name) {
      return <Component {...props} />;
    } else {
      router.push('/login');
    }
  };
};

export default PrivateRoute;
