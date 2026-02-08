
import React, { useState, useEffect } from 'react';
import { Bus, Map as MapIcon, Ticket, Wallet, User } from 'lucide-react';

const AdminDashboard = () => {
    const [statsData, setStatsData] = useState({
        users: 0,
        buses: 0,
        routes: 0,
        bookings: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost/sajilo-safar/api/dashboard_stats.php', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        {
            label: 'Total Revenue',
            value: `NPR ${parseInt(statsData.revenue || 0).toLocaleString()}`,
            icon: Wallet,
            color: 'bg-emerald-500',
            trend: '+12.5%',
            trendUp: true
        },
        {
            label: 'Total Bookings',
            value: statsData.bookings || 0,
            icon: Ticket,
            color: 'bg-blue-500',
            trend: '+8.2%',
            trendUp: true
        },
        {
            label: 'Active Routes',
            value: statsData.routes || 0,
            icon: MapIcon,
            color: 'bg-purple-500',
            trend: '+2.4%',
            trendUp: true
        },
        {
            label: 'Registered Users',
            value: statsData.users || 0,
            icon: User,
            color: 'bg-orange-500',
            trend: 'Stable',
            trendUp: true
        }
    ];

    return (
        <div>
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Dashboard Overview</h1>
                <p className="text-gray-600 text-lg">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={index} 
                            className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                        >
                            {/* Gradient Background Accent */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>
                            
                            <div className="relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className={`w-7 h-7 ${stat.color.replace('bg-', 'text-')}`} />
                                    </div>
                                </div>
                                
                                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</h3>
                                
                                <div className="flex items-center text-xs">
                                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                                        {stat.trend}
                                    </span>
                                    <span className="text-gray-400 ml-2">from last month</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings Placeholder (Can be expanded later) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="p-6 text-center text-gray-500 py-12">
                    <p>Booking table will be refactored in the next step.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
