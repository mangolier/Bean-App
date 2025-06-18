import React from 'react';
import Table from './Table';
import type { InventoryRecord } from '../services/admin';

const columns = [
    { accessorKey: 'description', header: 'Nội dung', enableResizing: true },
    { accessorKey: 'createdAt', header: 'Ngày tạo', enableResizing: true },
    { accessorKey: 'createdBy', header: 'Người tạo', enableResizing: true },
];

const InventoryPage: React.FC<{ data: InventoryRecord[] }> = ({ data }) => (
    <Table<InventoryRecord> data={data} columns={columns} />
);

export default InventoryPage;