import React, { useEffect, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import BusCard from '../../components/BusCard';
import Loader from '../../components/common/Loader';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const BusList = () => {
    const { searchParams, searchBuses } = useBooking();
    const [filteredBuses, setFilteredBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            const results = searchBuses(searchParams.from, searchParams.to, searchParams.date);
            setFilteredBuses(results);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchParams, searchBuses]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                            <MapPin className="text-blue-600" />
                            <span>{searchParams.from || 'Anywhere'}</span>
                            <ArrowRight className="text-gray-400" />
                            <span>{searchParams.to || 'Anywhere'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                            <Calendar className="w-5 h-5" />
                            <span>{searchParams.date || 'Any Date'}</span>
                        </div>
                    </div>
                </div>

                {filteredBuses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBuses.map(bus => (
                            <BusCard key={bus.id} bus={bus} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <div className="text-6xl mb-4">🚌</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Buses Found</h3>
                        <p className="text-gray-500">Try changing your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusList;
