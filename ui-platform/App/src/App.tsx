import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <div>
      <nav>
        <Link to="/billing/invoices">Billing</Link>
        <Link to="/inventory/warehouses">Inventory</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
