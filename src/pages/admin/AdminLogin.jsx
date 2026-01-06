import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { error: showError, success, info } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    // Check for redirect on mount - show toast only if redirected
    useEffect(() => {
        const loginRequired = sessionStorage.getItem('loginRequired');
        const fromProtectedRoute = location.state?.fromProtectedRoute;

        if (loginRequired || fromProtectedRoute) {
            info('Please login to continue');

            // Clear flags immediately
            sessionStorage.removeItem('loginRequired');

            if (fromProtectedRoute) {
                window.history.replaceState({}, document.title);
            }
        }
    }, []); // Run only once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(username, password, true); // true for admin login

        if (result.success) {
            success('Login successful!');

            // Check if there was an intended path
            const intendedPath = location.state?.intendedPath || '/admin/dashboard';

            setTimeout(() => {
                navigate(intendedPath);
            }, 500);
        } else {
            showError(result.message || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage the system</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <User size={20} />
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <Lock size={20} />
                            </span>
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
