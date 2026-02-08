import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Bus,
    Map as MapIcon,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Ticket
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const navItems = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/buses', label: 'Bus Management', icon: Bus },
        { to: '/admin/routes', label: 'Route Management', icon: MapIcon },
        { to: '/admin/bookings', label: 'Bookings', icon: Ticket },
        { to: '/admin/users', label: 'Users', icon: Users },
    ];

    return (
        <aside className={`
            fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col transition-transform duration-300 z-50 shadow-2xl
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
            {/* Logo Area */}
            <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Bus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Sajilo Admin</h1>
                        <p className="text-xs text-slate-400">Management Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => window.innerWidth < 1024 && onClose && onClose()}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                            ${isActive
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
                        `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-slate-700/50 space-y-3">
                {user && (
                    <div className="px-3 py-2 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400">Logged in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.name || user.email}</p>
                    </div>
                )}
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-500/20 hover:border-red-500/40"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
