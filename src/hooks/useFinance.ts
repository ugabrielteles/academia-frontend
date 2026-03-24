'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { financeService } from '@/services/finance.service'
import { CreateFinanceDto, UpdateFinanceDto } from '@/types/finance.types'

export const FINANCE_KEY = 'finance'

export function useFinance() {
  return useQuery({
    queryKey: [FINANCE_KEY],
    queryFn: financeService.list,
  })
}

export function useFinanceByStudent(studentId: string) {
  return useQuery({
    queryKey: [FINANCE_KEY, 'student', studentId],
    queryFn: () => financeService.getByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useCreateFinance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreateFinanceDto) => financeService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FINANCE_KEY] })
    },
  })
}

export function useUpdateFinance() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateFinanceDto }) =>
      financeService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FINANCE_KEY] })
    },
  })
}
