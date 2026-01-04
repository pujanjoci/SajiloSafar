import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Bus, Users, Map as MapIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { buses, bookings, routes } = useBooking();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/admin/buses" className="block">
                <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer border-l-4 border-l-blue-600 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Buses</p>
                            <h3 className="text-3xl font-bold text-gray-800">{buses.length}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Bus size={24} />
                        </div>
                    </div>
                </div>
            </Link>

            <Link to="/admin/bookings" className="block">
                <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer border-l-4 border-l-green-600 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Bookings</p>
                            <h3 className="text-3xl font-bold text-gray-800">{bookings.length}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                </div>
            </Link>

            <Link to="/admin/routes" className="block">
                <div className="bg-white p-6 rounded-xl shadow-sm cursor-pointer border-l-4 border-l-purple-600 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Active Routes</p>
                            <h3 className="text-3xl font-bold text-gray-800">{routes.length}</h3>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <MapIcon size={24} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AdminDashboard;
