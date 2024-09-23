'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';
import 'animate.css';

const page = () => {
  return (
    <div className='text-center animate__animated animate__fadeIn animate__faster'>
      This is Edit your Information page
    </div>
  );
};

export default PrivateRoute(page);
