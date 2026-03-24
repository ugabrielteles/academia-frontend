import api from './api'
import { Student, CreateStudentDto, UpdateStudentDto } from '@/types/student.types'

export const studentsService = {
  async list(): Promise<Student[]> {
    const { data } = await api.get<Student[]>('/students')
    return data
  },

  async getById(id: string): Promise<Student> {
    const { data } = await api.get<Student>(`/students/${id}`)
    return data
  },

  async create(dto: CreateStudentDto): Promise<Student> {
    const { data } = await api.post<Student>('/students', dto)
    return data
  },

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const { data } = await api.put<Student>(`/students/${id}`, dto)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/students/${id}`)
  },
}
