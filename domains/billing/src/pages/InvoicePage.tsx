import { Button } from '@rpeng/shared'
import { HelloWorld } from '@rpeng/shared'

export function InvoicePage() {
  HelloWorld()
  return (
    <div>
      <h1>Invoices</h1>
      <Button variant="primary">New Invoice</Button>
    </div>
  )
}
