'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkinService } from '@/services/checkin.service'
import { RegisterCheckinDto } from '@/types/checkin.types'

export const CHECKIN_KEY = 'checkin'

export function useCheckinByStudent(studentId: string) {
  return useQuery({
    queryKey: [CHECKIN_KEY, 'student', studentId],
    queryFn: () => checkinService.getByStudent(studentId),
    enabled: !!studentId,
  })
}

export function useRegisterCheckin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: RegisterCheckinDto) => checkinService.register(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHECKIN_KEY] })
    },
  })
}
