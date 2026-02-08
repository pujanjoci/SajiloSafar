import React, { useState, useEffect } from 'react';
// import { useBooking } from '../../context/BookingContext';
import AdminTable from '../../components/admin/ui/AdminTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

const ManageBuses = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const response = await fetch('http://localhost/sajilo-safar/api/buses.php');
            if (!response.ok) throw new Error('Failed to fetch buses');
            const data = await response.json();
            setBuses(data);
        } catch (error) {
            console.error('Error fetching buses:', error);
            setError('Failed to load buses');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            // TODO: Implement delete API endpoint
            console.log('Delete bus', id);
            // setBuses(buses.filter(bus => bus.id !== id));
        }
    };

    const columns = [
        {
            header: 'Bus Detail',
            accessor: 'name',
            render: (bus) => (
                <div>
                    <div className="font-semibold text-gray-900">{bus.name}</div>
                    <div className="text-xs text-gray-500">{bus.company}</div>
                </div>
            )
        },
        { header: 'Plate Number', accessor: 'busNumber' },
        {
            header: 'Type',
            accessor: 'type',
            render: (bus) => <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">{bus.type}</span>
        },
        {
            header: 'Seats',
            accessor: 'totalSeats',
            render: (bus) => (
                <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-900">{bus.seatsAvailable}</span>
                    <span className="text-gray-400">/ {bus.totalSeats}</span>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (bus) => <StatusBadge status={bus.seatsAvailable > 0 ? 'Active' : 'Full'} />
        },
        {
            header: 'Actions',
            render: (bus) => (
                <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(bus.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                    >
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
                    <h1 className="text-2xl font-bold text-gray-900">Bus Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your fleet, add new buses, and update details.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add New Bus
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading buses...</div>
            ) : error ? (
                <div className="p-8 text-center text-red-500">{error}</div>
            ) : (
                <AdminTable
                    data={buses}
                    columns={columns}
                    searchPlaceholder="Search buses..."
                />
            )}
        </div>
    );
};

export default ManageBuses;
