import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import {
    CheckCircle,
    Shield,
    Lock,
    ArrowLeft,
    User,
    Calendar,
    Clock,
    MapPin,
    CreditCard
} from 'lucide-react';

const BookingSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addBooking } = useBooking();
    const { user, isAuthenticated } = useAuth();
    const { bus, selectedSeats, seatPrices = [], date = new Date().toISOString().split('T')[0] } = location.state || {};

    const [passengerDetails, setPassengerDetails] = useState({
        name: '',
        email: '',
        phone: '',
        emergencyContact: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [bookingId, setBookingId] = useState('');
    const [khaltiLoaded, setKhaltiLoaded] = useState(false);

    useEffect(() => {
        if (!bus || !selectedSeats) {
            navigate('/');
        }
    }, [bus, selectedSeats, navigate]);

    // Auto-fill user details if logged in
    useEffect(() => {
        if (isAuthenticated && user) {
            setPassengerDetails(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, [isAuthenticated, user]);

    // Load Khalti Script
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://khalti.com/static/khalti-checkout.js";
        script.async = true;
        
        script.onload = () => {
            console.log("Khalti script loaded successfully");
            setKhaltiLoaded(true);
        };

        script.onerror = () => {
             console.error("Failed to load Khalti script");
             alert("Failed to load payment system. Please check your internet connection.");
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    if (!bus || !selectedSeats) {
        return null; // Or loading spinner, handled by useEffect redirect
    }

    // Calculate prices ...
    const calculatePrices = () => {
        if (seatPrices.length > 0) {
            const baseTotal = seatPrices.reduce((sum, seat) => sum + seat.price, 0);
            const serviceFee = selectedSeats.length * 50;
            const tax = Math.round(baseTotal * 0.13); // 13% VAT
            return {
                baseTotal,
                serviceFee,
                tax,
                grandTotal: baseTotal + serviceFee + tax
            };
        } else {
            const baseTotal = selectedSeats.length * bus.price;
            const serviceFee = selectedSeats.length * 50;
            const tax = Math.round(baseTotal * 0.13);
            return {
                baseTotal,
                serviceFee,
                tax,
                grandTotal: baseTotal + serviceFee + tax
            };
        }
    };

    const prices = calculatePrices();
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPassengerDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async () => {
        // Validate inputs
        if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
            alert("Please fill in all required passenger details");
            return;
        }

        if (passengerDetails.phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }

        // Khalti Config
        const config = {
            // Test Public Key
            "publicKey": "test_public_key_dc74e6f3e4e44385a81ca8c91d848135",
            "productIdentity": bus.id || "1234567890",
            "productName": "Bus Ticket",
            "productUrl": "http://localhost:5173",
            "paymentPreference": [
                "KHALTI",
                "EBANKING",
                "MOBILE_BANKING",
                "CONNECT_IPS",
                "SCT",
            ],
            "eventHandler": {
                onSuccess(payload) {
                    // console.log(payload);
                    processBookingSuccess(payload);
                },
                onError(error) {
                    console.log(error);
                    alert("Payment Failed. Please try again.");
                    setIsProcessing(false);
                },
                onClose() {
                    console.log('widget is closing');
                    setIsProcessing(false);
                }
            }
        };

        setIsProcessing(true);
        
        // Initialize Khalti
        try {
            const checkout = new window.KhaltiCheckout(config);
            checkout.show({ amount: prices.grandTotal * 100 }); // Amount in paisa
        } catch (error) {
            console.error("Khalti script not loaded", error);
            alert("Payment system loading. Please try again in a moment.");
            setIsProcessing(false);
        }
    };

    const processBookingSuccess = async (paymentPayload) => {
         // Generate booking ID
         const newBookingId = `BK${Date.now().toString().slice(-8)}`;
         setBookingId(newBookingId);
 
         // Add booking to context
         await addBooking({
             busId: bus.id,
             userId: user ? user.id : Math.floor(Math.random() * 1000) + 1,
             seatNumbers: selectedSeats,
             seatDetails: seatPrices,
             totalAmount: prices.grandTotal,
             date: date,
             passengerName: passengerDetails.name,
             contactNumber: passengerDetails.phone,
             email: passengerDetails.email,
             emergencyContact: passengerDetails.emergencyContact,
             bookingId: newBookingId,
             paymentMethod: 'Khalti',
             paymentToken: paymentPayload.token, // Store token
             busName: bus.name,
             busNumber: bus.busNumber,
             departureTime: bus.departureTime || '07:00 AM'
         });
 
         setIsProcessing(false);
         setBookingComplete(true);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Seat Selection
                    </button>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                            <p className="text-gray-600 mt-2">Secure payment · Instant confirmation</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-gray-700">100% Secure</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Panel - Booking Details */}
                    <div className="lg:col-span-2">
                        {bookingComplete ? (
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed! 🎉</h2>
                                    <p className="text-gray-600 mb-2">Your tickets have been booked successfully</p>
                                    <p className="text-sm text-gray-500 mb-8">Booking ID: <span className="font-mono font-bold text-blue-600">{bookingId}</span></p>

                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
                                        <div className="text-center">
                                            <p className="text-lg font-semibold text-gray-800 mb-2">Payment Summary</p>
                                            <div className="flex justify-center items-baseline gap-2">
                                                <span className="text-3xl font-bold text-gray-900">NPR {prices.grandTotal}</span>
                                                <span className="text-gray-500">paid via Khalti</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-500 mb-1">Passenger</p>
                                                <p className="font-semibold text-gray-900">{passengerDetails.name}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-500 mb-1">Contact</p>
                                                <p className="font-semibold text-gray-900">{passengerDetails.phone}</p>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-sm font-semibold text-blue-600">1</span>
                                                    </div>
                                                    <p className="text-gray-700">Your e-ticket has been sent to <span className="font-semibold">{passengerDetails.email}</span></p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-sm font-semibold text-blue-600">2</span>
                                                    </div>
                                                    <p className="text-gray-700">Present your booking ID at the bus counter 30 minutes before departure</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => navigate('/my-tickets')}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                                            >
                                                View My Tickets
                                            </button>
                                            <button
                                                onClick={() => navigate('/')}
                                                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition"
                                            >
                                                Book Another Ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Passenger Details - Only show form if NOT authenticated or if editing is needed (optional) */}
                                {/* For now, we show read-only or pre-filled form if auth, and editable if guest. */}
                                {/* Requirement: "there is still the user details after the user has already logged in" -> Hide it or make it look like a summary. */}
                                
                                {isAuthenticated ? (
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
                                         <div className="flex items-center gap-3 mb-6">
                                            <User className="w-6 h-6 text-blue-500" />
                                            <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-4 rounded-xl">
                                             <div>
                                                <p className="text-sm text-gray-500">Name</p>
                                                <p className="font-semibold text-gray-900">{passengerDetails.name}</p>
                                             </div>
                                             <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-semibold text-gray-900">{passengerDetails.email}</p>
                                             </div>
                                             <div>
                                                <p className="text-sm text-gray-500">Phone</p>
                                                <p className="font-semibold text-gray-900">{passengerDetails.phone}</p>
                                             </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <User className="w-6 h-6 text-blue-500" />
                                            <h2 className="text-xl font-bold text-gray-900">Passenger Information</h2>
                                        </div>

                                        <form>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                        value={passengerDetails.name}
                                                        onChange={handleInputChange}
                                                        placeholder="John Doe"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                        value={passengerDetails.email}
                                                        onChange={handleInputChange}
                                                        placeholder="john@example.com"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        pattern="[0-9]{10}"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                        value={passengerDetails.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="98XXXXXXXX"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Emergency Contact
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="emergencyContact"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                                        value={passengerDetails.emergencyContact}
                                                        onChange={handleInputChange}
                                                        placeholder="Optional"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Payment Methods - Only Khalti */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6 text-blue-500" />
                                        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <PaymentOption
                                            id="khalti"
                                            icon={<img src="/khalti.png" alt="Khalti" className="w-8 h-8 object-contain" />}
                                            title="Khalti"
                                            description="Pay securely with Khalti Digital Wallet"
                                            isSelected={true}
                                            onSelect={() => {}}
                                        />
                                    </div>

                                    {/* Security Note */}
                                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <div className="flex items-start gap-3">
                                            <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                                            <div>
                                                <p className="font-semibold text-green-800">Secure Payment</p>
                                                <p className="text-sm text-green-700 mt-1">
                                                    Your payment information is encrypted and secured.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Panel - Booking Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

                            {/* Journey Details */}
                            <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 p-5 rounded-xl mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-bold text-gray-900">{bus.name}</p>
                                        <p className="text-sm text-gray-600">{bus.type} • {bus.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Bus No.</p>
                                        <p className="font-semibold">{bus.busNumber}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">{bus.departureTime || '07:00 AM'} Departure</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-700">Bus Park, Kathmandu</span>
                                    </div>
                                </div>
                            </div>

                            {/* Selected Seats */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">Selected Seats ({selectedSeats.length})</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSeats.map((seatNum, index) => {
                                        const seatPrice = seatPrices[index]?.price || bus.price;
                                        return (
                                            <div key={seatNum} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                                                <span className="font-medium text-gray-700">Seat #{seatNum}</span>
                                                {seatPrices[index]?.type && (
                                                    <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                                                        {seatPrices[index].type}
                                                    </span>
                                                )}
                                                <span className="ml-2 text-sm font-semibold text-gray-900">NPR {seatPrice}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-200 pt-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base Fare</span>
                                        <span className="font-medium">NPR {prices.baseTotal}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service Fee</span>
                                        <span className="font-medium">NPR {prices.serviceFee}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (13% VAT)</span>
                                        <span className="font-medium">NPR {prices.tax}</span>
                                    </div>

                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total Amount</span>
                                            <span className="text-blue-600">NPR {prices.grandTotal}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Button */}
                            {!bookingComplete && (
                                <div className="mt-8">
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing || !khaltiLoaded}
                                        style={{ backgroundColor: khaltiLoaded ? '#5C2D91' : '#9ca3af' }} // Khalti Color or Gray
                                        className={`
                      w-full py-4 rounded-xl font-semibold text-white transition-all duration-200
                      flex items-center justify-center gap-2 hover:shadow-lg
                      ${(isProcessing || !khaltiLoaded) ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : !khaltiLoaded ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Loading Payment System...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5" />
                                                Pay with Khalti (NPR {prices.grandTotal})
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-3">
                                        By completing this booking, you agree to our Terms & Conditions
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Payment Option Component
const PaymentOption = ({ id, icon, title, description, isSelected, onSelect }) => {
    return (
        <label className={`
      border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
      ${isSelected
                ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
    `}>
            <input
                type="radio"
                name="payment"
                value={id}
                checked={isSelected}
                onChange={onSelect}
                className="sr-only"
            />
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white' : 'bg-gray-100'
                    }`}>
                    {typeof icon === 'string' ? (
                        <span className="text-lg">{icon}</span>
                    ) : (
                        icon
                    )}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>
        </label>
    );
};

export default BookingSummary;