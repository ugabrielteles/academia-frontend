import { Checkin } from '@/types/checkin.types'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface CheckinHistoryProps {
  checkins: Checkin[]
}

export function CheckinHistory({ checkins }: CheckinHistoryProps) {
  const headers = ['Data', 'Semana', 'Ano', 'Status']

  const rows = checkins.map((checkin) => [
    formatDate(checkin.date),
    `Semana ${checkin.weekNumber}`,
    String(checkin.year),
    <Badge key="status" variant={checkin.authorized ? 'success' : 'danger'}>
      {checkin.authorized ? 'Autorizado' : 'Negado'}
    </Badge>,
  ])

  return <Table headers={headers} rows={rows} emptyMessage="Nenhum check-in registrado." />
}
