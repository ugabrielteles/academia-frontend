'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { authService } from '@/services/auth.service'
import { LoginCredentials } from '@/types/auth.types'

export function useAuth() {
  const router = useRouter()

  const isAuthenticated = useMemo(
    () => typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    []
  )

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token)
      router.push('/dashboard')
    },
  })

  const logout = () => {
    localStorage.removeItem('access_token')
    router.push('/login')
  }

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isAuthenticated,
    logout,
  }
}
