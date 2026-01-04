import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
            <AdminHeader />
            <main className="container mx-auto px-4 py-6 flex-grow">
                <Outlet />
            </main>
            <div className="bg-white border-t py-4 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} SajiloSafar Admin Panel
            </div>
        </div>
    );
};

export default AdminLayout;
