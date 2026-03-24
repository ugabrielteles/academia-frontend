import api from './api'
import { Checkin, CheckinResult, RegisterCheckinDto } from '@/types/checkin.types'

export const checkinService = {
  async getByStudent(studentId: string): Promise<Checkin[]> {
    const { data } = await api.get<Checkin[]>(`/checkin/student/${studentId}`)
    return data
  },

  async register(dto: RegisterCheckinDto): Promise<CheckinResult> {
    const { data } = await api.post<CheckinResult>('/checkin', dto)
    return data
  },
}
