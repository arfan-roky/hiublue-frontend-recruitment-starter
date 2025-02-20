"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

// Define types for better type safety
interface User {
  id: string;
  name: string;
  email: string;
}

interface Auth {
  token: string;
  user: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  auth: Auth;
}

// Define initial state
const initialState: AuthContextType = {
  isAuthenticated: false,
  auth: {
    token: "",
    user: {
      id: "",
      name: "",
      email: "",
    },
  },
};

// Create the context
const AuthContext = createContext<AuthContextType>(initialState);

// Props type for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider component
 * Manages authentication state and provides it to child components
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthContextType>(initialState);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        try {
          const parsedAuth: Auth = JSON.parse(storedAuth);
          setAuthState({
            isAuthenticated: true,
            auth: parsedAuth,
          });
        } catch (error) {
          console.error("Failed to parse stored auth:", error);
          // Clear invalid stored auth
          localStorage.removeItem("auth");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (!loading && !authState.isAuthenticated) {
      router.push("/login");
    }
  }, [loading, authState.isAuthenticated, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
