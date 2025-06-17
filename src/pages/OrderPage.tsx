import React, { useEffect, useState } from 'react';
import { fetchOrderRecords, OrderRecord } from '../services/admin';
import '../styles/InventoryPage.css';

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [orderRes] = await Promise.all([
                    fetchOrderRecords(),
                ]);
                setOrders(orderRes);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div className="admin-portal">Loading...</div>;

    return (
        <div className="admin-portal">
            <h2>Order Records</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Created At</th>
                    <th>Created By</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>{order.createdBy}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderPage;