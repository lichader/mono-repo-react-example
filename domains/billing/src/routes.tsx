import type { RouteObject } from 'react-router-dom'
import { InvoicePage } from './pages/InvoicePage'
import { inventoryRoutes } from '../../inventory/src/routes.tsx'

export const billingRoutes: RouteObject[] = [
  {
    path: '/billing',
    children: [
      {
        path: 'invoices',
        element: <InvoicePage />,
      },
    ],
  },
  ...inventoryRoutes,
]
