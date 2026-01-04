import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { Search, Calendar, MapPin, Shield, Clock, CreditCard, Star, ArrowRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const { routes, searchBuses } = useBooking();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    const locations = [...new Set(routes.map(r => r.from))];

    const handleSearch = (e) => {
        e.preventDefault();
        if (!from || !to || !date) {
            alert('Please fill in all fields');
            return;
        }
        searchBuses(from, to, date);
        navigate('/buses');
    };

    const features = [
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Secure Booking",
            description: "Your data and payments are protected with top-tier security standards."
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-600" />,
            title: "On-Time Service",
            description: "We pride ourselves on punctuality and reliable bus schedules."
        },
        {
            icon: <CreditCard className="w-8 h-8 text-blue-600" />,
            title: "Easy Refunds",
            description: "Hassle-free cancellation and refund policies for your peace of mind."
        },
        {
            icon: <Star className="w-8 h-8 text-blue-600" />,
            title: "Top Rated Buses",
            description: "Travel with the best operators and most comfortable buses in Nepal."
        }
    ];

    const popularRoutes = [
        { from: 'Kathmandu', to: 'Pokhara', price: '1200' },
        { from: 'Pokhara', to: 'Chitwan', price: '1000' },
        { from: 'Kathmandu', to: 'Lumbini', price: '1500' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-800 text-white pt-24 pb-32 overflow-hidden">
                {/* Abstract Decor Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            Explore Nepal with <span className="text-blue-300">SajiloSafar</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Experience the most comfortable, reliable, and scenic bus journeys across the country. Book your tickets in minutes.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 max-w-4xl mx-auto">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-100 ml-1">From</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-3.5 text-blue-200 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                                    <select
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-white option:text-gray-900"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    >
                                        <option value="" className="text-gray-500">Origin</option>
                                        {locations.map(loc => (
                                            <option key={loc} value={loc} className="text-gray-900">{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-100 ml-1">To</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-3 top-3.5 text-blue-200 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                                    <select
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-white"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    >
                                        <option value="" className="text-gray-500">Destination</option>
                                        {locations.filter(l => l !== from).map(loc => (
                                            <option key={loc} value={loc} className="text-gray-900">{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-blue-100 ml-1">Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-3 top-3.5 text-blue-200 group-focus-within:text-blue-500 transition-colors w-5 h-5" />
                                    <input
                                        type="date"
                                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-blue-200"
                                        value={date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                                >
                                    <Search className="w-5 h-5" />
                                    Search Buses
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Travel with Confidence</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">We provide a seamless travel experience with top-notch safety protocols and customer service.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
                                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    {React.cloneElement(feature.icon, { className: "w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popular Routes Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Routes</h2>
                            <p className="text-gray-500">Explore our most frequent and loved destinations.</p>
                        </div>
                        <button onClick={() => navigate('/buses')} className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
                            View all routes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {popularRoutes.map((route, index) => (
                            <div key={index}
                                onClick={() => {
                                    setFrom(route.from);
                                    setTo(route.to);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="relative group overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 z-10"></div>
                                {/* Placeholder images - in real app use actual images */}
                                <div className={`h-64 bg-gray-300 w-full transition-transform duration-500 group-hover:scale-110 bg-cover bg-center`}
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop')` }}
                                ></div>

                                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-300 text-sm mb-1">Daily Buses</p>
                                            <h3 className="text-xl font-bold text-white mb-1">{route.from} to {route.to}</h3>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-white font-semibold border border-white/30">
                                            NPR {route.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start your journey?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of satisfied travelers who choose SajiloSafar for their daily commute and vacations.</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200"
                    >
                        Book Your Ticket Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
