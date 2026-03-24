'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { usePlans } from '@/hooks/usePlans'
import { Student, CreateStudentDto } from '@/types/student.types'

interface StudentFormProps {
  initialData?: Student
  onSubmit: (data: CreateStudentDto) => void
  isLoading?: boolean
}

export function StudentForm({ initialData, onSubmit, isLoading }: StudentFormProps) {
  const { data: plans } = usePlans()
  const [form, setForm] = useState<CreateStudentDto>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    planId: initialData?.planId || '',
    status: initialData?.status || 'active',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Nome completo"
        required
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="email@exemplo.com"
        required
      />
      <Input
        label="Telefone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="(11) 99999-9999"
        required
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Plano</label>
        <select
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={form.planId}
          onChange={(e) => setForm({ ...form, planId: e.target.value })}
          required
        >
          <option value="">Selecione um plano</option>
          {plans?.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name} - R$ {plan.price}/mês
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as 'active' | 'inactive' | 'blocked' })
          }
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="blocked">Bloqueado</option>
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Salvar' : 'Criar Aluno'}
        </Button>
      </div>
    </form>
  )
}
