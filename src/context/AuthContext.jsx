/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = 'http://localhost/sajilo-safar/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check session on mount and when user state changes
    useEffect(() => {
        // Always check on mount
        checkSession();
    }, []);

    useEffect(() => {
        // Only set up periodic check if user is logged in
        if (user) {
            const interval = setInterval(checkSession, 60000);
            return () => clearInterval(interval);
        }
    }, [user]);

    const checkSession = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/session.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Important for sending cookies
            });

            const data = await response.json();

            if (response.ok && data.authenticated) {
                const userData = {
                    ...data.user,
                    isAdmin: data.user.role === 'admin' || data.user.isAdmin
                };
                setUser(userData);
            } else {
                // Session expired or invalid
                if (user) {
                    // Only clear if we thought we were logged in
                    setUser(null);
                    localStorage.removeItem('user'); // Clean up legacy
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Session check error:', error);
            setLoading(false);
        }
    };

    // Login function (handles both user and admin based on response)
    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for receiving cookies
            });

            const data = await response.json();

            if (response.ok) {
                const userData = {
                    ...data.user,
                    isAdmin: data.user.role === 'admin' || data.user.isAdmin
                };
                
                setUser(userData);
                return { success: true, user: userData, message: 'Login successful' };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    // Admin login specific wrapper
    const adminLogin = async (username, password) => {
        const result = await login(username, password);
        if (result.success) {
            if (result.user.isAdmin || result.user.role === 'admin') {
                return result;
            } else {
                logout(); // Log out if not admin
                return { success: false, message: 'Access denied. Admin privileges required.' };
            }
        }
        return result;
    };

    // User registration
    const register = async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, message: data.message || 'Registration successful! Please login.' };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    };

    const updateProfile = async (updatedData) => {
        // ... (Update profile logic needs API endpoint, for now keep as is or stub)
        // Since we are moving to backend, this should likely call an API too.
        // For this step, I will leave it but warn it might not persist to DB without an endpoint.
        // TODO: Create update_profile.php if needed.
        return { success: false, message: "Profile update not implemented in API yet." };
    };

    const logout = async () => {
        try {
             await fetch(`${API_BASE_URL}/logout.php`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Logout error", error);
        }
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('pendingSearch');
    };


    const isAdmin = () => {
        return user?.role === 'admin' || user?.isAdmin === true;
    };

    const isAuthenticated = () => {
        return !!user;
    };

    // Helper function to require login and store pending action
    const requireLogin = (pendingData = null) => {
        if (pendingData) {
            sessionStorage.setItem('pendingAction', JSON.stringify(pendingData));
        }
        sessionStorage.setItem('loginRequired', 'true');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            adminLogin,
            logout,
            register,
            updateProfile,
            requireLogin,
            isAuthenticated: isAuthenticated(),
            isAdmin: isAdmin(),
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};