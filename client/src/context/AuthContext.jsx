import { useEffect, useMemo, useState } from 'react'
import { authApi, clearStoredAuth, getStoredAuth, setStoredAuth } from '../lib/api'
import { AuthContext } from './authContextValue'

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getStoredAuth())
  const [isCheckingAuth, setIsCheckingAuth] = useState(Boolean(getStoredAuth()?.token))

  useEffect(() => {
    let ignore = false

    const verifySession = async () => {
      const storedAuth = getStoredAuth()

      if (!storedAuth?.token) {
        setIsCheckingAuth(false)
        return
      }

      try {
        const user = await authApi.me()
        if (!ignore) {
          const nextAuth = { ...storedAuth, user }
          setAuth(nextAuth)
          setStoredAuth(nextAuth)
        }
      } catch {
        if (!ignore) {
          clearStoredAuth()
          setAuth(null)
        }
      } finally {
        if (!ignore) setIsCheckingAuth(false)
      }
    }

    verifySession()

    return () => {
      ignore = true
    }
  }, [])

  const login = async (credentials) => {
    const nextAuth = await authApi.login(credentials)
    setAuth(nextAuth)
    setStoredAuth(nextAuth)
    return nextAuth
  }

  const register = async (credentials) => {
    const nextAuth = await authApi.register(credentials)
    setAuth(nextAuth)
    setStoredAuth(nextAuth)
    return nextAuth
  }

  const logout = () => {
    clearStoredAuth()
    setAuth(null)
  }

  const value = useMemo(
    () => ({
      user: auth?.user || null,
      token: auth?.token || '',
      isAuthenticated: Boolean(auth?.token),
      isCheckingAuth,
      login,
      register,
      logout,
    }),
    [auth, isCheckingAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
