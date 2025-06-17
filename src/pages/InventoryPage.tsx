import React from 'react';
import { useInventory } from '../hooks/admin';    // or your useQuery hook
import InventoryTable from '../components/InventoryTable';
import '../styles/InventoryPage.css';

const InventoryPage: React.FC = () => {
    const { data: inventory, isLoading } = useInventory();

    if (isLoading) return <div className="admin-portal">Loading...</div>;

    return (
        <div className="admin-portal">
            <InventoryTable data={inventory!} />
        </div>
    );
};

export default InventoryPage;