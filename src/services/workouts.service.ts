import api from './api'
import { Workout, CreateWorkoutDto, UpdateWorkoutDto } from '@/types/workout.types'

export const workoutsService = {
  async list(): Promise<Workout[]> {
    const { data } = await api.get<Workout[]>('/workouts')
    return data
  },

  async getByStudent(studentId: string): Promise<Workout[]> {
    const { data } = await api.get<Workout[]>(`/workouts/student/${studentId}`)
    return data
  },

  async create(dto: CreateWorkoutDto): Promise<Workout> {
    const { data } = await api.post<Workout>('/workouts', dto)
    return data
  },

  async update(id: string, dto: UpdateWorkoutDto): Promise<Workout> {
    const { data } = await api.put<Workout>(`/workouts/${id}`, dto)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/workouts/${id}`)
  },
}
