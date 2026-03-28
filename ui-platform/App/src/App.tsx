import { Link, Outlet } from 'react-router-dom'
import { domains } from './domains'

const navItems = domains
  .flatMap((d) => d.navItems)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export function App() {
  return (
    <div>
      <nav>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
