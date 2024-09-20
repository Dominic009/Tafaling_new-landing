'use client';
import { getAuthUser } from '@/api/auth/auth';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

const PrivateRoute = <T extends {}>(Component: ComponentType<T>) => {
  return function PrivateRoute(props: T) {
    const router = useRouter();
    const { user, login } = useAuth();
    const { item } = useLocalStorage('auth-token');

    const isAuthenticated = user ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        let lsItem = item && JSON.parse(item).accessT;
        const fetchUserData = async () => {
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
            return;
          } catch (error) {
            console.log(error);

            router.push('login');
          }
        };

        fetchUserData();
      }
    }, [isAuthenticated, router, item, login]);

    if (!isAuthenticated) {
      return (
        <div className='h-[90vh] flex justify-center items-center'>
          <h1 className='text-2xl'>Loading... ⏳</h1>
        </div>
      );
    } else {
      return <Component {...props} />;
    }
  };
};

export default PrivateRoute;
