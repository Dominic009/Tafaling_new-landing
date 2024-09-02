"use client";
import { AuthUser } from "@/types/Auth";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext } from "react";

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

  const login = (authData: AuthUser) => {
    setUser(authData);
  };

  const logout = () => {
    setUser(null);
    router.push("login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
