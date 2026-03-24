'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { plansService } from '@/services/plans.service'
import { CreatePlanDto, UpdatePlanDto } from '@/types/plan.types'

export const PLANS_KEY = 'plans'

export function usePlans() {
  return useQuery({
    queryKey: [PLANS_KEY],
    queryFn: plansService.list,
  })
}

export function useCreatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: CreatePlanDto) => plansService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
    },
  })
}

export function useUpdatePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdatePlanDto }) =>
      plansService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
    },
  })
}

export function useDeletePlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => plansService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLANS_KEY] })
    },
  })
}
