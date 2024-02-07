"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cookies } from 'react-cookie';

interface User {
  // name: string;
  email: string;
  isSignedIn: boolean;
  signInExpiresAt: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signIn: (data: { email: string; password: string }) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const cookies = new Cookies();
  const [user, setUser] = useState<User | null>(cookies.get("user") || null);

  const signIn = (data: { email: string; password: string }) => {
    setUser({ ...data, isSignedIn: true, signInExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 });
    cookies.set("user", { ...data, isSignedIn: true, signInExpiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7 }, { path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
  }

  const signOut = () => {
    setUser(null);
    cookies.remove("user", { path: "/" });
  }

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}