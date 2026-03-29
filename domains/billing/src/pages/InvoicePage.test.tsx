import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { billingHandlers } from '../mocks/handlers'
import { InvoicePage } from './InvoicePage'

const server = setupServer(...billingHandlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('InvoicePage', () => {
  it('renders the invoices heading and new invoice button', () => {
    render(<InvoicePage />)
    expect(screen.getByRole('heading', { name: 'Invoices' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New Invoice' })).toBeInTheDocument()
  })

  it('shows a loading state initially', () => {
    render(<InvoicePage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders invoice data from the API', async () => {
    render(<InvoicePage />)

    await waitFor(() => {
      expect(screen.getByText('INV-001')).toBeInTheDocument()
    })

    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('$1200.00')).toBeInTheDocument()
    expect(screen.getByText('paid')).toBeInTheDocument()

    expect(screen.getByText('INV-002')).toBeInTheDocument()
    expect(screen.getByText('Globex Inc')).toBeInTheDocument()
    expect(screen.getByText('INV-003')).toBeInTheDocument()
  })

  it('can override the response to test error states', async () => {
    const { http, HttpResponse } = await import('msw')
    server.use(
      http.get('/api/billing/invoices', () => HttpResponse.json([], { status: 200 })),
    )

    render(<InvoicePage />)

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(screen.queryByText('INV-001')).not.toBeInTheDocument()
  })
})
