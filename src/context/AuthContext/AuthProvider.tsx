'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthUser } from '@/types/Auth';
import dayjs from 'dayjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useContext, useEffect } from 'react';

interface IAuthContext {
  user: AuthUser | null;
  login: (authData: AuthUser) => void;
  logout: () => void;
  isAuthLoading: boolean;
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
  const [isAuthLoading, setIsAuthLoading] = React.useState<boolean>(true);
  const { item, removeItem } = useLocalStorage('auth-token');

  useEffect(() => {
    if (item) {
      const accessToken = JSON.parse(item).accessT;
      const decodedToken = jwtDecode<AuthJwtPayload>(accessToken);
      const isExpired =
        dayjs.unix(decodedToken.exp as number).diff(dayjs()) < 1;
      console.log(
        `${isExpired === true ? 'token is expired' : 'token is valid'}`
      );

      if (isExpired) {
        setUser(null);
        localStorage.removeItem('auth-token');
        router.push('login');
      } else {
        const userData = decodedToken.user && decodedToken.user;
        // console.log(userData);

        login({
          user_name: userData.user_name,
          email: userData.email,
          cover_photo: userData.cover_photo,
          profile_picture: userData.profile_picture,
          name: userData.name,
          email_verified_at: userData.email_verified_at ? true : false,
        });
      }
    }

    setIsAuthLoading(false);
  }, [item, router]);

  const login = (authData: AuthUser) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(null);
    removeItem();
    router.push('login');
  };
  //console.log(user)
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
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
