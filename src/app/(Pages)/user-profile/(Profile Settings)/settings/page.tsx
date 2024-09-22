'use client';

// import { useRouter, usePathname } from 'next/navigation';
// import { useEffect } from 'react';

// const SettingsPage = () => {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     // If the current route is exactly /user-profile/settings, redirect to /general
//     if (pathname === '/user-profile/settings') {
//       router.replace('/user-profile/settings/general');
//     }
//   }, [pathname, router]);

//   return null; // No need to return anything as it's just a redirect
// };

// export default SettingsPage;

import ChangePassword from '@/components/ChangePassword';
import Heading from '@/components/Headings/Settings Headings/Heading';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* Change password */}
      <div className='border-b py-2'>
        <Heading heading='Change Password'/>
        <ChangePassword />
      </div>
    </div>
  );
};

export default PrivateRoute(page);
