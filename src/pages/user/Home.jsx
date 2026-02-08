import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
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

// Testimonial Carousel Component
const TestimonialCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 3;

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + itemsToShow >= testimonials.length ? 0 : prev + itemsToShow));
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsToShow);

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {visibleTestimonials.map((testimonial, index) => (
                    <div 
                        key={currentIndex + index}
                        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center mb-5">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`} 
                                />
                            ))}
                        </div>
                        <p className="text-white text-base leading-relaxed mb-6 flex-grow italic">
                            "{testimonial.content}"
                        </p>
                        <div className="flex items-center mt-auto">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                <p className="text-blue-200 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-10">
                {Array.from({ length: Math.ceil(testimonials.length / itemsToShow) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index * itemsToShow)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index * itemsToShow 
                                ? 'w-10 bg-white' 
                                : 'w-3 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to testimonial group ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const { routes, buses } = useBooking();
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
            <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-5">
                            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SajiloSafar</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Experience hassle-free bus booking with our premium features designed for your comfort
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index} 
                                className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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

            {/* Testimonials Carousel Section */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                            What Our Travelers Say
                        </h2>
                        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
                            Real experiences from thousands of satisfied customers
                        </p>
                    </div>

                    {/* Testimonial Carousel */}
                    <TestimonialCarousel testimonials={testimonials} />

                    {/* Trust Badge */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-white text-xl">4.8/5</span>
                            <span className="text-blue-100">from 10,000+ reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 md:py-24 relative overflow-hidden" id="cta">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                            Ready for Your Next <span className="text-yellow-400">Adventure?</span>
                        </h2>
                        <p className="text-blue-100 text-lg sm:text-xl md:text-2xl mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto">
                            Experience the beauty of Nepal with comfortable, reliable bus journeys.
                            Book your tickets in seconds and travel with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="group bg-white text-blue-700 font-bold py-4 px-10 md:py-5 md:px-12 rounded-xl hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-2xl hover:shadow-yellow-400/50 transform hover:-translate-y-1 duration-300 text-base sm:text-lg"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Book Your Ticket Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <Link
                                to="/buses"
                                className="bg-white/10 backdrop-blur-md text-white font-bold py-4 px-10 md:py-5 md:px-12 rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/20 transition-all text-base sm:text-lg text-center transform hover:-translate-y-1 duration-300"
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