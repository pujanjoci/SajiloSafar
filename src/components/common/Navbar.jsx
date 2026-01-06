import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, User, LogIn, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSignInClick = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    // Auto-hide navbar on scroll
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        setIsAtTop(currentScrollY < 10);

        if (currentScrollY < 10) {
            setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    // Throttle scroll events
    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [handleScroll]);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/routes", label: "Routes" },
        { to: "/contact", label: "Contact" },
        { to: "/my-tickets", label: "My Tickets" },
    ];

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                    } ${isAtTop ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-xl font-bold text-gray-900 group"
                        >
                            <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-1.5 rounded-lg group-hover:from-blue-800 group-hover:to-blue-900 transition-all duration-300 transform group-hover:scale-105">
                                <Bus className="w-5 h-5" />
                            </div>
                            <span className="tracking-tight">Sajilo<span className="text-blue-700">Safar</span></span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-6 items-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-medium"
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="hidden sm:inline">{user?.name || user?.email || 'Account'}</span>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                            <Link
                                                to="/my-tickets"
                                                onClick={() => setShowUserMenu(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                My Tickets
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={handleSignInClick}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm font-medium group"
                                >
                                    <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    <span className="hidden sm:inline">Sign In</span>
                                </button>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`
            md:hidden fixed left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100
            transition-all duration-300 overflow-hidden
            ${isMobileMenuOpen
                            ? 'opacity-100 translate-y-0 visible'
                            : 'opacity-0 -translate-y-2 invisible'
                        }
          `}>
                        <div className="container mx-auto px-4 py-6">
                            <div className="flex flex-col space-y-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-base font-medium text-gray-700 hover:text-blue-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => {
                                            handleSignInClick();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-300 text-base font-medium"
                                    >
                                        <User className="w-5 h-5" />
                                        Sign In to Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from being hidden under fixed navbar */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;