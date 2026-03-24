'use client'

import { useState } from 'react'
import { usePlans, useCreatePlan, useUpdatePlan, useDeletePlan } from '@/hooks/usePlans'
import { Plan, CreatePlanDto } from '@/types/plan.types'
import { PageTitle } from '@/components/layout/PageTitle'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import { PlanForm } from '@/components/plans/PlanForm'
import { PlanTable } from '@/components/plans/PlanTable'

export default function PlansPage() {
  const { data: plans, isLoading } = usePlans()
  const createPlan = useCreatePlan()
  const updatePlan = useUpdatePlan()
  const deletePlan = useDeletePlan()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  const handleOpenCreate = () => {
    setSelectedPlan(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (plan: Plan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedPlan(null)
  }

  const handleSubmit = async (data: CreatePlanDto) => {
    if (selectedPlan) {
      await updatePlan.mutateAsync({ id: selectedPlan._id, dto: data })
    } else {
      await createPlan.mutateAsync(data)
    }
    handleClose()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este plano?')) {
      await deletePlan.mutateAsync(id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle title="Planos" subtitle="Configure e gerencie os planos da academia" />
        <Button onClick={handleOpenCreate}>Novo Plano</Button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <PlanTable
          plans={plans || []}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={selectedPlan ? 'Editar Plano' : 'Novo Plano'}
      >
        <PlanForm
          initialData={selectedPlan || undefined}
          onSubmit={handleSubmit}
          isLoading={createPlan.isPending || updatePlan.isPending}
        />
      </Modal>
    </div>
  )
}
