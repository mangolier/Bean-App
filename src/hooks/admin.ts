import { useQuery } from '@tanstack/react-query'
import type { InventoryRecord } from '../services/admin'
import { fetchInventoryRecords } from '../services/admin'

export function useInventory() {
    return useQuery<InventoryRecord[], Error>({
        queryKey: ['inventory'],
        queryFn: fetchInventoryRecords,
    })
}