import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import '../styles/Table.css';

type TableProps<T extends object> = {
    data: T[];
    columns: ColumnDef<T, any>[];
};

function Table<T extends object>({ data, columns }: TableProps<T>) {
    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});

    const table = useReactTable({
        data,
        columns,
        state: { columnSizing },
        onColumnSizingChange: setColumnSizing,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
    });

    // Custom slower resize: only adjust this column + its neighbor
    const startColumnResize = (
        header: ReturnType<typeof table.getHeaderGroups>[0]['headers'][0],
        e: React.MouseEvent
    ) => {
        e.preventDefault();
        const startX = e.clientX;
        const colId = header.id;
        const allCols = table.getAllLeafColumns();
        const idx = allCols.findIndex(c => c.id === colId);
        const neighborIdx = idx < allCols.length - 1 ? idx + 1 : idx - 1;
        const neighborCol = allCols[neighborIdx];
        const neighborId = neighborCol.id;

        const initialSize = header.getSize();
        const neighborInitial = neighborCol.getSize();
        const minSize = header.column.columnDef.minSize ?? 50;
        const neighborMin = neighborCol.columnDef.minSize ?? 50;
        const sensitivity = 0.2;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const dx = moveEvent.clientX - startX;
            const delta = dx * sensitivity;
            const newSize = Math.max(minSize, initialSize + delta);
            const newNeighbor = Math.max(neighborMin, neighborInitial - delta);
            setColumnSizing(prev => ({
                ...prev,
                [colId]: newSize,
                [neighborId]: newNeighbor,
            }));
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="table-container">
            <table className="custom-table">
                <colgroup>
                    {table.getAllLeafColumns().map(col => (
                        <col key={col.id} style={{ width: `${col.getSize()}px` }} />
                    ))}
                </colgroup>
                <thead>
                {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                        {hg.headers.map(header => (
                            <th key={header.id}>
                                <div className="header-content">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    <div
                                        className="resizer"
                                        onMouseDown={e => startColumnResize(header, e)}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.length === 0 ? (
                    <tr>
                        <td colSpan={table.getAllLeafColumns().length}>
                            <div className="no-content-row">
                                <span>No content</span>
                            </div>
                        </td>
                    </tr>
                ) : (
                    table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;