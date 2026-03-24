'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Workout, CreateWorkoutDto, Exercise } from '@/types/workout.types'

interface WorkoutEditorProps {
  initialData?: Workout
  studentId: string
  onSubmit: (data: CreateWorkoutDto) => void
  isLoading?: boolean
}

const emptyExercise: Exercise = { name: '', sets: 3, reps: 10, weight: 0 }

export function WorkoutEditor({ initialData, studentId, onSubmit, isLoading }: WorkoutEditorProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [exercises, setExercises] = useState<Exercise[]>(
    initialData?.exercises || [{ ...emptyExercise }]
  )

  const addExercise = () => setExercises([...exercises, { ...emptyExercise }])

  const removeExercise = (index: number) =>
    setExercises(exercises.filter((_, i) => i !== index))

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    setExercises(
      exercises.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ studentId, name, exercises })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome do Treino"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ex: Treino A - Peito e Tríceps"
        required
      />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Exercícios</label>
          <Button type="button" size="sm" variant="outline" onClick={addExercise}>
            + Adicionar
          </Button>
        </div>
        <div className="space-y-2">
          {exercises.map((exercise, i) => (
            <div key={i} className="flex gap-2 rounded-md border border-gray-200 p-3">
              <div className="flex-1">
                <Input
                  placeholder="Nome do exercício"
                  value={exercise.name}
                  onChange={(e) => updateExercise(i, 'name', e.target.value)}
                  required
                />
              </div>
              <Input
                type="number"
                placeholder="Séries"
                value={exercise.sets}
                onChange={(e) => updateExercise(i, 'sets', Number(e.target.value))}
                className="w-20"
                min={1}
              />
              <Input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) => updateExercise(i, 'reps', Number(e.target.value))}
                className="w-20"
                min={1}
              />
              <Input
                type="number"
                placeholder="Peso"
                value={exercise.weight}
                onChange={(e) => updateExercise(i, 'weight', Number(e.target.value))}
                className="w-20"
                min={0}
              />
              {exercises.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => removeExercise(i)}
                >
                  ✕
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Salvar Treino' : 'Criar Treino'}
        </Button>
      </div>
    </form>
  )
}
