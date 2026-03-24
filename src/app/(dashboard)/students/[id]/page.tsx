'use client'

import { useParams } from 'next/navigation'
import { useStudent } from '@/hooks/useStudents'
import { useWorkoutsByStudent } from '@/hooks/useWorkouts'
import { useFinanceByStudent } from '@/hooks/useFinance'
import { PageTitle } from '@/components/layout/PageTitle'
import { StudentCard } from '@/components/students/StudentCard'
import { WorkoutList } from '@/components/workouts/WorkoutList'
import { FinanceTable } from '@/components/finance/FinanceTable'
import { Spinner } from '@/components/ui/Spinner'
import { Card } from '@/components/ui/Card'

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: student, isLoading: loadingStudent } = useStudent(id)
  const { data: workouts, isLoading: loadingWorkouts } = useWorkoutsByStudent(id)
  const { data: finances, isLoading: loadingFinance } = useFinanceByStudent(id)

  if (loadingStudent) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!student) {
    return <p className="text-gray-500">Aluno não encontrado.</p>
  }

  return (
    <div className="space-y-6">
      <PageTitle title={student.name} subtitle="Detalhes do aluno" />
      <StudentCard student={student} />
      <Card title="Treinos">
        {loadingWorkouts ? (
          <Spinner />
        ) : (
          <WorkoutList
            workouts={workouts || []}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        )}
      </Card>
      <Card title="Cobranças">
        {loadingFinance ? <Spinner /> : <FinanceTable finances={finances || []} />}
      </Card>
    </div>
  )
}
