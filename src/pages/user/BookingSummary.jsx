import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { CheckCircle } from 'lucide-react';

const BookingSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addBooking } = useBooking();
    const { bus, selectedSeats, date } = location.state || {};

    const [passengerName, setPassengerName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('esewa');

    if (!bus || !selectedSeats) {
        return <div className="p-8 text-center">Invalid Booking Request</div>;
    }

    const totalAmount = selectedSeats.length * bus.price;

    const handleConfirmBooking = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!passengerName || !email || !phone) {
            alert("Please fill all fields");
            return;
        }

        addBooking({
            busId: bus.id,
            userId: 1, // Mock user ID
            seatNumbers: selectedSeats,
            totalAmount,
            date,
            passengerName,
            contactNumber: phone
        });

        alert('Booking Confirmed!');
        navigate('/my-tickets');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Review & Pay</h2>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-blue-600 p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold">{bus.name}</h3>
                                <p className="opacity-90">{bus.type}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm opacity-90">Total Amount</p>
                                <p className="text-2xl font-bold">NPR {totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Route</label>
                                <p className="font-semibold text-gray-800">{bus.route}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Date</label>
                                <p className="font-semibold text-gray-800">{date}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Seats</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSeats.map(s => (
                                        <span key={s} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm font-semibold">Seat {s}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Departure</label>
                                <p className="font-semibold text-gray-800">{bus.departureTime}</p>
                            </div>
                        </div>

                        <form onSubmit={handleConfirmBooking} className="space-y-4">
                            <h4 className="font-bold text-gray-800 mb-2 mt-4">Passenger Details</h4>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    value={passengerName}
                                    onChange={(e) => setPassengerName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="9812345678"
                                    />
                                </div>
                            </div>

                            <h4 className="font-bold text-gray-800 mb-2 mt-6">Payment Method</h4>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <label className={`
                            border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-all
                            ${paymentMethod === 'esewa' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300'}
                        `}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="esewa"
                                        checked={paymentMethod === 'esewa'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="font-semibold">eSewa</span>
                                </label>
                                <label className={`
                            border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-all
                            ${paymentMethod === 'khalti' ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 hover:border-gray-300'}
                        `}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="khalti"
                                        checked={paymentMethod === 'khalti'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mr-2"
                                    />
                                    <span className="font-semibold">Khalti</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg flex items-center justify-center gap-2"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Confirm & Pay NPR {totalAmount}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSummary;
