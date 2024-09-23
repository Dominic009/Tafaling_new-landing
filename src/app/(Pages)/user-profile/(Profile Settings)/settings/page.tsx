'use client';

import ChangePassword from '@/components/ChangePassword';
import Heading from '@/components/Headings/Settings Headings/Heading';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';
import 'animate.css'

const page = () => {
  return (
    <div>
      {/* Change password */}
      <div className='border-b py-2 animate__animated animate__fadeIn animate__faster'>
        <Heading heading='Change Password'/>
        <ChangePassword />
      </div>
    </div>
  );
};

export default PrivateRoute(page);
