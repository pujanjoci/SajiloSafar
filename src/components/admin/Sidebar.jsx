import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Bus,
    Map as MapIcon,
    Users,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';
import { Ticket } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/buses', label: 'Bus Management', icon: Bus },
        { to: '/admin/routes', label: 'Route Management', icon: MapIcon },
        { to: '/admin/bookings', label: 'Bookings', icon: Ticket },
        { to: '/admin/users', label: 'Users', icon: Users },
        // { to: '/admin/reports', label: 'Reports', icon: BarChart3 }, // Scope for future
        // { to: '/admin/settings', label: 'Settings', icon: Settings }, // Scope for future
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col transition-all duration-300 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Sajilo Admin</h1>
                        <p className="text-xs text-slate-400">Management Portal</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
                            ${isActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                        `}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
