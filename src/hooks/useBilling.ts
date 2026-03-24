'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { billingService } from '@/services/billing.service'

export const BILLING_KEY = 'billing'

export function useBillingPending() {
  return useQuery({
    queryKey: [BILLING_KEY, 'pending'],
    queryFn: billingService.getPending,
  })
}

export function useMarkAsPaid() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => billingService.markAsPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BILLING_KEY] })
    },
  })
}
