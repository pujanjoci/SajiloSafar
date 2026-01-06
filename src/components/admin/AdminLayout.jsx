import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <TopBar />

            {/* Main Content Area */}
            <main className="pl-64 pt-16 min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
