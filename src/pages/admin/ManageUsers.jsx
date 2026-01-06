import React from 'react';
import AdminTable from '../../components/admin/ui/AdminTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import { MoreVertical, Shield } from 'lucide-react';

const ManageUsers = () => {
    // Mock Data for users
    const users = [
        { id: 1, name: 'Pujan Josi', email: 'pujan@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
        { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', joinDate: '2023-03-10' },
        { id: 4, name: 'Bus Company A', email: 'compA@example.com', role: 'Partner', status: 'Active', joinDate: '2023-01-20' },
        { id: 5, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Blocked', joinDate: '2023-04-05' },
    ];

    const columns = [
        {
            header: 'User',
            accessor: 'name',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Role',
            accessor: 'role',
            render: (user) => (
                <div className="flex items-center gap-1">
                    {user.role === 'Admin' && <Shield className="w-3 h-3 text-blue-600" />}
                    <span className="text-gray-700">{user.role}</span>
                </div>
            )
        },
        { header: 'Joined', accessor: 'joinDate' },
        {
            header: 'Status',
            accessor: 'status',
            render: (user) => <StatusBadge status={user.status} />
        },
        {
            header: 'Actions',
            render: () => (
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </button>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage platform users, roles, and permissions.</p>
                </div>
            </div>

            <AdminTable
                columns={columns}
                data={users}
                searchPlaceholder="Search users..."
            />
        </div>
    );
};

export default ManageUsers;
