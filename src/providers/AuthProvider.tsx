'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setToken: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('access_token')
      setTokenState(stored)
    }
  }, [])

  useEffect(() => {
    const publicRoutes = ['/login']
    if (!token && !publicRoutes.includes(pathname)) {
      const stored = localStorage.getItem('access_token')
      if (!stored) {
        router.push('/login')
      }
    }
  }, [token, pathname, router])

  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken) {
      localStorage.setItem('access_token', newToken)
    } else {
      localStorage.removeItem('access_token')
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
