'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return <div className='text-center'>There is nothing to show</div>;
};

export default PrivateRoute(page);
