'use client';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return (
    <div>
      <h1>News feed</h1>
    </div>
  );
};

export default PrivateRoute(page);
