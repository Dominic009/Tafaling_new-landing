'use client';
import ComingSoon from '@/components/ComingSoon';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return (
    <div className='h-[80vh]'>
      <ComingSoon />
    </div>
  );
};

export default PrivateRoute(page);
