'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workoutsService } from '@/services/workouts.service'
import { CreateWorkoutDto, UpdateWorkoutDto } from '@/types/workout.types'

export const WORKOUTS_KEY = 'workouts'

export function useWorkouts() {
  return useQuery({
    queryKey: [WORKOUTS_KEY],
    queryFn: workoutsService.list,
  })
}

export function useWorkoutsByStudent(studentId: string) {
  return useQuery({
    queryKey: [WORKOUTS_KEY, 'student', studentId],
    queryFn: () => workoutsService.getByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useCreateWorkout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateWorkoutDto) => workoutsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUTS_KEY] })
    },
  })
}

export function useUpdateWorkout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateWorkoutDto }) =>
      workoutsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUTS_KEY] })
    },
  })
}

export function useDeleteWorkout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => workoutsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUTS_KEY] })
    },
  })
}
