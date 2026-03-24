export type StudentStatus = 'active' | 'inactive' | 'blocked'

export interface Student {
  _id: string
  name: string
  email: string
  phone: string
  planId: string
  status: StudentStatus
  createdAt: string
  updatedAt: string
}

export interface CreateStudentDto {
  name: string
  email: string
  phone: string
  planId: string
  status?: StudentStatus
}

export interface UpdateStudentDto extends Partial<CreateStudentDto> {}
