import { useAuthContext } from '@/context/AuthContext'

export const useAuth = () => {
  const { state, login, logout, clearError } = useAuthContext()
  
  return {
    user: state.user,
    isLoggedIn: !!state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  }
}