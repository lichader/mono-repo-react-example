import type { DomainManifest } from '@rpeng/shared'
import { inventoryRoutes } from './routes'

export const inventoryManifest: DomainManifest = {
  id: 'inventory',
  routes: inventoryRoutes,
  navItems: [{ label: 'Inventory', to: '/inventory/warehouses', order: 20 }],
}
