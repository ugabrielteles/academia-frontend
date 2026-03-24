export interface Plan {
  _id: string
  name: string
  price: number
  durationMonths: number
  weeklyCheckinLimit: number
  description: string
}

export interface CreatePlanDto {
  name: string
  price: number
  durationMonths: number
  weeklyCheckinLimit: number
  description: string
}

export interface UpdatePlanDto extends Partial<CreatePlanDto> {}
