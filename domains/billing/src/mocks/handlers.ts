import { http, HttpResponse } from 'msw'
import type { Invoice } from '../types'

const invoices: Invoice[] = [
  { id: '1', number: 'INV-001', client: 'Acme Corp', amount: 1200.0, status: 'paid' },
  { id: '2', number: 'INV-002', client: 'Globex Inc', amount: 850.5, status: 'sent' },
  { id: '3', number: 'INV-003', client: 'Initech', amount: 3400.0, status: 'draft' },
]

export const billingHandlers = [
  http.get('/api/billing/invoices', () => HttpResponse.json(invoices)),
]
