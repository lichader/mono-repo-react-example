import { createContext, useState, useMemo } from 'react'
import type { AuthContext, User } from './types'

const AuthCtx = createContext<AuthContext | null>(null)

// Stub user for development — replace with real auth integration
const STUB_USER: User = {
  id: '1',
  name: 'Dev User',
  email: 'dev@example.com',
}

const STUB_PERMISSIONS = new Set([
  'billing:view-invoices',
  'billing:create-invoice',
  'inventory:manage-warehouses',
])

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(STUB_USER)
  const [permissions] = useState<Set<string>>(STUB_PERMISSIONS)

  const value = useMemo<AuthContext>(
    () => ({
      user,
      permissions,
      isAuthenticated: user !== null,
    }),
    [user, permissions],
  )

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export { AuthCtx }
