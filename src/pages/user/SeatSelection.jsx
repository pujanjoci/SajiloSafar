import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, CreditCard, Shield, Sofa, Info } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { getSeatType } from '../../data/buses'; // Import helper function
import Seat, { SeatLegend } from '../../components/Seat';

const SeatSelection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBusById, getBookedSeats } = useBooking();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);

    const bus = getBusById(id);

    if (!bus) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Bus Not Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const bookedSeats = getBookedSeats(id);
    const seatConfig = bus.seatConfiguration || {
        premiumSeats: [1, 2],
        sofaSeats: [],
        windowSeats: [],
        aisleSeats: []
    };

    const handleSeatClick = (seatNumber) => {
        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(s => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handleProceed = () => {
        navigate('/booking-summary', {
            state: {
                bus,
                selectedSeats,
                seatPrices: selectedSeats.map(seatNum => ({
                    seatNumber: seatNum,
                    price: calculateSeatPrice(seatNum),
                    type: getSeatType(bus, seatNum)
                }))
            }
        });
    };

    // Determine seat type based on bus configuration and position
    const determineSeatType = (seatNumber) => {
        // First check bus configuration
        const configType = getSeatType(bus, seatNumber);
        if (configType !== 'standard' && configType !== 'window' && configType !== 'aisle') {
            return configType; // premium or sofa
        }

        // Determine window/aisle based on position (4 seats per row)
        const seatsPerRow = 4;
        const row = Math.ceil(seatNumber / seatsPerRow);
        const positionInRow = ((seatNumber - 1) % seatsPerRow) + 1;

        // Seat positions in a row of 4:
        // Position 1: Left window seat
        // Position 2: Left aisle seat
        // Position 3: Right aisle seat
        // Position 4: Right window seat

        if (positionInRow === 1) return 'left-window';
        if (positionInRow === 4) return 'right-window';
        return 'aisle';
    };

    // Calculate seat price based on type
    const calculateSeatPrice = (seatNumber) => {
        const seatType = determineSeatType(seatNumber);
        const basePrice = bus.price || bus.minPrice || 1500;

        switch (seatType) {
            case 'premium':
                return Math.round(basePrice * 1.3); // 30% extra
            case 'sofa':
                return Math.round(basePrice * 1.5); // 50% extra
            default:
                return basePrice;
        }
    };

    const renderBusLayout = () => {
        const seats = [];
        const totalRows = Math.ceil(bus.totalSeats / 4);

        for (let row = 1; row <= totalRows; row++) {
            const rowSeats = [];

            for (let col = 1; col <= 4; col++) {
                const seatNum = (row - 1) * 4 + col;
                if (seatNum > bus.totalSeats) break;

                const seatType = determineSeatType(seatNum);

                rowSeats.push(
                    <div
                        key={seatNum}
                        className={`relative ${col === 2 ? "mr-8" : ""}`}
                        onMouseEnter={() => setHoveredSeat(seatNum)}
                        onMouseLeave={() => setHoveredSeat(null)}
                    >
                        {hoveredSeat === seatNum && (
                            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-10">
                                Seat #{seatNum} - {seatType.charAt(0).toUpperCase() + seatType.slice(1)} - NPR {calculateSeatPrice(seatNum)}
                            </div>
                        )}
                        <Seat
                            seatNumber={seatNum}
                            status={bookedSeats.includes(seatNum) ? 'booked' : 'available'}
                            isSelected={selectedSeats.includes(seatNum)}
                            onClick={handleSeatClick}
                            type={seatType}
                        />
                    </div>
                );
            }

            seats.push(
                <div key={row} className="flex justify-between mb-3">
                    {rowSeats}
                </div>
            );
        }

        return seats;
    };

    const totalSelectedPrice = useMemo(() => {
        return selectedSeats.reduce((total, seatNum) => {
            return total + calculateSeatPrice(seatNum);
        }, 0);
    }, [selectedSeats, bus.price]);

    // Count seat types for summary
    const seatTypeCounts = useMemo(() => {
        return selectedSeats.reduce((counts, seatNum) => {
            const type = determineSeatType(seatNum);
            counts[type] = (counts[type] || 0) + 1;
            return counts;
        }, {});
    }, [selectedSeats]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Search
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">Select Your Seats</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        <p className="text-gray-600">{bus.name} • {bus.type} • {bus.totalSeats} Seats</p>
                        {seatConfig.premiumSeats?.length > 0 && (
                            <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                <Info className="w-4 h-4" />
                                {seatConfig.premiumSeats.length} Premium Seats Available
                            </span>
                        )}
                        {seatConfig.sofaSeats?.length > 0 && (
                            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                                <Sofa className="w-4 h-4" />
                                {seatConfig.sofaSeats.length} Sofa Seats Available
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Panel - Seat Map */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Seat Map</h2>
                                    <p className="text-gray-500 text-sm mt-1">Click on available seats to select • Hover for details</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Base Fare</p>
                                    <p className="text-2xl font-bold text-blue-600">NPR {bus.price || bus.minPrice}</p>
                                </div>
                            </div>

                            {/* Legend */}
                            <SeatLegend className="mb-8" busType={bus.type} />

                            {/* Window/Aisle Info */}
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 border-2 border-gray-300 border-l-4 border-l-blue-400 rounded-lg bg-white"></div>
                                        <span className="text-sm text-gray-700">Left Window Seat</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 border-2 border-gray-300 border-r-4 border-r-blue-400 rounded-lg bg-white"></div>
                                        <span className="text-sm text-gray-700">Right Window Seat</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 border-2 border-gray-300 rounded-lg bg-white"></div>
                                        <span className="text-sm text-gray-700">Aisle Seat</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bus Layout */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none rounded-3xl" />
                                <div className="relative max-w-2xl mx-auto">
                                    {/* Driver Section */}
                                    <div className="text-center mb-10">
                                        <div className="inline-block px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border border-gray-200">
                                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                                <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg" />
                                                <span className="font-medium">Driver Cabin</span>
                                                <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-300 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Seats */}
                                    <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-100 shadow-inner">
                                        <div className="grid grid-cols-2 gap-x-16">
                                            {/* Left Side (2-2 layout) */}
                                            <div className="space-y-3">
                                                {renderBusLayout().filter((_, i) => i % 2 === 0)}
                                            </div>
                                            {/* Right Side */}
                                            <div className="space-y-3">
                                                {renderBusLayout().filter((_, i) => i % 2 === 1)}
                                            </div>
                                        </div>

                                        {/* Aisle marker */}
                                        <div className="flex items-center justify-center mt-6">
                                            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-3/4" />
                                            <span className="mx-4 text-sm text-gray-500 font-medium">Aisle</span>
                                            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-3/4" />
                                        </div>
                                    </div>

                                    {/* Rear Section */}
                                    <div className="text-center mt-10">
                                        <div className="inline-block px-6 py-2 bg-gray-100 rounded-lg">
                                            <span className="text-sm text-gray-500">Rear Exit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
                            {/* Bus Info */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Booking Summary</h3>
                                <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 p-4 rounded-xl">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">{bus.name}</p>
                                            <p className="text-sm text-gray-600 mt-1">{bus.type}</p>
                                            <p className="text-xs text-gray-500 mt-1">{bus.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">Bus No.</p>
                                            <p className="font-semibold">{bus.busNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Selected Seats */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-gray-900">Selected Seats</h4>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {selectedSeats.map(seatNum => {
                                        const seatType = determineSeatType(seatNum);
                                        const seatPrice = calculateSeatPrice(seatNum);
                                        return (
                                            <div key={seatNum} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded ${seatType === 'premium' ? 'bg-amber-500' :
                                                            seatType === 'sofa' ? 'bg-emerald-500' :
                                                                seatType.includes('window') ? 'bg-blue-400' :
                                                                    'bg-gray-400'
                                                        }`} />
                                                    <span className="font-medium text-gray-700">Seat #{seatNum}</span>
                                                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
                                                        {seatType.replace('-', ' ')}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">NPR {seatPrice}</span>
                                            </div>
                                        );
                                    })}
                                    {selectedSeats.length === 0 && (
                                        <div className="text-center py-8">
                                            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-gray-400 italic">No seats selected yet</p>
                                            <p className="text-sm text-gray-500 mt-1">Click seats to select</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-200 pt-6 mb-6">
                                <div className="space-y-3">
                                    {seatTypeCounts.standard && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Standard Seats</span>
                                            <span className="font-medium">{seatTypeCounts.standard} × NPR {bus.price || bus.minPrice}</span>
                                        </div>
                                    )}
                                    {seatTypeCounts.premium && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Premium Seats</span>
                                            <span className="font-medium text-amber-600">
                                                {seatTypeCounts.premium} × NPR {Math.round((bus.price || bus.minPrice) * 1.3)}
                                            </span>
                                        </div>
                                    )}
                                    {seatTypeCounts.sofa && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sofa Seats</span>
                                            <span className="font-medium text-emerald-600">
                                                {seatTypeCounts.sofa} × NPR {Math.round((bus.price || bus.minPrice) * 1.5)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">NPR {selectedSeats.length * 50}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 mt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total Amount</span>
                                            <span className="text-blue-600">NPR {totalSelectedPrice + (selectedSeats.length * 50)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    <span>100% Secure Booking</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <CreditCard className="w-4 h-4 text-blue-500" />
                                    <span>Multiple Payment Options</span>
                                </div>
                                {bus.amenities?.includes('wifi') && (
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-4 h-4 flex items-center justify-center">📶</div>
                                        <span>Free WiFi Available</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleProceed}
                                disabled={selectedSeats.length === 0}
                                className={`
                  w-full py-4 rounded-xl font-semibold text-white transition-all duration-200
                  ${selectedSeats.length > 0
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-200'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }
                `}
                            >
                                {selectedSeats.length > 0
                                    ? `Proceed to Payment (NPR ${totalSelectedPrice + (selectedSeats.length * 50)})`
                                    : 'Select Seats to Continue'
                                }
                            </button>

                            {/* Help Text */}
                            <div className="text-xs text-gray-400 text-center mt-4 space-y-1">
                                <p>• Premium seats include extra legroom</p>
                                <p>• Sofa seats convert to sleeping position</p>
                                <p>• Window seats have scenic views</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;