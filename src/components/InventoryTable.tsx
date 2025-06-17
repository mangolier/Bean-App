import React from 'react'
import type { InventoryRecord } from '../services/admin'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'

const columns = [
    { accessorKey: 'id',        header: 'ID' },
    { accessorKey: 'createdAt', header: 'Created At' },
    { accessorKey: 'createdBy', header: 'Created By' },
]

const InventoryTable: React.FC<{ data: InventoryRecord[] }> = ({ data }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
            {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                    {hg.headers.map(h => (
                        <th key={h.id}>
                            {flexRender(h.column.columnDef.header, h.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default InventoryTable;