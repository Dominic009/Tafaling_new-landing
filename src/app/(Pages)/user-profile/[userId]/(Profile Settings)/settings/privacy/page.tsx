'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';
import 'animate.css';
import ComingSoon from '@/components/ComingSoon';

const page = () => {
  return (
    <div className='text-center animate__animated animate__fadeIn animate__faster h-full'>
      <ComingSoon/>
    </div>
  );
};

export default PrivateRoute(page);
