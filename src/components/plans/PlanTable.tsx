'use client'

import { Plan } from '@/types/plan.types'
import { Table } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'

interface PlanTableProps {
  plans: Plan[]
  onEdit: (plan: Plan) => void
  onDelete: (id: string) => void
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function PlanTable({ plans, onEdit, onDelete }: PlanTableProps) {
  const headers = ['Plano', 'Preço', 'Duração', 'Check-ins', 'Descrição', 'Ações']

  const rows = plans.map((plan) => [
    <span key="name" className="font-medium">{plan.name}</span>,
    currencyFormatter.format(plan.price),
    `${plan.durationMonths} mês(es)`,
    `${plan.weeklyCheckinLimit}/semana`,
    <span key="description" className="line-clamp-2 max-w-sm">{plan.description}</span>,
    <div key="actions" className="flex gap-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(plan)}>
        Editar
      </Button>
      <Button size="sm" variant="danger" onClick={() => onDelete(plan._id)}>
        Excluir
      </Button>
    </div>,
  ])

  return <Table headers={headers} rows={rows} />
}
