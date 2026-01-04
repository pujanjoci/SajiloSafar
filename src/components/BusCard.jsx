import React from 'react';
import { MapPin, Clock, Armchair } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusCard = ({ bus }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{bus.name}</h3>
                        <span className="inline-block mt-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                            {bus.type}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">NPR {bus.price}</p>
                        <p className="text-sm text-gray-500">per seat</p>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-3 text-gray-400" />
                        <span>{bus.departureTime} - {bus.arrivalTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                        <span>{bus.route}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Armchair className="w-5 h-5 mr-3 text-gray-400" />
                        <span>{bus.seatsAvailable} seats available</span>
                    </div>
                </div>

                <Link
                    to={`/book/${bus.id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                >
                    Select Seats
                </Link>
            </div>
        </div>
    );
};

export default BusCard;
