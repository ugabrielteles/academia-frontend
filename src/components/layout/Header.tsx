'use client'

import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { logout } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Administrador</span>
        <button
          onClick={logout}
          className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
