// hooks/useAuth.ts
import { useAuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const { state, login, logout, clearError, isAuthenticated } = useAuthContext()
  
  return {
    user: state.user,
    isLoggedIn: isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  }
}