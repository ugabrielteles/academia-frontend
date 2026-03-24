import { Student } from '@/types/student.types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface StudentCardProps {
  student: Student
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

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-500">{student.email}</p>
          <p className="text-sm text-gray-500">{student.phone}</p>
        </div>
        <Badge variant={statusVariant[student.status]}>
          {statusLabel[student.status]}
        </Badge>
      </div>
    </Card>
  )
}
