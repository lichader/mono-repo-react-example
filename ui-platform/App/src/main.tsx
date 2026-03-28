import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@rpeng/shared'
import { App } from './App'
import { domains } from './domains'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: domains.flatMap((d) => d.routes),
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
