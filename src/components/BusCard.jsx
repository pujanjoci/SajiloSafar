import React from 'react';
import { MapPin, Clock, Armchair, Users, Wifi, Snowflake, Zap, Navigation, Star, Bus, Tag, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BusCard = ({ bus, showRouteInfo = false, routeFrom = null, routeTo = null }) => {
    // Helper function to render amenities icons
    const renderAmenityIcon = (amenity, key) => {
        const amenityLower = amenity.toLowerCase();
        const icons = {
            wifi: <Wifi className="w-4 h-4" />,
            ac: <Snowflake className="w-4 h-4" />,
            charging: <Zap className="w-4 h-4" />,
            toilet: <Users className="w-4 h-4" />,
            'water bottle': <Zap className="w-4 h-4" />,
            blanket: <Users className="w-4 h-4" />,
            'dinner stop': <Users className="w-4 h-4" />
        };

        return (
            <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg" title={amenity}>
                {icons[amenityLower] || <Zap className="w-4 h-4" />}
                <span className="text-sm text-gray-700">{amenity}</span>
            </div>
        );
    };

    // Determine bus type class
    const getBusTypeClass = (type) => {
        if (type?.toLowerCase().includes('luxury') || type?.toLowerCase().includes('deluxe')) {
            return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
        }
        if (type?.toLowerCase().includes('vip') || type?.toLowerCase().includes('sleeper')) {
            return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
        }
        if (type?.toLowerCase().includes('semi')) {
            return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
        }
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    };

    // Format price range
    const formatPriceRange = () => {
        if (bus.minPrice && bus.maxPrice) {
            return (
                <div className="flex flex-col">
                    <div className="text-2xl font-bold text-green-600">
                        NPR {bus.minPrice} - {bus.maxPrice}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Price varies by route and season
                    </div>
                </div>
            );
        } else if (bus.basePrice) {
            return (
                <div className="flex flex-col">
                    <div className="text-2xl font-bold text-green-600">
                        Starting at NPR {bus.basePrice}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        Contact for specific route pricing
                    </div>
                </div>
            );
        } else if (bus.price) {
            return (
                <div className="text-2xl font-bold text-green-600">
                    NPR {bus.price}
                </div>
            );
        }
        return (
            <div className="text-lg font-medium text-gray-600">
                Price on request
            </div>
        );
    };

    return (
        <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-200 p-6">
            {/* Header with Bus Info */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Bus className="w-6 h-6 text-blue-600" />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{bus.name}</h3>
                            {bus.description && (
                                <p className="text-sm text-gray-500 mt-1 max-w-md">{bus.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-medium">{bus.company}</span>
                        <div className="mx-2">•</div>
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">{bus.busNumber}</span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    {/* Bus Type Badge */}
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${getBusTypeClass(bus.type)}`}>
                        {bus.type}
                    </span>

                    {/* Rating */}
                    {bus.rating && (
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="text-sm font-bold text-gray-900">{bus.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">/5</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Route Information - Only shown when showRouteInfo is true */}
            {showRouteInfo && routeFrom && routeTo && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-800">{routeFrom}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-gray-800">{routeTo}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Departure: {bus.departureTime || 'Flexible'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Arrival: {bus.arrivalTime || 'Flexible'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Duration: {bus.duration || 'Varies'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Amenities Section */}
            {bus.amenities && bus.amenities.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium text-gray-700">Amenities</div>
                        <div className="text-xs text-gray-500">
                            {bus.amenities.length} amenities
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {bus.amenities.slice(0, 6).map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                {renderAmenityIcon(amenity, index)}
                            </div>
                        ))}
                    </div>
                    {bus.amenities.length > 6 && (
                        <div className="text-xs text-gray-500 mt-2 text-center">
                            +{bus.amenities.length - 6} more amenities
                        </div>
                    )}
                </div>
            )}

            {/* Seats and Price Section */}
            <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Armchair className="w-5 h-5 text-blue-500" />
                        <div>
                            <div className="text-sm text-gray-500">Total Seats</div>
                            <div className="text-lg font-bold text-gray-900">
                                {bus.seatsAvailable || bus.totalSeats || 40} / {bus.totalSeats || 40}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-green-500" />
                        <div>
                            <div className="text-sm text-gray-500">Price Range</div>
                            {formatPriceRange()}
                        </div>
                    </div>
                </div>

                <Link
                    to={`/book/${bus.id}`}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <span>Select Seats</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Service Areas if not showing specific route */}
            {!showRouteInfo && bus.serviceAreas && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">Service Areas:</div>
                    <div className="flex flex-wrap gap-2">
                        {bus.serviceAreas[0] === "all" ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                All Major Routes
                            </span>
                        ) : (
                            bus.serviceAreas.slice(0, 3).map((area, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                    {area}
                                </span>
                            ))
                        )}
                        {bus.serviceAreas.length > 3 && bus.serviceAreas[0] !== "all" && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                +{bus.serviceAreas.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BusCard;