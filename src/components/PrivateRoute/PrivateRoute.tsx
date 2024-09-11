import { useAuth } from '@/context/AuthContext/AuthProvider';
import { redirect, useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

const PrivateRoute = <T extends {}>(Component: ComponentType<T>) => {
  return function PrivateRoute(props: T) {
    const router = useRouter();
    const { user } = useAuth();

    const isAuthenticated = user ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        //alert(`Welcome ${user?.name}`);
        return redirect('login');
      }
    }, [isAuthenticated, router]);

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
