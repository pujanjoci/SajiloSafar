import React from 'react';
import { useBooking } from '../../context/BookingContext';
import AdminTable from '../../components/admin/ui/AdminTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import { Eye, Edit2 } from 'lucide-react';

const ManageBookings = () => {
    const { bookings, deleteBooking } = useBooking();

    const columns = [
        {
            header: 'Booking ID',
            accessor: 'id',
            render: (booking) => <span className="font-mono text-xs text-gray-500">#{booking.id?.slice(0, 8)}</span>
        },
        {
            header: 'Customer',
            accessor: 'passengerName',
            render: (booking) => (
                <div>
                    <div className="font-medium text-gray-900">{booking.passengerName}</div>
                    <div className="text-xs text-gray-500">{booking.phoneNumber}</div>
                </div>
            )
        },
        {
            header: 'Bus Details',
            accessor: 'busName',
            render: (booking) => (
                <div>
                    <div className="text-gray-900">{booking.busName}</div>
                    <div className="text-xs text-gray-500">{booking.selectedSeats?.length} Seats • {booking.selectedSeats?.join(', ')}</div>
                </div>
            )
        },
        { header: 'Travel Date', accessor: 'date' },
        {
            header: 'Amount',
            accessor: 'totalPrice',
            render: (booking) => <span className="font-semibold text-gray-900">NPR {booking.totalPrice}</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (booking) => <StatusBadge status={booking.status || 'Confirmed'} />
        },
        {
            header: 'Actions',
            render: (booking) => (
                <div className="flex gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-500 text-sm mt-1">Track and manage customer reservations.</p>
                </div>
                {/* Export or Filter Actions could go here */}
            </div>

            <AdminTable
                columns={columns}
                data={bookings}
                searchPlaceholder="Search by name, ID..."
            />
        </div>
    );
};

export default ManageBookings;
