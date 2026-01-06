import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or a proper Loader component
    }

    // If not authenticated, redirect to login with state indicating this was a protected route access
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ fromProtectedRoute: true, intendedPath: location.pathname }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
