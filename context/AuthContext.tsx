import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
} | null;

type AuthState = {
  user: User;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

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

    default:
      return state;
  }
};

const AuthContext = createContext<
  | {
      state: AuthState;
      login: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
      clearError: () => void;
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
      } catch (error) {
        console.log("خطا در بارگذاری کاربر:", error);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fakeUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: email,
      };

      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      dispatch({ type: "LOGIN_SUCCESS", payload: fakeUser });
    } catch (error) {
      console.log("Login error:", error); // ✅ استفاده از متغیر error
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "خطا در ورود. دوباره تلاش کن.",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, clearError }}>
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
