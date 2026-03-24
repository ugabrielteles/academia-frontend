'use client'

import { Student } from '@/types/student.types'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface StudentTableProps {
  students: Student[]
  onEdit: (student: Student) => void
  onDelete: (id: string) => void
}

const statusVariant = {
  active: 'success',
  inactive: 'neutral',
  blocked: 'danger',
} as const

const statusLabel = {
  active: 'Ativo',
  inactive: 'Inativo',
  blocked: 'Bloqueado',
}

export function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  const headers = ['Nome', 'Email', 'Telefone', 'Status', 'Ações']

  const rows = students.map((student) => [
    <span key="name" className="font-medium">{student.name}</span>,
    student.email,
    student.phone,
    <Badge key="status" variant={statusVariant[student.status]}>
      {statusLabel[student.status]}
    </Badge>,
    <div key="actions" className="flex gap-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(student)}>
        Editar
      </Button>
      <Button size="sm" variant="danger" onClick={() => onDelete(student._id)}>
        Excluir
      </Button>
    </div>,
  ])

  return <Table headers={headers} rows={rows} />
}
