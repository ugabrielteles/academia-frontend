import { Finance } from '@/types/finance.types'
import { Card } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

interface FinanceDashboardProps {
  finances: Finance[]
}

export function FinanceDashboard({ finances }: FinanceDashboardProps) {
  const total = finances.reduce((acc, f) => acc + f.amount, 0)
  const paid = finances.filter((f) => f.status === 'paid').reduce((acc, f) => acc + f.amount, 0)
  const pending = finances.filter((f) => f.status === 'pending').reduce((acc, f) => acc + f.amount, 0)
  const overdue = finances.filter((f) => f.status === 'overdue').reduce((acc, f) => acc + f.amount, 0)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card>
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Pago</p>
        <p className="text-2xl font-bold text-green-600">{formatCurrency(paid)}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Pendente</p>
        <p className="text-2xl font-bold text-yellow-600">{formatCurrency(pending)}</p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500">Vencido</p>
        <p className="text-2xl font-bold text-red-600">{formatCurrency(overdue)}</p>
      </Card>
    </div>
  )
}
