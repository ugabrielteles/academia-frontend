'use client'

import { useFinance, useUpdateFinance } from '@/hooks/useFinance'
import { PageTitle } from '@/components/layout/PageTitle'
import { FinanceDashboard } from '@/components/finance/FinanceDashboard'
import { FinanceTable } from '@/components/finance/FinanceTable'
import { Spinner } from '@/components/ui/Spinner'

export default function FinancePage() {
  const { data: finances, isLoading } = useFinance()
  const updateFinance = useUpdateFinance()

  const handleMarkAsPaid = async (id: string) => {
    await updateFinance.mutateAsync({
      id,
      dto: {
        status: 'paid',
        paidAt: new Date().toISOString(),
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Financeiro" subtitle="Gerencie as cobranças e pagamentos" />
      <FinanceDashboard finances={finances || []} />
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <FinanceTable
          finances={finances || []}
          onMarkAsPaid={handleMarkAsPaid}
        />
      </div>
    </div>
  )
}
