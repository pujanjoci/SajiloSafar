import { Link } from 'react-router-dom';
import { Bus, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-auto border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                            <Bus className="w-8 h-8 text-blue-500" />
                            <span>Sajilo<span className="text-blue-500">Safar</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Nepal's most trusted online bus ticketing platform. Travels made simple, secure, and smart.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 hover:text-white transition-all"><Twitter size={18} /></a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                            <li><Link to="/buses" className="hover:text-blue-500 transition-colors">Bus Listings</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li>Kathmandu, Nepal</li>
                            <li>+977-9800000000</li>
                            <li>support@sajilosafar.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SajiloSafar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
