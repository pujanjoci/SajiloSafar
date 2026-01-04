import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, User, LogIn } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900 group">
                    <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <Bus className="w-6 h-6" />
                    </div>
                    <span className="tracking-tight">Sajilo<span className="text-blue-600">Safar</span></span>
                </Link>

                <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                    <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                    <Link to="/my-tickets" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group">
                        My Tickets
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all transform hover:scale-105 shadow-md text-sm font-medium">
                        <User className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign In</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
