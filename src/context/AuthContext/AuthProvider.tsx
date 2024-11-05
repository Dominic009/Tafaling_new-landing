'use client';
import { getAuthUser, getUserPrivacy } from '@/api/auth/auth';
import { getAccessToken } from '@/helpers/tokenStorage';
import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthUser, PrivacySetting } from '@/types/Auth';
import { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useContext, useEffect, useRef } from 'react';

interface IAuthContext {
  user: AuthUser | null;
  login: (authData: AuthUser) => void;
  logout: () => void;
  isAuthLoading: boolean;
  userPrivacy: PrivacySetting[];
  setAllUserPrivacy: (privacyData: PrivacySetting[]) => void;
}

export interface AuthJwtPayload extends JwtPayload {
  user: AuthUser;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [userPrivacy, setUserPrivacy] = React.useState<PrivacySetting[] | []>(
    []
  );
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);
  const { item, removeItem } = useLocalStorage('auth-token');
  const didFetchUser = useRef(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, status } = await getUserPrivacy();

        setAllUserPrivacy(data.data);
      } catch (error) {}
    }

    userPrivacy.length === 0 && fetchData();
  }, [userPrivacy]);

  useEffect(() => {
    const refetchUserData = async () => {
      const { data } = await getAuthUser(getAccessToken());
      const { data: userData } = data;

      // console.log(userData);
      login({
        user_name: userData.user_name,
        email: userData.email,
        cover_photo: userData.cover_photo,
        profile_picture: userData.profile_picture,
        name: userData.name,
        email_verified_at: userData.email_verified_at ? true : false,
        userId: userData.user_id,
      });
      setIsAuthLoading(false);
    };

    if (!item) {
      setIsAuthLoading(false);
    }

    if (item && !didFetchUser.current) {
      didFetchUser.current = true; // Prevent duplicate calls
      refetchUserData();
      console.log('user refetched');
    }
  }, [item]);

  const login = (authData: AuthUser) => {
    setUser(authData);
  };

  const setAllUserPrivacy = (privacyData: PrivacySetting[]) => {
    setUserPrivacy(privacyData);
  };

  const logout = () => {
    setUser(null);
    removeItem();
    // router.push('login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthLoading,
        userPrivacy,
        setAllUserPrivacy,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
