import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WarehousesPage } from './WarehousesPage'

describe('WarehousesPage', () => {
  it('renders the warehouses heading', () => {
    render(<WarehousesPage />)
    expect(screen.getByRole('heading', { name: 'Warehouses' })).toBeInTheDocument()
  })

  it('renders the add warehouse button', () => {
    render(<WarehousesPage />)
    expect(screen.getByRole('button', { name: 'Add Warehouse' })).toBeInTheDocument()
  })
})
