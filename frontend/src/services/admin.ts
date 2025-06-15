import { get } from './api';

export interface InventoryRecord {
    id: number;
    createdAt: string;
    createdBy: string;
}

export interface OrderRecord {
    id: number;
    createdAt: string;
    createdBy: string;
}

export const fetchInventoryRecords = async (): Promise<InventoryRecord[]> => {
    const response = await get<InventoryRecord[]>('/admin/inventory');
    return response.data;
};

export const fetchOrderRecords = async (): Promise<OrderRecord[]> => {
    const response = await get<OrderRecord[]>('/admin/orders');
    return response.data;
};