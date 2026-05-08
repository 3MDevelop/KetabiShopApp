// context/AuthContext.tsx

import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// تعریف نوع Device
type Device = {
  deviceId: string;
  deviceName: string;
  lastLogin: string;
  [key: string]: any;
};

// تعریف نوع Interest
type Interest = {
  id: number;
  name: string;
  [key: string]: any;
};

// تعریف نوع Book
type Book = {
  id: number;
  title: string;
  addedAt: string;
  [key: string]: any;
};

// تعریف نوع Comment
type Comment = {
  id: number;
  bookId: number;
  comment: string;
  createdAt: string;
  [key: string]: any;
};

// تعریف نوع User
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
  bankShaba: number;
  device_List: Device[];
  interests: Interest[];
  readList: Book[];
  likedList: Book[];
  commentList: Comment[];
  paymentList: string[];
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

  // بارگذاری کاربر از AsyncStorage هنگام شروع برنامه
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("🔄 شروع بارگذاری کاربر از AsyncStorage...");
        const userJson = await AsyncStorage.getItem("@user");
        console.log("📦 داده خام:", userJson);
        
        if (userJson) {
          const user = JSON.parse(userJson);
          console.log("✅ کاربر پیدا شد:", user);
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        } else {
          console.log("❌ هیچ کاربری یافت نشد");
        }
      } catch (error) {
        console.log("❌ خطا در بارگذاری کاربر:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    console.log("🔵 شروع فرآیند login");
    dispatch({ type: "LOGIN_START" });

    try {
      // ذخیره اطلاعات کاربر در AsyncStorage
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      console.log("✅ اطلاعات کاربر در AsyncStorage ذخیره شد");
      
      // ذخیره توکن به صورت جداگانه
      if (userData.token) {
        await AsyncStorage.setItem("@auth_token", userData.token);
        console.log("✅ توکن ذخیره شد");
      }
      if (userData.refresh_token) {
        await AsyncStorage.setItem("@refresh_token", userData.refresh_token);
        console.log("✅ refresh_token ذخیره شد");
      }
      
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      console.log("✅ LOGIN_SUCCESS انجام شد");
    } catch (error) {
      console.log("❌ خطا در Login:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "خطا در ورود. دوباره تلاش کن.",
      });
    }
  };

  const logout = async () => {
    console.log("🔵 شروع فرآیند خروج");
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@auth_token");
    await AsyncStorage.removeItem("@refresh_token");
    dispatch({ type: "LOGOUT" });
    console.log("✅ کاربر خارج شد");
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
        isAuthenticated,
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