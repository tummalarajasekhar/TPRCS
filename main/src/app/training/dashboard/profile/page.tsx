"use client";
import { User, Mail, Phone, Book, Save } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                {/* Avatar Area */}
                <div className="px-8 pb-8">
                    <div className="relative -mt-12 mb-6">
                        <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg inline-block">
                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                <User size={40} />
                            </div>
                        </div>
                        <button className="absolute bottom-0 left-16 bg-blue-600 text-white text-xs px-2 py-1 rounded-full border-2 border-white">
                            Edit
                        </button>
                    </div>

                    {/* Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <User size={18} className="text-gray-400 mr-2" />
                                <input type="text" className="bg-transparent outline-none w-full" placeholder="John Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <Mail size={18} className="text-gray-400 mr-2" />
                                <input type="email" className="bg-transparent outline-none w-full" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <Phone size={18} className="text-gray-400 mr-2" />
                                <input type="tel" className="bg-transparent outline-none w-full" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">College / Company</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                                <Book size={18} className="text-gray-400 mr-2" />
                                <input type="text" className="bg-transparent outline-none w-full" placeholder="RVR & JC College" />
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button type="button" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors w-full md:w-auto">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}