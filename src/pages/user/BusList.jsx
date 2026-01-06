import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import BusCard from '../../components/BusCard';
import Loader from '../../components/common/Loader';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const BusList = () => {
    const { searchParams, searchBuses } = useBooking();
    const { isAuthenticated, requireLogin } = useAuth();
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routeParams, setRouteParams] = useState({ from: '', to: '', date: '' });

    const location = useLocation();
    const navigate = useNavigate();

    // Check authentication first
    useEffect(() => {
        if (!isAuthenticated) {
            // Store the search params for after login
            const searchParams = new URLSearchParams(location.search);
            const from = searchParams.get('from') || '';
            const to = searchParams.get('to') || '';
            const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

            if (from && to) {
                sessionStorage.setItem('pendingSearch', JSON.stringify({ from, to, date }));
            }

            requireLogin();
            navigate('/login');
        }
    }, [isAuthenticated, location.search, requireLogin, navigate]);

    useEffect(() => {
        // Parse query parameters from URL
        const searchParams = new URLSearchParams(location.search);
        const from = searchParams.get('from') || '';
        const to = searchParams.get('to') || '';
        const date = searchParams.get('date') || searchParams.date || new Date().toISOString().split('T')[0];

        setRouteParams({ from, to, date });
    }, [location.search]);

    useEffect(() => {
        if (!routeParams.from || !routeParams.to) {
            setLoading(false);
            return;
        }

        // Simulate API delay
        const timer = setTimeout(() => {
            const results = searchBuses(routeParams.from, routeParams.to, routeParams.date);
            setFilteredBuses(results);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [routeParams, searchBuses]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-8">
                    {routeParams.from && routeParams.to ? (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Buses from {routeParams.from} to {routeParams.to}
                            </h1>
                            <div className="flex items-center gap-4 mt-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Route: {routeParams.from} → {routeParams.to}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Date: {routeParams.date}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 mt-2">Select a bus for your journey.</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">Find a Bus</h1>
                            <p className="text-red-500 mt-2 font-medium">Please select a route (From & To) to view available buses.</p>
                            <Link to="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline">
                                Go to Home to Search
                            </Link>
                        </>
                    )}
                </div>

                {(!routeParams.from || !routeParams.to) ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No Route Selected</h3>
                        <p className="text-gray-500 mt-2">Please go back to the home page and select your origin and destination.</p>
                        <Link to="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline">
                            Go to Home Page
                        </Link>
                    </div>
                ) : filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBuses.map(bus => (
                            <BusCard key={bus.id} bus={bus} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <div className="text-6xl mb-4">🚌</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Buses Found</h3>
                        <p className="text-gray-500">
                            No buses available from {routeParams.from} to {routeParams.to} on {routeParams.date}
                        </p>
                        <Link to="/" className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline">
                            Search Again
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusList;