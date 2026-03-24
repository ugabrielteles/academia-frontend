'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Plan, CreatePlanDto } from '@/types/plan.types'

interface PlanFormProps {
  initialData?: Plan
  onSubmit: (data: CreatePlanDto) => void
  isLoading?: boolean
}

export function PlanForm({ initialData, onSubmit, isLoading }: PlanFormProps) {
  const [form, setForm] = useState<CreatePlanDto>({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    durationMonths: initialData?.durationMonths || 1,
    weeklyCheckinLimit: initialData?.weeklyCheckinLimit || 1,
    description: initialData?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do plano"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Ex: Mensal Premium"
        required
      />
      <Input
        label="Preço (R$)"
        type="number"
        min={0}
        step="0.01"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        required
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Duração (meses)"
          type="number"
          min={1}
          value={form.durationMonths}
          onChange={(e) =>
            setForm({ ...form, durationMonths: Number(e.target.value) })
          }
          required
        />
        <Input
          label="Limite de check-ins/semana"
          type="number"
          min={1}
          value={form.weeklyCheckinLimit}
          onChange={(e) =>
            setForm({ ...form, weeklyCheckinLimit: Number(e.target.value) })
          }
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700" htmlFor="plan-description">
          Descrição
        </label>
        <textarea
          id="plan-description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Detalhes do plano"
          rows={4}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Salvar' : 'Criar Plano'}
        </Button>
      </div>
    </form>
  )
}
