export interface Exercise {
  name: string
  sets: number
  reps: number
  weight: number
}

export interface Workout {
  _id: string
  studentId: string
  name: string
  exercises: Exercise[]
}

export interface CreateWorkoutDto {
  studentId: string
  name: string
  exercises: Exercise[]
}

export interface UpdateWorkoutDto extends Partial<CreateWorkoutDto> {}
