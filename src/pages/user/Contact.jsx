import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a question or just want to say hi? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl overflow-hidden shadow-2xl bg-white">
                    {/* Contact Info Sidebar */}
                    <div className="bg-blue-600 p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Decor blobs */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-600 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2 opacity-50"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-blue-100 mb-10 leading-relaxed">
                                Fill up the form and our team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-blue-300 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Our Office</h4>
                                        <p className="text-blue-100 leading-relaxed">123 Thamel Marg,<br />Kathmandu 44600, Nepal</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-blue-300 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Email Us</h4>
                                        <p className="text-blue-100">support@sajilosafar.com</p>
                                        <p className="text-blue-100">info@sajilosafar.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-blue-300 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">Call Us</h4>
                                        <p className="text-blue-100">+977-9800000000</p>
                                        <p className="text-blue-100">+977-01-4400000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 flex gap-4">
                            {/* Social Icons placeholder */}
                            <div className="w-10 h-10 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                                <span className="font-bold">fb</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                                <span className="font-bold">in</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-700/50 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
                                <span className="font-bold">tw</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 p-10 md:p-12 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">First Name</label>
                                    <input type="text" required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-gray-800 placeholder-gray-400" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Last Name</label>
                                    <input type="text" required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-gray-800 placeholder-gray-400" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</label>
                                    <input type="email" required className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-gray-800 placeholder-gray-400" placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</label>
                                    <input type="tel" className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-gray-800 placeholder-gray-400" placeholder="+977 98..." />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Subject</label>
                                <div className="flex items-center gap-4 mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="subject" className="text-blue-600 focus:ring-blue-500 accent-blue-600" defaultChecked />
                                        <span className="text-gray-600">General Inquiry</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="subject" className="text-blue-600 focus:ring-blue-500 accent-blue-600" />
                                        <span className="text-gray-600">Support</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="subject" className="text-blue-600 focus:ring-blue-500 accent-blue-600" />
                                        <span className="text-gray-600">Feedback</span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Message</label>
                                <textarea required rows="4" className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-gray-800 placeholder-gray-400 resize-none" placeholder="Write your message here..."></textarea>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
