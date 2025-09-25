
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('eventhive-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('eventhive-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eventhive-user');
    }
  }, [user]);

  const login = (email: string): boolean => {
    const foundUser = USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string, role: UserRole): boolean => {
    const existingUser = USERS.find(u => u.email === email);
    if (existingUser) {
      return false; // User already exists
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
    };
    USERS.push(newUser); // In a real app, this would be an API call
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
