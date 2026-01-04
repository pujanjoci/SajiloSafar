import React from 'react';
import { Award, Users, Bus, Map, Heart, Shield } from 'lucide-react';

const About = () => {
    const stats = [
        { label: "Happy Travelers", value: "50k+", icon: <Users className="w-6 h-6" /> },
        { label: "Buses Partnered", value: "200+", icon: <Bus className="w-6 h-6" /> },
        { label: "Routes Covered", value: "100+", icon: <Map className="w-6 h-6" /> },
        { label: "Years of Service", value: "5+", icon: <Award className="w-6 h-6" /> }
    ];

    const values = [
        {
            icon: <Heart className="w-10 h-10 text-red-500" />,
            title: "Customer First",
            description: "We prioritize your comfort and satisfaction above all else, ensuring a delightful travel experience."
        },
        {
            icon: <Shield className="w-10 h-10 text-blue-500" />,
            title: "Safety & Trust",
            description: "We only partner with verified operators who strictly adhere to safety and maintenance protocols."
        },
        {
            icon: <Award className="w-10 h-10 text-yellow-500" />,
            title: "Excellence",
            description: "We continuously improve our platform and services to provide the best ticketing solution in Nepal."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-gray-50 py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Redefining Bus Travel in Nepal</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        SajiloSafar is more than just a ticketing platform. We are a team of dreamers and doers dedicated to making your journey as beautiful as the destination.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center p-4">
                            <div className="flex justify-center mb-3 text-blue-600 bg-blue-50 w-12 h-12 rounded-full items-center mx-auto">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story & Mission */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-blue-100 rounded-2xl transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop"
                            alt="Bus Travel"
                            className="relative rounded-2xl shadow-lg w-full h-auto object-cover z-10"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Founded in 2024, SajiloSafar started with a simple idea: why should booking a bus ticket be complicated? We saw travelers queuing for hours, facing uncertainty about seats, and lacking clear information.
                            </p>
                            <p>
                                We decided to change that. By combining technology with a deep understanding of Nepal's transportation landscape, we built a platform that puts the traveler first.
                            </p>
                            <p>
                                Today, we serve thousands of passengers daily, connecting remote villages to bustling cities, ensuring that no matter where you need to go, we can get you there safely and comfortably.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
                        <p className="text-gray-600 mt-4">The principles that guide every decision we make.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-gray-50 p-4 rounded-full">
                                        {val.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{val.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
