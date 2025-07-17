"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  getUserCookie,
  setUserCookie,
  removeUserCookie,
} from "@/utils/cookie-utils";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 쿠키에서 사용자 정보 확인
    try {
      const userData = getUserCookie();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to initialize auth from cookie:", error);
      // 에러 발생 시 쿠키 정리
      removeUserCookie();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setUserCookie(userData);
  };

  const logout = () => {
    setUser(null);
    removeUserCookie();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
