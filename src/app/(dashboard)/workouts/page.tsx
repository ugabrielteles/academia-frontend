'use client'

import { useState } from 'react'
import { useWorkouts, useCreateWorkout, useUpdateWorkout, useDeleteWorkout } from '@/hooks/useWorkouts'
import { Workout, CreateWorkoutDto } from '@/types/workout.types'
import { PageTitle } from '@/components/layout/PageTitle'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { WorkoutList } from '@/components/workouts/WorkoutList'
import { WorkoutEditor } from '@/components/workouts/WorkoutEditor'
import { Spinner } from '@/components/ui/Spinner'
import { Input } from '@/components/ui/Input'

export default function WorkoutsPage() {
  const { data: workouts, isLoading } = useWorkouts()
  const createWorkout = useCreateWorkout()
  const updateWorkout = useUpdateWorkout()
  const deleteWorkout = useDeleteWorkout()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [studentId, setStudentId] = useState('')

  const handleOpenCreate = () => {
    setSelectedWorkout(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (workout: Workout) => {
    setSelectedWorkout(workout)
    setStudentId(workout.studentId)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedWorkout(null)
  }

  const handleSubmit = async (data: CreateWorkoutDto) => {
    if (selectedWorkout) {
      await updateWorkout.mutateAsync({ id: selectedWorkout._id, dto: data })
    } else {
      await createWorkout.mutateAsync(data)
    }
    handleClose()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este treino?')) {
      await deleteWorkout.mutateAsync(id)
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
        <PageTitle title="Treinos" subtitle="Gerencie os treinos dos alunos" />
        <Button onClick={handleOpenCreate}>Novo Treino</Button>
      </div>

      <WorkoutList
        workouts={workouts || []}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title={selectedWorkout ? 'Editar Treino' : 'Novo Treino'}
        className="max-w-2xl"
      >
        {!selectedWorkout && (
          <div className="mb-4">
            <Input
              label="ID do Aluno"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="ID do aluno"
              required
            />
          </div>
        )}
        <WorkoutEditor
          initialData={selectedWorkout || undefined}
          studentId={selectedWorkout?.studentId || studentId}
          onSubmit={handleSubmit}
          isLoading={createWorkout.isPending || updateWorkout.isPending}
        />
      </Modal>
    </div>
  )
}
