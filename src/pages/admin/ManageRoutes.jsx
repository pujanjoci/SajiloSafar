import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { MapPin } from 'lucide-react';

const ManageRoutes = () => {
    const { routes } = useBooking();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Available Routes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Route ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Origin</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Destination</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {routes.map(route => (
                            <tr key={route.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">#{route.id}</td>
                                <td className="px-6 py-4 text-gray-800 font-medium">
                                    <div className='flex items-center gap-2'>
                                        <MapPin size={16} className="text-red-500" />
                                        {route.from}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-800 font-medium">
                                    <div className='flex items-center gap-2'>
                                        <MapPin size={16} className="text-green-500" />
                                        {route.to}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold uppercase">Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRoutes;
