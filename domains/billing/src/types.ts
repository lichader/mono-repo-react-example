export interface Invoice {
  id: string
  number: string
  client: string
  amount: number
  status: 'draft' | 'sent' | 'paid'
}
