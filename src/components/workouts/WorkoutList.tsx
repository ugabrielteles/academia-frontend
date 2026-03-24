'use client'

import { Workout } from '@/types/workout.types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface WorkoutListProps {
  workouts: Workout[]
  onEdit?: (workout: Workout) => void
  onDelete?: (id: string) => void
}

export function WorkoutList({ workouts, onEdit, onDelete }: WorkoutListProps) {
  if (workouts.length === 0) {
    return <p className="text-sm text-gray-500">Nenhum treino cadastrado.</p>
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout._id} title={workout.name}>
          <div className="space-y-2">
            {workout.exercises.map((exercise, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
              >
                <span className="font-medium">{exercise.name}</span>
                <span className="text-gray-500">
                  {exercise.sets}x{exercise.reps} — {exercise.weight}kg
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {onEdit && (
              <Button size="sm" variant="outline" onClick={() => onEdit(workout)}>
                Editar
              </Button>
            )}
            {onDelete && (
              <Button size="sm" variant="danger" onClick={() => onDelete(workout._id)}>
                Excluir
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
