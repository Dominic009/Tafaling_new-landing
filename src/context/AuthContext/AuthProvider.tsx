'use client';
import useLocalStorage from '@/hooks/useLocalStorage';
import { AuthUser } from '@/types/Auth';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useContext } from 'react';

interface IAuthContext {
  user: AuthUser | null;
  login: (authData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const { removeItem } = useLocalStorage('auth-token');

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
    <AuthContext.Provider value={{ user, login, logout }}>
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
