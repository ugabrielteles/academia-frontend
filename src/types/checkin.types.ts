export interface Checkin {
  _id: string
  studentId: string
  date: string
  weekNumber: number
  year: number
  authorized: boolean
}

export interface CheckinResult {
  authorized: boolean
  reason?: string
  checkin?: Checkin
}

export interface RegisterCheckinDto {
  studentId: string
}
