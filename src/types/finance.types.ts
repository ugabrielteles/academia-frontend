export type FinanceStatus = 'pending' | 'paid' | 'overdue'

export interface Finance {
  _id: string
  studentId: string
  planId: string
  amount: number
  dueDate: string
  paidAt?: string
  status: FinanceStatus
}

export interface CreateFinanceDto {
  studentId: string
  planId: string
  amount: number
  dueDate: string
}

export interface UpdateFinanceDto extends Partial<CreateFinanceDto> {
  paidAt?: string
  status?: FinanceStatus
}
