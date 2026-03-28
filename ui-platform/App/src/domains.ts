import { billingManifest } from '@rpeng/billing'
import { inventoryManifest } from '@rpeng/inventory'
import type { DomainManifest } from '@rpeng/shared'

export const domains: DomainManifest[] = [billingManifest, inventoryManifest]
