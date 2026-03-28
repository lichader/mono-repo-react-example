import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InvoicePage } from './InvoicePage'

describe('InvoicePage', () => {
  it('renders the invoices heading', () => {
    render(<InvoicePage />)
    expect(screen.getByRole('heading', { name: 'Invoices' })).toBeInTheDocument()
  })

  it('renders the new invoice button', () => {
    render(<InvoicePage />)
    expect(screen.getByRole('button', { name: 'New Invoice' })).toBeInTheDocument()
  })
})
