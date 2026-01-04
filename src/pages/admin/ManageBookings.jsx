import React from 'react';
import { useBooking } from '../../context/BookingContext';

const ManageBookings = () => {
    const { bookings } = useBooking();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bus ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Seats</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{booking.id}</td>
                                <td className="px-6 py-4 text-gray-800 font-medium">{booking.passengerName || 'User'} <br /><span className='text-xs text-gray-400 font-normal'>{booking.contactNumber}</span></td>
                                <td className="px-6 py-4 text-gray-600">#{booking.busId}</td>
                                <td className="px-6 py-4 text-gray-600">{booking.seatNumbers.join(', ')}</td>
                                <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
