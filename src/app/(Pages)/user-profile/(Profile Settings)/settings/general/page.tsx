'use client';
import ChangePassword from '@/components/ChangePassword';
import Heading from '@/components/Headings/Settings Headings/Heading';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* Change password */}
      <div className='border-b py-2'>
        <Heading heading='Change Password' />
        <ChangePassword />
      </div>
    </div>
  );
};

export default PrivateRoute(page);
