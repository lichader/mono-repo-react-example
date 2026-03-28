export interface User {
  id: string
  name: string
  email: string
}

export interface AuthContext {
  user: User | null
  permissions: Set<string>
  isAuthenticated: boolean
}
