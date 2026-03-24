import api from './api'
import { Finance, CreateFinanceDto, UpdateFinanceDto } from '@/types/finance.types'

export const financeService = {
  async list(): Promise<Finance[]> {
    const { data } = await api.get<Finance[]>('/finance')
    return data
  },

  async getByStudent(studentId: string): Promise<Finance[]> {
    const { data } = await api.get<Finance[]>(`/finance/student/${studentId}`)
    return data
  },

  async create(dto: CreateFinanceDto): Promise<Finance> {
    const { data } = await api.post<Finance>('/finance', dto)
    return data
  },

  async update(id: string, dto: UpdateFinanceDto): Promise<Finance> {
    const { data } = await api.put<Finance>(`/finance/${id}`, dto)
    return data
  },
}
