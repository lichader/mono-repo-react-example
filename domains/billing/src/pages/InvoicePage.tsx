import { useEffect, useState } from 'react'
import { Button } from '@rpeng/shared'
import type { Invoice } from '../types'

export function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/billing/invoices')
      .then((res) => res.json())
      .then((data: Invoice[]) => {
        setInvoices(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1>Invoices</h1>
      <Button variant="primary">New Invoice</Button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.number}</td>
                <td>{invoice.client}</td>
                <td>${invoice.amount.toFixed(2)}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
