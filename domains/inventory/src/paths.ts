export const INVENTORY_PATHS = {
  warehouses: () => '/inventory/warehouses',
  warehouse: (id: string) => `/inventory/warehouses/${id}`,
} as const
