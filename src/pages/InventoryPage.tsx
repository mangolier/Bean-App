import React, { useEffect, useState } from 'react';
import { fetchInventoryRecords, InventoryRecord } from '../services/admin';
import '../styles/InventoryPage.css';

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [invRes] = await Promise.all([
                    fetchInventoryRecords()
                ]);
                setInventory(invRes);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="admin-portal">Loading...</div>;

    return (
        <div className="admin-portal">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Created At</th>
                    <th>Created By</th>
                </tr>
                </thead>
                <tbody>
                {inventory.map((rec) => (
                    <tr key={rec.id}>
                        <td>{rec.id}</td>
                        <td>{new Date(rec.createdAt).toLocaleString()}</td>
                        <td>{rec.createdBy}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryPage;