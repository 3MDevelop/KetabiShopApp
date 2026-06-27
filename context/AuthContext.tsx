// context/AuthContext.tsx

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Device = {
  deviceId: string;
  deviceName: string;
  lastLogin: string;
  [key: string]: any;
};

type Interest = {
  id: number;
  name: string;
  [key: string]: any;
};

type Book = {
  id: number;
  title: string;
  addedAt: string;
  [key: string]: any;
};

type Comment = {
  id: number;
  bookId: number;
  comment: string;
  createdAt: string;
  [key: string]: any;
};

export type User = {
  ID: number;
  token: string;
  refresh_token: string;
  expire_refresh_token: string;
  expire_token: string;
  key: string;
  phone: string;
  name: string;
  nName: string;
  lName: string;
  avatar: number;
  email: string;
  bankCard: number;
  bankShaba: string;
  device_List: string[];
  interests: number[];
  readList: Book[];
  likedList: Book[];
  commentList: Comment[];
  paymentList: string[];
  basket: string[];
  addresses: string[];
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };

    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, user: action.payload };

    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "UPDATE_USER":
      if (state.user) {
        return { ...state, user: { ...state.user, ...action.payload } };
      }
      return state;

    default:
      return state;
  }
};

const AuthContext = createContext<
  | {
      state: AuthState;
      login: (userData: User) => Promise<void>;
      logout: () => Promise<void>;
      clearError: () => void;
      updateUser: (userData: Partial<User>) => Promise<void>;
      isAuthenticated: boolean;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("@user");

        if (userJson) {
          const user = JSON.parse(userJson);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        }
      } catch {
        // "❌ خطا در بارگذاری کاربر:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    dispatch({ type: "LOGIN_START" });

    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      if (userData.token) {
        await AsyncStorage.setItem("@auth_token", userData.token);
      }
      if (userData.refresh_token) {
        await AsyncStorage.setItem("@refresh_token", userData.refresh_token);
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } catch {
      // ("❌ خطا در Login:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "خطا در ورود. دوباره تلاش کن.",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@auth_token");
    await AsyncStorage.removeItem("@refresh_token");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const updateUser = async (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));

      if (userData.token) {
        await AsyncStorage.setItem("@auth_token", userData.token);
      }
      if (userData.refresh_token) {
        await AsyncStorage.setItem("@refresh_token", userData.refresh_token);
      }

      dispatch({ type: "UPDATE_USER", payload: userData });
    }
  };

  const isAuthenticated = state.user !== null && !!state.user?.token;

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        clearError,
        updateUser,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
