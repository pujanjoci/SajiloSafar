import React from 'react';
import { useLocation } from 'react-router-dom';
import { User, Menu } from 'lucide-react';

const TopBar = ({ onMenuClick }) => {
    const location = useLocation();

    const getPageTitle = (pathname) => {
        const path = pathname.split('/').pop();
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 lg:left-64 z-40 px-4 lg:px-8 flex items-center justify-between transition-all duration-300">
            {/* Page Title & Menu Toggle */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                    {getPageTitle(location.pathname)}
                </h2>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-semibold text-gray-900">Admin User</div>
                        <div className="text-xs text-gray-500">Super Admin</div>
                    </div>
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white ring-2 ring-gray-100">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
