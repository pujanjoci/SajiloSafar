import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Plus, Trash2 } from 'lucide-react';

const ManageBuses = () => {
    const { buses, addBus, deleteBus } = useBooking();
    const [showAddBusModal, setShowAddBusModal] = useState(false);

    // Form state for new bus
    const [newBus, setNewBus] = useState({
        name: '',
        type: 'Standard',
        route: '',
        price: '',
        totalSeats: 30,
        departureTime: '',
        arrivalTime: ''
    });

    const handleAddBus = (e) => {
        e.preventDefault();
        addBus({
            ...newBus,
            seatsAvailable: newBus.totalSeats, // Default available seats
            amenities: ["AC", "WiFi"], // Default amenities
            rating: 4.5
        });
        setShowAddBusModal(false);
        setNewBus({
            name: '', type: 'Standard', route: '', price: '', totalSeats: 30, departureTime: '', arrivalTime: ''
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Manage Buses</h3>
                <button
                    onClick={() => setShowAddBusModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus size={18} />
                    Add Bus
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bus Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Route</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Time</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {buses.map(bus => (
                            <tr key={bus.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{bus.name}</td>
                                <td className="px-6 py-4 text-gray-600">{bus.route}</td>
                                <td className="px-6 py-4 text-gray-600">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold uppercase">{bus.type}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-800 font-medium">NPR {bus.price}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{bus.departureTime}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => { if (window.confirm('Delete bus?')) deleteBus(bus.id) }}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Bus Modal */}
            {showAddBusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Add New Bus</h3>
                        <form onSubmit={handleAddBus} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Bus Name</label>
                                <input required type="text" className="w-full border p-2 rounded" value={newBus.name} onChange={e => setNewBus({ ...newBus, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Route</label>
                                    <input required type="text" className="w-full border p-2 rounded" value={newBus.route} onChange={e => setNewBus({ ...newBus, route: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Type</label>
                                    <select className="w-full border p-2 rounded" value={newBus.type} onChange={e => setNewBus({ ...newBus, type: e.target.value })}>
                                        <option>Standard</option>
                                        <option>Deluxe</option>
                                        <option>Luxury</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Price (NPR)</label>
                                    <input required type="number" className="w-full border p-2 rounded" value={newBus.price} onChange={e => setNewBus({ ...newBus, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Seats</label>
                                    <input required type="number" className="w-full border p-2 rounded" value={newBus.totalSeats} onChange={e => setNewBus({ ...newBus, totalSeats: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Departure</label>
                                    <input required type="time" className="w-full border p-2 rounded" value={newBus.departureTime} onChange={e => setNewBus({ ...newBus, departureTime: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Arrival</label>
                                    <input required type="time" className="w-full border p-2 rounded" value={newBus.arrivalTime} onChange={e => setNewBus({ ...newBus, arrivalTime: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowAddBusModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Bus</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBuses;
