'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SettingsPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If the current route is exactly /user-profile/settings, redirect to /general
    if (pathname === '/user-profile/settings') {
      router.replace('/user-profile/settings/general');
    }
  }, [pathname, router]);

  return null; // No need to return anything as it's just a redirect
};

export default SettingsPage;