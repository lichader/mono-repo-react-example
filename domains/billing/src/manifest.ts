import type { DomainManifest } from '@rpeng/shared'
import { billingRoutes } from './routes'

export const billingManifest: DomainManifest = {
  id: 'billing',
  routes: billingRoutes,
  navItems: [{ label: 'Billing', to: '/billing/invoices', order: 10 }],
}
