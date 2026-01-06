import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const UserLayout = () => {
    const location = useLocation();

    // Hide footer on login pages
    const hideFooter = location.pathname === '/login' || location.pathname === '/admin/login';

    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            {!hideFooter && <Footer />}
        </div>
    );
};

export default UserLayout;
