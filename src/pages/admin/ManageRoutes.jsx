
import React from 'react';
import { useBooking } from '../../context/BookingContext';
import AdminTable from '../../components/admin/ui/AdminTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ManageRoutes = () => {
    const { routes } = useBooking();

    const columns = [
        {
            header: 'Origin',
            accessor: 'from',
            render: (route) => <span className="font-medium text-gray-900">{route.from}</span>
        },
        {
            header: 'Destination',
            accessor: 'to',
            render: (route) => <span className="font-medium text-gray-900">{route.to}</span>
        },
        {
            header: 'Type',
            accessor: 'type',
            render: (route) => <span className="capitalize">{route.type || 'Standard'}</span>
        },
        {
            header: 'Direction',
            accessor: 'direction'
        },
        {
            header: 'Status',
            accessor: 'isPopular',
            render: (route) => <StatusBadge status={route.isPopular ? 'Popular' : 'Standard'} type={route.isPopular ? 'success' : 'default'} />
        },
        {
            header: 'Actions',
            render: (route) => (
                <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage network connections and route details.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Add New Route
                </button>
            </div>

            <AdminTable
                columns={columns}
                data={routes}
                searchPlaceholder="Search routes by city..."
            />
        </div>
    );
};

export default ManageRoutes;

