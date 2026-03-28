import type { RouteObject } from 'react-router-dom'
import { InvoicePage } from './pages/InvoicePage'

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
]
