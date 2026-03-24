'use client'

import { useStudents } from '@/hooks/useStudents'
import { useFinance } from '@/hooks/useFinance'
import { Card } from '@/components/ui/Card'
import { PageTitle } from '@/components/layout/PageTitle'
import { Spinner } from '@/components/ui/Spinner'

export default function DashboardPage() {
  const { data: students, isLoading: loadingStudents } = useStudents()
  const { data: finances, isLoading: loadingFinance } = useFinance()

  if (loadingStudents || loadingFinance) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const totalStudents = students?.length || 0
  const activeStudents = students?.filter((s) => s.status === 'active').length || 0
  const blockedStudents = students?.filter((s) => s.status === 'blocked').length || 0
  const pendingBillings = finances?.filter((f) => f.status === 'pending').length || 0

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Visão geral do sistema" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm font-medium text-gray-500">Total de Alunos</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalStudents}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Alunos Ativos</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{activeStudents}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Alunos Bloqueados</p>
          <p className="mt-2 text-3xl font-bold text-red-600">{blockedStudents}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-gray-500">Cobranças Pendentes</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingBillings}</p>
        </Card>
      </div>
    </div>
  )
}
