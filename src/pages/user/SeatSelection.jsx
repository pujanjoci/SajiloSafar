import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import Seat from '../../components/Seat';
import { ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getBusById, getBookedSeats, searchParams } = useBooking();
    const [selectedSeats, setSelectedSeats] = useState([]);

    const bus = getBusById(id);

    if (!bus) return <div className="text-center py-20">Bus not found</div>;

    const bookedSeats = getBookedSeats(id);

    const handleSeatClick = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleProceed = () => {
        navigate('/booking-summary', {
            state: {
                bus,
                selectedSeats,
                date: searchParams.date
            }
        });
    };

    // Generate seat layout (Example: right side 2 cols, left side 2 cols)
    const renderSeats = () => {
        let seats = [];
        // Assuming 4 seats per row
        const rows = Math.ceil(bus.totalSeats / 4);

        for (let i = 1; i <= rows; i++) {
            const rowSeats = [];
            for (let j = 1; j <= 4; j++) {
                const seatNum = (i - 1) * 4 + j;
                if (seatNum <= bus.totalSeats) {
                    rowSeats.push(
                        <div key={seatNum} className={j === 2 ? "mr-8" : ""}>
                            <Seat
                                seatNumber={seatNum}
                                status={bookedSeats.includes(seatNum) ? 'booked' : 'available'}
                                isSelected={selectedSeats.includes(seatNum)}
                                onClick={handleSeatClick}
                            />
                        </div>
                    );
                }
            }
            seats.push(<div key={i} className="flex justify-between mb-2">{rowSeats}</div>);
        }
        return seats;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 mb-6 font-medium">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Buses
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-center">Select Your Seats</h2>

                            <div className="flex justify-center gap-6 mb-8 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span>Selected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                    <span>Booked</span>
                                </div>
                            </div>

                            <div className="w-64 mx-auto bg-gray-100 p-8 rounded-2xl border-2 border-gray-200">
                                <div className="text-center text-gray-400 mb-8 border-b-2 border-gray-300 pb-2">Driver Cabin</div>
                                {renderSeats()}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">{bus.name}</h3>
                            <div className="space-y-3 mb-6 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Route</span>
                                    <span className="font-semibold">{bus.route}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Date</span>
                                    <span className="font-semibold">{searchParams.date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Seat Price</span>
                                    <span className="font-semibold">NPR {bus.price}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between font-bold text-lg mb-2">
                                    <span>Selected Seats</span>
                                    <span className="text-green-600">{selectedSeats.length}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedSeats.map(s => (
                                        <span key={s} className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">#{s}</span>
                                    ))}
                                </div>
                                <div className="flex justify-between font-bold text-xl">
                                    <span>Total Price</span>
                                    <span className="text-blue-600">NPR {selectedSeats.length * bus.price}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleProceed}
                                disabled={selectedSeats.length === 0}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-200"
                            >
                                Proceed to Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
