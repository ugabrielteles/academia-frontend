import api from './api'
import { Finance } from '@/types/finance.types'

export const billingService = {
  async getPending(): Promise<Finance[]> {
    const { data } = await api.get<Finance[]>('/billing/pending')
    return data
  },

  async markAsPaid(id: string): Promise<Finance> {
    const { data } = await api.patch<Finance>(`/billing/${id}/paid`)
    return data
  },
}
