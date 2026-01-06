/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminUsers } from '../data/adminUsers';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Function to get all registered users from localStorage
    const getRegisteredUsers = () => {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    };

    // Function to save registered users to localStorage
    const saveRegisteredUsers = (users) => {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    };

    // Admin login (hardcoded credentials)
    const adminLogin = (username, password) => {
        const admin = adminUsers.find(u => u.username === username && u.password === password);
        if (admin) {
            const { password: _, ...userWithoutPassword } = admin;
            const userData = { ...userWithoutPassword, role: 'admin', isAdmin: true };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, message: 'Invalid admin credentials' };
    };

    // Regular user login (checks against localStorage)
    const userLogin = (email, password) => {
        try {
            const registeredUsers = getRegisteredUsers();
            const user = registeredUsers.find(u => u.email === email && u.password === password);

            if (user) {
                const userData = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    role: 'user',
                    isAdmin: false,
                    token: `local_${Date.now()}` // Generate a local token
                };

                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('authToken', userData.token);

                return {
                    success: true,
                    user: userData,
                    message: 'Login successful'
                };
            } else {
                // Check if email exists but password is wrong
                const emailExists = registeredUsers.some(u => u.email === email);
                if (emailExists) {
                    return { success: false, message: 'Incorrect password' };
                }
                return { success: false, message: 'No account found with this email' };
            }
        } catch (error) {
            return { success: false, message: 'Login failed. Please try again.' };
        }
    };

    // Combined login function
    const login = async (identifier, password, isAdminLogin = false) => {
        if (isAdminLogin) {
            return adminLogin(identifier, password);
        } else {
            return userLogin(identifier, password);
        }
    };

    // User registration (stores in localStorage)
    const register = async (userData) => {
        try {
            const registeredUsers = getRegisteredUsers();

            // Check if email already exists
            const emailExists = registeredUsers.some(u => u.email === userData.email);
            if (emailExists) {
                return { success: false, message: 'Email already registered' };
            }

            // Create new user
            const newUser = {
                id: 'user_' + Date.now(),
                email: userData.email,
                name: userData.name,
                phone: userData.phone,
                password: userData.password, // Note: In production, never store plain passwords
                createdAt: new Date().toISOString()
            };

            // Save to registered users
            saveRegisteredUsers([...registeredUsers, newUser]);

            // Return success WITHOUT auto-login
            return {
                success: true,
                message: 'Registration successful! Please login to continue.'
            };

        } catch (error) {
            return { success: false, message: 'Registration failed. Please try again.' };
        }
    };

    // Update user profile
    const updateProfile = async (updatedData) => {
        try {
            if (!user) {
                return { success: false, message: 'No user logged in' };
            }

            const registeredUsers = getRegisteredUsers();
            const userIndex = registeredUsers.findIndex(u => u.id === user.id);

            if (userIndex === -1) {
                return { success: false, message: 'User not found' };
            }

            // Update user data
            registeredUsers[userIndex] = {
                ...registeredUsers[userIndex],
                ...updatedData,
                // Don't update password unless provided
                password: updatedData.password || registeredUsers[userIndex].password
            };

            saveRegisteredUsers(registeredUsers);

            // Update current user session
            const updatedUser = { ...user, ...updatedData };
            if (updatedData.password) {
                // If password was updated, also update it in the session user object
                updatedUser.password = updatedData.password;
            }

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return {
                success: true,
                user: updatedUser,
                message: 'Profile updated successfully'
            };

        } catch (error) {
            return { success: false, message: 'Update failed. Please try again.' };
        }
    };

    const logout = () => {
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