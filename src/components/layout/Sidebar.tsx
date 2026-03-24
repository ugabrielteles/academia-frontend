'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/students', label: 'Alunos', icon: '👥' },
  { href: '/plans', label: 'Planos', icon: '📦' },
  { href: '/workouts', label: 'Treinos', icon: '💪' },
  { href: '/finance', label: 'Financeiro', icon: '💰' },
  { href: '/checkin', label: 'Checkin', icon: '✅' },
  { href: '/reports', label: 'Relatórios', icon: '📊' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <span className="text-xl font-bold text-blue-600">🏋️ Academia</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
