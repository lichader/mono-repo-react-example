import { useContext } from 'react'
import { AuthCtx } from './AuthProvider'
import type { AuthContext, User } from './types'

export function useAuth(): AuthContext {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useRequireAuth(): AuthContext & { user: User } {
  const ctx = useAuth()
  if (!ctx.user) throw new Error('User is not authenticated')
  return ctx as AuthContext & { user: User }
}

export function usePermission(permission: string): boolean {
  const { permissions } = useAuth()
  return permissions.has(permission)
}
