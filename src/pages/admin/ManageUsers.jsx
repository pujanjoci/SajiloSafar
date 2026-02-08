import React, { useState, useEffect, useRef } from 'react';
import AdminTable from '../../components/admin/ui/AdminTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import { MoreVertical, Shield, Edit, Trash2, UserCog } from 'lucide-react';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost/sajilo-safar/api/users.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users');
            setLoading(false);
        }
    };

    const handleToggleAdmin = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        const newIsAdmin = newRole === 'admin' ? 1 : 0;

        try {
            const response = await fetch(`http://localhost/sajilo-safar/api/users.php`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    id: userId, 
                    role: newRole,
                    is_admin: newIsAdmin
                })
            });

            if (response.ok) {
                fetchUsers(); // Refresh the list
                setOpenDropdown(null);
            } else {
                alert('Failed to update user role');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user role');
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost/sajilo-safar/api/users.php?id=${userId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                fetchUsers(); // Refresh the list
                setOpenDropdown(null);
            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    };

    const columns = [
        {
            header: 'User',
            accessor: 'name',
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Phone',
            accessor: 'phone',
            render: (user) => (
                <span className="text-gray-700">{user.phone || 'N/A'}</span>
            )
        },
        {
            header: 'Role',
            accessor: 'role',
            render: (user) => (
                <div className="flex items-center gap-2">
                    {(user.role === 'admin' || user.is_admin == 1) && (
                        <Shield className="w-4 h-4 text-blue-600" />
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' || user.is_admin == 1
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                        {user.role === 'admin' || user.is_admin == 1 ? 'Admin' : 'User'}
                    </span>
                </div>
            )
        },
        { 
            header: 'Joined', 
            accessor: 'created_at',
            render: (user) => (
                <span className="text-gray-600">
                    {new Date(user.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}
                </span>
            )
        },
        {
            header: 'Actions',
            render: (user) => (
                <div className="relative" ref={openDropdown === user.id ? dropdownRef : null}>
                    <button 
                        onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    {openDropdown === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                            <button
                                onClick={() => handleToggleAdmin(user.id, user.role)}
                                className="w-full px-4 py-2 text-left hover:bg-blue-50 flex items-center gap-3 text-sm transition-colors"
                            >
                                <UserCog className="w-4 h-4 text-blue-600" />
                                <span className="text-gray-700">
                                    {user.role === 'admin' || user.is_admin == 1 ? 'Remove Admin' : 'Make Admin'}
                                </span>
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.id, user.name)}
                                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-sm transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                                <span className="text-red-600 font-medium">Delete User</span>
                            </button>
                        </div>
                    )}
                </div>
            )
        }
    ];

    if (loading) return <div className="p-6 text-center text-gray-600">Loading users...</div>;
    if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">User Management</h1>
                    <p className="text-gray-600">Manage platform users, roles, and permissions.</p>
                </div>
                <div className="text-sm text-gray-500">
                    Total Users: <span className="font-bold text-gray-900">{users.length}</span>
                </div>
            </div>

            <AdminTable
                columns={columns}
                data={users}
                searchPlaceholder="Search users by name, email, or phone..."
            />
        </div>
    );
};

export default ManageUsers;
