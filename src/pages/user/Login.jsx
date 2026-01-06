// Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Bus, Mail, Lock, ArrowLeft, User, Phone, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register, isAuthenticated } = useAuth();
    const { info, success, error } = useToast();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Check for login prompt on component mount - ONLY show toast if redirected
    useEffect(() => {
        // Check if this is a redirect-based navigation (not manual)
        const loginRequired = sessionStorage.getItem('loginRequired');
        const fromProtectedRoute = location.state?.fromProtectedRoute;
        const hasPendingSearch = sessionStorage.getItem('pendingSearch');

        // Only show toast if user was redirected (not manual navigation)
        if (loginRequired || fromProtectedRoute || hasPendingSearch) {
            info('Please login to continue');

            // Clear the flag immediately to prevent showing toast again
            sessionStorage.removeItem('loginRequired');

            // Clear location state to prevent toast on page refresh
            if (fromProtectedRoute) {
                window.history.replaceState({}, document.title);
            }
        }
    }, []); // Run only once on mount


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!formData.email || !formData.password) {
            error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password, false);

            if (result.success) {
                success('Login successful!');

                // Check for pending search
                const pendingSearch = sessionStorage.getItem('pendingSearch');

                if (pendingSearch) {
                    const searchData = JSON.parse(pendingSearch);
                    sessionStorage.removeItem('pendingSearch');

                    // Navigate to buses with search parameters
                    setTimeout(() => {
                        navigate(`/buses?from=${encodeURIComponent(searchData.from)}&to=${encodeURIComponent(searchData.to)}&date=${encodeURIComponent(searchData.date)}`);
                    }, 500);
                } else {
                    // Navigate to home or dashboard
                    setTimeout(() => {
                        navigate('/');
                    }, 500);
                }
            } else {
                error(result.message || 'Invalid email or password');
            }
        } catch (err) {
            error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            error('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            error('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            error('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            if (result.success) {
                success(result.message || 'Registration successful! Please login to continue.');

                // Clear form
                setFormData({
                    email: formData.email, // Keep email for convenience
                    password: '',
                    name: '',
                    phone: '',
                    confirmPassword: ''
                });

                // Switch to login mode
                setTimeout(() => {
                    setIsLoginMode(true);
                }, 1000);
            } else {
                error(result.message || 'Registration failed');
            }
        } catch (err) {
            error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        if (isLoginMode) {
            handleLoginSubmit(e);
        } else {
            handleRegisterSubmit(e);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setFormData({
            email: '',
            password: '',
            name: '',
            phone: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl mb-4">
                            <Bus className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isLoginMode ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isLoginMode
                                ? 'Sign in to your SajiloSafar account'
                                : 'Join SajiloSafar for your journey across Nepal'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLoginMode && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="John Doe"
                                        required={!isLoginMode}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {!isLoginMode && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="98XXXXXXXX"
                                        required={!isLoginMode}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {!isLoginMode && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Must be at least 6 characters long
                                </p>
                            )}
                        </div>

                        {!isLoginMode && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="••••••••"
                                        required={!isLoginMode}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {isLoginMode && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? (isLoginMode ? 'Signing in...' : 'Creating account...')
                                : (isLoginMode ? 'Sign In' : 'Create Account')
                            }
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-center text-gray-600">
                            {isLoginMode
                                ? "Don't have an account? "
                                : "Already have an account? "
                            }
                            <button
                                onClick={toggleMode}
                                className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                            >
                                {isLoginMode ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    {!isLoginMode && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800 text-center">
                                <strong>Note for Development:</strong> User data is stored in localStorage.
                                For production, this should be replaced with a secure backend API.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;