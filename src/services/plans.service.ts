import api from './api'
import { Plan, CreatePlanDto, UpdatePlanDto } from '@/types/plan.types'

export const plansService = {
  async list(): Promise<Plan[]> {
    const { data } = await api.get<Plan[]>('/plans')
    return data
  },

  async getById(id: string): Promise<Plan> {
    const { data } = await api.get<Plan>(`/plans/${id}`)
    return data
  },

  async create(dto: CreatePlanDto): Promise<Plan> {
    const { data } = await api.post<Plan>('/plans', dto)
    return data
  },

  async update(id: string, dto: UpdatePlanDto): Promise<Plan> {
    const { data } = await api.put<Plan>(`/plans/${id}`, dto)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/plans/${id}`)
  },
}
