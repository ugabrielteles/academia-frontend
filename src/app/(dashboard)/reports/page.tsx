'use client'

import { useStudents } from '@/hooks/useStudents'
import { useFinance } from '@/hooks/useFinance'
import { PageTitle } from '@/components/layout/PageTitle'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { Spinner } from '@/components/ui/Spinner'

export default function ReportsPage() {
  const { data: students, isLoading: loadingStudents } = useStudents()
  const { data: finances, isLoading: loadingFinance } = useFinance()

  if (loadingStudents || loadingFinance) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyFinances = finances?.filter((f) => {
    const d = new Date(f.dueDate)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  }) || []

  const monthlyRevenue = monthlyFinances
    .filter((f) => f.status === 'paid')
    .reduce((acc, f) => acc + f.amount, 0)

  const monthlyPending = monthlyFinances
    .filter((f) => f.status === 'pending')
    .reduce((acc, f) => acc + f.amount, 0)

  const activeStudents = students?.filter((s) => s.status === 'active').length || 0
  const inactiveStudents = students?.filter((s) => s.status === 'inactive').length || 0
  const blockedStudents = students?.filter((s) => s.status === 'blocked').length || 0

  return (
    <div className="space-y-6">
      <PageTitle
        title="Relatórios"
        subtitle={`Métricas de ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`}
      />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Financeiro do Mês</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-gray-500">Receita Realizada</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {formatCurrency(monthlyRevenue)}
            </p>
          </Card>
          <Card>
            <p className="text-sm text-gray-500">Receita Pendente</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {formatCurrency(monthlyPending)}
            </p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Alunos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-sm text-gray-500">Ativos</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{activeStudents}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-500">Inativos</p>
            <p className="mt-2 text-3xl font-bold text-gray-600">{inactiveStudents}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-500">Bloqueados</p>
            <p className="mt-2 text-3xl font-bold text-red-600">{blockedStudents}</p>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Distribuição de Status</h2>
        <Card>
          <div className="space-y-3">
            {[
              { label: 'Ativos', value: activeStudents, color: 'bg-green-500' },
              { label: 'Inativos', value: inactiveStudents, color: 'bg-gray-400' },
              { label: 'Bloqueados', value: blockedStudents, color: 'bg-red-500' },
            ].map((item) => {
              const total = (students?.length || 1)
              const pct = Math.round((item.value / total) * 100)
              return (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
