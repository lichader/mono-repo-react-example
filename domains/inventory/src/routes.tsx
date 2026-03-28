import type { RouteObject } from 'react-router-dom'
import { WarehousesPage } from './pages/WarehousesPage'

export const inventoryRoutes: RouteObject[] = [
  {
    path: '/inventory',
    children: [
      {
        path: 'warehouses',
        element: <WarehousesPage />,
      },
    ],
  },
]
