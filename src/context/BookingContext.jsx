import React, { createContext, useState, useContext, useCallback } from 'react';
import { buses as initialBuses } from '../data/buses';
import { bookings as initialBookings } from '../data/bookings';
import { routes } from '../data/routes';

const BookingContext = createContext();

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
};

export const BookingProvider = ({ children }) => {
    const [buses, setBuses] = useState(initialBuses);
    const [bookings, setBookings] = useState(initialBookings);
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: ''
    });

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

            return true;
        });
    }, [buses]);

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
        setBookings(prev => prev.filter(booking => booking.id !== id));
    }, []);

    const addBus = useCallback((newBus) => {
        setBuses(prev => [...prev, {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...newBus
        }]);
    }, []);

    const updateBus = useCallback((updatedBus) => {
        setBuses(prev => prev.map(
            bus => bus.id === updatedBus.id ? updatedBus : bus
        ));
    }, []);

    const deleteBus = useCallback((id) => {
        setBuses(prev => prev.filter(bus => bus.id !== id));
    }, []);

    const value = {
        buses,
        routes,
        bookings,
        searchParams,
        searchBuses,
        getBusById,
        getBookedSeats,
        addBooking,
        deleteBooking,
        addBus,
        updateBus,
        deleteBus
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};