'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return <div className='text-center'>This is Edit your Information page</div>;
};

export default PrivateRoute(page);
