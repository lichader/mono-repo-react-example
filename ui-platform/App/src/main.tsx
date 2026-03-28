import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { billingRoutes } from '@rpeng/billing'
import { inventoryRoutes } from '@rpeng/inventory'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...billingRoutes, ...inventoryRoutes],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
