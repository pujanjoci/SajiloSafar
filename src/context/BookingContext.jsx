import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { buses as initialBuses, calculateRoutePrice } from '../data/buses'; // Keeping imports for helpers if needed, but data will be overwritten
import { bookings as initialBookings } from '../data/bookings';
import { routes as initialRoutes } from '../data/routes';

const BookingContext = createContext();

const API_BASE_URL = 'http://localhost/sajilo-safar/api';

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export const BookingProvider = ({ children }) => {
    // Initialize with empty arrays to indicate loading, or static data as fallback
    // Better to use empty arrays and a loading state
    const [buses, setBuses] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: ''
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch Buses
            const busesRes = await fetch(`${API_BASE_URL}/buses.php`);
            if (!busesRes.ok) throw new Error('Failed to fetch buses');
            const busesData = await busesRes.json();
            
            // Fetch Routes
            const routesRes = await fetch(`${API_BASE_URL}/routes.php`);
            if (!routesRes.ok) throw new Error('Failed to fetch routes');
            const routesData = await routesRes.json();

            // Fetch Bookings
            const bookingsRes = await fetch(`${API_BASE_URL}/bookings.php`);
            if (!bookingsRes.ok) throw new Error('Failed to fetch bookings');
            const bookingsData = await bookingsRes.json();

            setBuses(busesData);
            setRoutes(routesData);
            setBookings(bookingsData);
            setError(null);
        } catch (err) {
            console.error("API Error:", err);
            setError(err.message);
            // Fallback to static data if API fails (optional, for development stability)
             setBuses(initialBuses);
             setRoutes(initialRoutes);
             setBookings(initialBookings);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const searchBuses = useCallback((from, to, date) => {
        setSearchParams({ from, to, date });

        const selectedRoute = routes.find(
            r => r.from.toLowerCase() === from.toLowerCase() &&
                r.to.toLowerCase() === to.toLowerCase()
        );

        if (!selectedRoute) return [];

        return buses.filter(bus => {
            const rules = bus.rules || {};

            // Apply business rules
            if (rules.allowedDestinations &&
                !rules.allowedDestinations.includes(selectedRoute.to)) {
                return false;
            }

            if (rules.allowedTypes &&
                !rules.allowedTypes.includes(selectedRoute.type)) {
                return false;
            }

            if (rules.allowedDirections &&
                !rules.allowedDirections.includes(selectedRoute.direction)) {
                return false;
            }
            
             // Check if bus services this specific route area
            // Using logic similar to calculateRoutePrice helper
            // However, the original logic in searchBuses only checked rules. 
            // We should arguably also check serviceAreas if that's how it was intended, 
            // but sticking to original logic for now to minimize regression.

            return true;
        });
    }, [buses, routes]);

    const getBusById = useCallback((id) => {
        return buses.find(bus => bus.id === parseInt(id));
    }, [buses]);

    const getBookedSeats = useCallback((busId, date = null) => {
        const filteredBookings = bookings.filter(
            booking => booking.busId === parseInt(busId)
        );

        if (date) {
            // Filter by date if provided
            return filteredBookings
                .filter(booking => booking.date === date)
                .flatMap(booking => booking.seatNumbers);
        }

        // For demo, return seats from all bookings for this bus
        return filteredBookings.flatMap(booking => booking.seatNumbers);
    }, [bookings]);

    const addBooking = useCallback((bookingDetails) => {
        // TODO: Persist to Server via POST
        const newBooking = {
            id: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            status: 'Confirmed',
            ...bookingDetails
        };

        setBookings(prev => [newBooking, ...prev]);
        return newBooking;
    }, []);

    const deleteBooking = useCallback((id) => {
         // TODO: Persist to Server via DELETE
        setBookings(prev => prev.filter(booking => booking.id !== id));
    }, []);

    const addBus = useCallback((newBus) => {
         // TODO: Persist to Server via POST
        setBuses(prev => [...prev, {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...newBus
        }]);
    }, []);

    const updateBus = useCallback((updatedBus) => {
         // TODO: Persist to Server via PUT
        setBuses(prev => prev.map(
            bus => bus.id === updatedBus.id ? updatedBus : bus
        ));
    }, []);

    const deleteBus = useCallback((id) => {
         // TODO: Persist to Server via DELETE
        setBuses(prev => prev.filter(bus => bus.id !== id));
    }, []);

    const value = {
        buses,
        routes,
        bookings,
        loading,
        error,
        searchParams,
        searchBuses,
        getBusById,
        getBookedSeats,
        addBooking,
        deleteBooking,
        addBus,
        updateBus,
        deleteBus,
        refreshData: fetchData
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};