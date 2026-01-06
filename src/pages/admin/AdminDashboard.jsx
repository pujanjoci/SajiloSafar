import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Bus, Map as MapIcon, Ticket, Wallet } from 'lucide-react';

const AdminDashboard = () => {
    const { buses, routes, bookings } = useBooking();

    // Calculate Stats
    const totalRevenue = bookings.reduce((sum, booking) => {
        const priceStr = booking.totalPrice ? String(booking.totalPrice) : '0';
        return sum + parseInt(priceStr.replace(/,/g, '') || 0);
    }, 0);
    const totalBuses = buses.length;
    const activeRoutes = routes.length;
    const totalBookings = bookings.length;

    const stats = [
        {
            label: 'Total Revenue',
            value: `NPR ${totalRevenue.toLocaleString()}`,
            icon: Wallet,
            color: 'bg-emerald-500',
            trend: '+12.5%',
            trendUp: true
        },
        {
            label: 'Total Bookings',
            value: totalBookings,
            icon: Ticket,
            color: 'bg-blue-500',
            trend: '+8.2%',
            trendUp: true
        },
        {
            label: 'Active Routes',
            value: activeRoutes,
            icon: MapIcon,
            color: 'bg-purple-500',
            trend: '+2.4%',
            trendUp: true
        },
        {
            label: 'Fleet Size',
            value: totalBuses,
            icon: Bus,
            color: 'bg-orange-500',
            trend: 'Stable',
            trendUp: true
        }
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <div className="flex items-center mt-2 text-xs">
                                <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                                    {stat.trend}
                                </span>
                                <span className="text-gray-400 ml-2">from last month</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                            <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Placeholder (Can be expanded later) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="p-6 text-center text-gray-500 py-12">
                    <p>Booking table will be refactored in the next step.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
