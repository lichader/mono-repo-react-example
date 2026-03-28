import type { RouteObject } from 'react-router-dom'

export interface NavItem {
  label: string
  to: string
  order?: number
}

export interface DomainManifest {
  id: string
  routes: RouteObject[]
  navItems: NavItem[]
}
