'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="text-5xl">🏋️</span>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Academia App</h1>
          <p className="mt-2 text-gray-500">Faça login para continuar</p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@academia.com"
              required
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                Email ou senha inválidos. Tente novamente.
              </div>
            )}
            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
