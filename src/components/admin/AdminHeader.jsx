import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LayoutDashboard, Bus, Map as MapIcon, Users } from 'lucide-react';

const AdminHeader = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <header className="bg-white shadow-sm mb-8">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link to="/admin/dashboard" className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <div className="bg-blue-600 text-white p-1 rounded">Sajilo</div>
                        Safar
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition">
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <Link to="/admin/buses" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition">
                            <Bus size={18} /> Buses
                        </Link>
                        <Link to="/admin/bookings" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition">
                            <Users size={18} /> Bookings
                        </Link>
                        <Link to="/admin/routes" className="text-gray-600 hover:text-blue-600 flex items-center gap-1 font-medium transition">
                            <MapIcon size={18} /> Routes
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 hidden sm:block">
                        Welcome, {user?.username}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition text-sm font-medium"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
