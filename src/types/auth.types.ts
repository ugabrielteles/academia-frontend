export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
}

export interface AuthUser {
  email: string
  token: string
}
