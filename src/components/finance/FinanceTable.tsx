'use client'

import { Finance } from '@/types/finance.types'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/lib/utils'

interface FinanceTableProps {
  finances: Finance[]
  onMarkAsPaid?: (id: string) => void
}

const statusVariant = {
  paid: 'success',
  pending: 'warning',
  overdue: 'danger',
} as const

const statusLabel = {
  paid: 'Pago',
  pending: 'Pendente',
  overdue: 'Vencido',
}

export function FinanceTable({ finances, onMarkAsPaid }: FinanceTableProps) {
  const headers = ['Vencimento', 'Valor', 'Status', 'Pago em', 'Ações']

  const rows = finances.map((finance) => [
    formatDate(finance.dueDate),
    formatCurrency(finance.amount),
    <Badge key="status" variant={statusVariant[finance.status]}>
      {statusLabel[finance.status]}
    </Badge>,
    finance.paidAt ? formatDate(finance.paidAt) : '-',
    finance.status !== 'paid' && onMarkAsPaid ? (
      <Button key="action" size="sm" onClick={() => onMarkAsPaid(finance._id)}>
        Marcar como Pago
      </Button>
    ) : null,
  ])

  return <Table headers={headers} rows={rows} />
}
