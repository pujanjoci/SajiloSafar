import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Search, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();
    const { routes, searchBuses } = useBooking();
    const { isAuthenticated, requireLogin } = useAuth();
    const { info } = useToast();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    // Safely get locations from routes
    const locations = routes && Array.isArray(routes)
        ? [...new Set(routes.map(r => r.from).filter(Boolean))]
        : ['Kathmandu', 'Pokhara', 'Chitwan', 'Kakarvitta', 'Lumbini'];

    const popularRoutes = routes.filter(route => route.isPopular).slice(0, 3);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!from || !to || !date) {
            alert('Please fill in all fields');
            return;
        }

        // Check if user is authenticated
        if (!isAuthenticated) {
            // Show toast notification
            info('Please login to search for buses');

            // Store search parameters
            const searchParams = { from, to, date };
            requireLogin(searchParams);

            // Navigate to login
            navigate('/login');
            return;
        }

        // If authenticated, proceed with search
        if (searchBuses) {
            searchBuses(from, to, date);
        }

        // Navigate with query parameters
        navigate(`/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`);
    };

    // Function to handle popular route clicks
    const handlePopularRouteClick = (routeFrom, routeTo) => {
        setFrom(routeFrom);
        setTo(routeTo);
        const today = new Date().toISOString().split('T')[0];
        setDate(today);

        // Optional: Immediately navigate when clicking popular routes
        // Uncomment this code if you want to navigate directly on popular route click
        /*
        if (!isAuthenticated) {
            info('Please login to view available buses');
            const searchParams = { from: routeFrom, to: routeTo, date: today };
            requireLogin(searchParams);
            navigate('/login');
            return;
        }
        navigate(`/buses?from=${encodeURIComponent(routeFrom)}&to=${encodeURIComponent(routeTo)}&date=${encodeURIComponent(today)}`);
        */
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
            {/* Navbar Spacer */}
            <div className="h-16"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-blue-300 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="grid grid-cols-6 grid-rows-6 h-full opacity-5">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="border border-white/10"></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
                <div className="h-[calc(100vh-8rem)] flex flex-col">
                    <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-8 lg:py-0">
                        {/* Left Content */}
                        <div className="lg:w-1/2 text-center lg:text-left px-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
                                Journey Across{' '}
                                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                                    Nepal
                                </span>
                                <br />
                                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl block mt-2 lg:mt-4">with SajiloSafar</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 lg:mb-10 leading-relaxed max-w-xl">
                                Experience comfortable, reliable bus journeys across Nepal's beautiful landscapes.
                                Book your tickets in seconds.
                            </p>
                        </div>

                        {/* Right Content - Search Box */}
                        <div className="lg:w-1/2 w-full max-w-lg px-4 sm:px-0">
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl transform lg:translate-y-0">
                                <div className="mb-6 sm:mb-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Plan Your Journey</h2>
                                    <p className="text-sm sm:text-base text-gray-600">Find the perfect bus for your trip</p>
                                </div>

                                <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="relative group">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                From
                                            </div>
                                            <select
                                                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-900 font-medium hover:border-gray-300 cursor-pointer text-sm sm:text-base"
                                                value={from}
                                                onChange={(e) => setFrom(e.target.value)}
                                                required
                                            >
                                                <option value="" className="text-gray-500">Select origin city</option>
                                                {locations.map((loc, index) => (
                                                    <option key={index} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                            <MapPin className="absolute left-3 sm:left-4 top-9 sm:top-10 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>

                                        <div className="relative group">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                <MapPin className="w-4 h-4" />
                                                To
                                            </div>
                                            <select
                                                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-gray-900 font-medium hover:border-gray-300 cursor-pointer text-sm sm:text-base"
                                                value={to}
                                                onChange={(e) => setTo(e.target.value)}
                                                required
                                            >
                                                <option value="" className="text-gray-500">Select destination city</option>
                                                {locations
                                                    .filter(l => l !== from)
                                                    .map((loc, index) => (
                                                        <option key={index} value={loc}>{loc}</option>
                                                    ))}
                                            </select>
                                            <MapPin className="absolute left-3 sm:left-4 top-9 sm:top-10 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>

                                        <div className="relative group">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                <Calendar className="w-4 h-4" />
                                                Travel Date
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium hover:border-gray-300 cursor-pointer text-sm sm:text-base"
                                                value={date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                            <Calendar className="absolute left-3 sm:left-4 top-9 sm:top-10 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base"
                                    >
                                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                                        <span>Find a Bus</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>

                                {/* Popular Destinations Quick Links */}
                                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Popular destinations:</p>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {popularRoutes.map((route, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => handlePopularRouteClick(route.from, route.to)}
                                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                {route.from} → {route.to}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;