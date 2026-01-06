// components/Routes.jsx
import React from 'react';
import { routes } from '../../data/routes';
import { cityImages } from '../../utils/cityImages';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext
import { MapPin, Navigation, ArrowRight } from 'lucide-react';

const Routes = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Get authentication status

    const handleRouteClick = (routeFrom, routeTo) => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Store the intended search in sessionStorage
            const today = new Date().toISOString().split('T')[0];
            sessionStorage.setItem('pendingSearch', JSON.stringify({
                from: routeFrom,
                to: routeTo,
                date: today
            }));
            // Redirect to login
            navigate('/login');
            return;
        }

        // If authenticated, navigate to buses with route parameters
        navigate(`/buses?from=${encodeURIComponent(routeFrom)}&to=${encodeURIComponent(routeTo)}&date=${encodeURIComponent(today)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Popular <span className="text-blue-600">Routes</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our network of destinations connecting major cities across Nepal.
                        Choose your journey and travel with comfort.
                    </p>
                </div>

                {/* Routes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {routes.map((route) => {
                        const originImage = cityImages[route.from] || cityImages['Unknown'];
                        const destinationImage = cityImages[route.to] || cityImages['Unknown'];
                        const today = new Date().toISOString().split('T')[0];

                        return (
                            <div
                                key={route.id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                                onClick={() => handleRouteClick(route.from, route.to)}
                            >
                                {/* Image Split Header */}
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gray-900/20 z-10 group-hover:bg-gray-900/10 transition-colors" />

                                    {/* Left Image (Origin) */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${originImage})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                                    </div>

                                    {/* Right Image (Destination) */}
                                    <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${destinationImage})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
                                    </div>

                                    {/* Center Connector Icon */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                        <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Navigation className="w-5 h-5 text-blue-600 transform rotate-90" />
                                        </div>
                                    </div>

                                    {/* City Labels Overlay */}
                                    <div className="absolute bottom-3 left-3 z-20">
                                        <span className="text-white font-bold text-sm drop-shadow-md">{route.from}</span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 z-20">
                                        <span className="text-white font-bold text-sm drop-shadow-md">{route.to}</span>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                                            <MapPin className="w-5 h-5 text-blue-500" />
                                            <span>{route.from}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400" />
                                        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                                            <MapPin className="w-5 h-5 text-green-500" />
                                            <span>{route.to}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Daily Services</span>
                                        <span className="text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center">
                                            View Buses <ArrowRight className="w-4 h-4 ml-1" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Routes;