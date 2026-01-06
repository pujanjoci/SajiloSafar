// pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { buses } from '../../data/buses';
import { testimonials } from '../../data/testimonials';
import BusCard from '../../components/BusCard';
import Hero from './Hero';
import { cityImages } from '../../utils/cityImages';
import {
    Shield,
    Clock,
    CreditCard,
    Star,
    ArrowRight,
    Users,
    ChevronDown,
    Navigation,
    Truck,
    Headphones,
    Award,
    Wifi,
    UserCheck,
    MapPin  // Added missing import
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const { routes } = useBooking();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const featuredBuses = buses.slice(0, 4);
    const popularRoutes = routes.filter(route => route.isPopular).slice(0, 4);

    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Secure Booking",
            description: "Your data and payments are protected with top-tier security standards."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "On-Time Service",
            description: "We pride ourselves on punctuality and reliable bus schedules."
        },
        {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Easy Refunds",
            description: "Hassle-free cancellation and refund policies for your peace of mind."
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Top Rated Buses",
            description: "Travel with the best operators and most comfortable buses."
        }
    ];

    const busAmenities = [
        { icon: <Wifi className="w-5 h-5" />, label: "Free WiFi" },
        { icon: <CreditCard className="w-5 h-5" />, label: "Charging Ports" },
        { icon: <UserCheck className="w-5 h-5" />, label: "Assigned Seats" },
        { icon: <Truck className="w-5 h-5" />, label: "Spacious Luggage" },
        { icon: <Headphones className="w-5 h-5" />, label: "Entertainment" },
        { icon: <Award className="w-5 h-5" />, label: "AC Comfort" }
    ];


    const stats = [
        { number: "10K+", label: "Happy Travelers", icon: <Users className="w-6 h-6" /> },
        { number: "50+", label: "Destinations", icon: <MapPin className="w-6 h-6" /> },
        { number: "100+", label: "Buses", icon: <Truck className="w-6 h-6" /> },
        { number: "24/7", label: "Support", icon: <Headphones className="w-6 h-6" /> }
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Stats Section */}
            <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 text-blue-600 mb-3 md:mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Why Choose SajiloSafar?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Experience the best bus travel in Nepal with our premium services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Routes Section */}
            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Popular Routes
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Most traveled routes across Nepal's beautiful landscapes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 md:mb-14">
                        {popularRoutes.map((route, index) => {
                            const { from: fromCity, to: toCity } = route;
                            return (
                                <Link
                                    key={index}
                                    to={`/buses?from=${fromCity}&to=${toCity}`}
                                    onClick={() => {
                                        setFrom(fromCity);
                                        setTo(toCity);
                                    }}
                                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                                >
                                    <div className="h-32 sm:h-40 relative overflow-hidden">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 right-1/2 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${cityImages[fromCity] || '/images/cities/default.webp'})`
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                                        </div>
                                        <div
                                            className="absolute right-0 top-0 bottom-0 left-1/2 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${cityImages[toCity] || '/images/cities/default.webp'})`
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
                                        </div>

                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                            <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                <Navigation className="w-4 h-4 text-blue-600 transform rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{fromCity}</h3>
                                                <div className="text-xs text-gray-500 my-1">to</div>
                                                <h3 className="font-semibold text-gray-900">{toCity}</h3>
                                            </div>
                                            <div className="flex items-center text-blue-600 font-medium text-sm">
                                                Book Now <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Premium Amenities
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Enjoy a comfortable journey with our premium facilities
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                        {busAmenities.map((amenity, index) => (
                            <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-blue-600 mb-3">
                                    {amenity.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-700 text-center">{amenity.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 md:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            What Our Travelers Say
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust SajiloSafar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold mr-3">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-12 md:py-16" id="cta">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                            Ready for Your Next Adventure?
                        </h2>
                        <p className="text-blue-100 text-base sm:text-lg md:text-lg mb-6 md:mb-8 leading-relaxed">
                            Experience the beauty of Nepal with comfortable, reliable bus journeys.
                            Book your tickets in seconds and travel with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="bg-white text-blue-700 font-semibold py-3 px-6 md:py-3.5 md:px-8 rounded-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 text-sm sm:text-base"
                            >
                                Book Your Ticket Now
                            </button>
                            <Link
                                to="/buses"
                                className="bg-transparent text-white font-semibold py-3 px-6 md:py-3.5 md:px-8 rounded-lg border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all text-sm sm:text-base text-center"
                            >
                                Explore All Routes
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;