import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import UserLayout from '../components/common/UserLayout';
import AdminLayout from '../components/admin/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// User Pages
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import RoutesPage from '../pages/user/Routes';
import Contact from '../pages/user/Contact';
import BusList from '../pages/user/BusList';
import SeatSelection from '../pages/user/SeatSelection';
import BookingSummary from '../pages/user/BookingSummary';
import MyTickets from '../pages/user/MyTickets';
import Login from '../pages/user/Login';

// Admin Pages
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageBuses from '../pages/admin/ManageBuses';
import ManageBookings from '../pages/admin/ManageBookings';
import ManageRoutes from '../pages/admin/ManageRoutes';
import ManageUsers from '../pages/admin/ManageUsers';

const AppRoutes = () => {
    return (
        <Routes>
            {/* User Routes - Wrapped in UserLayout */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/buses" element={<BusList />} />
                <Route path="/book/:id" element={<SeatSelection />} />
                <Route path="/booking-summary" element={<BookingSummary />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-tickets" element={<MyTickets />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes - Protected and Wrapped in AdminLayout */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/buses" element={<ManageBuses />} />
                    <Route path="/admin/bookings" element={<ManageBookings />} />
                    <Route path="/admin/routes" element={<ManageRoutes />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                </Route>
            </Route>

            <Route path="*" element={<div className="p-8 text-center text-xl">404 - Page Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;
