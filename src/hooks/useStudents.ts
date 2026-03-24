'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentsService } from '@/services/students.service'
import { CreateStudentDto, UpdateStudentDto } from '@/types/student.types'

export const STUDENTS_KEY = 'students'

export function useStudents() {
  return useQuery({
    queryKey: [STUDENTS_KEY],
    queryFn: studentsService.list,
  })
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: [STUDENTS_KEY, id],
    queryFn: () => studentsService.getById(id),
    enabled: !!id,
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateStudentDto) => studentsService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] })
    },
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateStudentDto }) =>
      studentsService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] })
    },
  })
}

export function useDeleteStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => studentsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_KEY] })
    },
  })
}
