import React, { createContext, useState, useContext } from 'react';
import { buses as initialBuses } from '../data/buses';
import { bookings as initialBookings } from '../data/bookings';
import { routes } from '../data/routes';

/* eslint-disable react-refresh/only-export-components */
const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [buses, setBuses] = useState(initialBuses);
    const [bookings, setBookings] = useState(initialBookings);
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        date: ''
    });

    const searchBuses = (from, to, date) => {
        setSearchParams({ from, to, date });
        // In a real app, we would filter based on date too, 
        // but for this mock, we'll just filter by route
        return buses.filter(bus =>
            bus.route.toLowerCase().includes(from.toLowerCase()) &&
            bus.route.toLowerCase().includes(to.toLowerCase())
        );
    };

    const getBusById = (id) => {
        return buses.find(bus => bus.id === parseInt(id));
    };

    const getBookedSeats = (busId) => {
        // Return all seat numbers that are booked for this specific bus on this date
        // For simplicity in this demo, we're ignoring date validation for booked seats
        // to ensure some seats always look booked
        return bookings
            .filter(booking => booking.busId === parseInt(busId))
            .flatMap(booking => booking.seatNumbers);
    };

    const addBooking = (bookingDetails) => {
        const newBooking = {
            id: `BK-${Date.now()}`,
            ...bookingDetails,
            status: 'Confirmed'
        };
        setBookings(prev => [...prev, newBooking]);
        return newBooking;
    };

    const deleteBooking = (id) => {
        setBookings(prev => prev.filter(booking => booking.id !== id));
    };

    const addBus = (newBus) => {
        setBuses(prev => [...prev, { ...newBus, id: Date.now() }]);
    };

    const updateBus = (updatedBus) => {
        setBuses(prev => prev.map(bus => bus.id === updatedBus.id ? updatedBus : bus));
    };

    const deleteBus = (id) => {
        setBuses(prev => prev.filter(bus => bus.id !== id));
    };


    return (
        <BookingContext.Provider value={{
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
        }}>
            {children}
        </BookingContext.Provider>
    );
};
