"use client";
import React, { useState } from 'react';
import { Search, MapPin, Monitor, Video, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link'; // Important: Import Link for navigation
import { COURSES, CATEGORIES, CourseMode } from '../lib/data';

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCourses = COURSES.filter(course => {
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-700">

            {/* --- HERO SECTION --- */}
            <div className="relative bg-indigo-900 overflow-hidden pb-24 pt-20 lg:pt-32">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-sm font-medium mb-6 backdrop-blur-sm">
                        🚀 Launch your career in Guntur
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Future-Proof Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Skills</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-200">
                        Expert-led courses available <b>Offline</b> at Brodipet & Koretapadu, or <b>Online</b> from anywhere.
                    </p>

                    {/* Modern Search Bar */}
                    <div className="mt-10 max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative flex items-center bg-white rounded-full p-2 shadow-2xl">
                            <Search className="ml-4 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Find your next skill (e.g. Python, MERN)..."
                                className="w-full p-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-2.5 font-medium transition-colors">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CATEGORY TABS (FIXED & STICKY) --- */}
            <div className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto no-scrollbar">
                    <div className="flex space-x-2 md:justify-center">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- COURSE GRID --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20 pb-20">
                {filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <PremiumCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-gray-300 mb-4">
                            <Search size={64} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No courses found</h3>
                        <p className="text-gray-500">Try adjusting your search or category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- COMPONENT: PREMIUM CARD ---
function PremiumCourseCard({ course }: { course: any }) {
    const [mode, setMode] = useState<CourseMode>('OFFLINE');
    const details = course.pricing?.[mode] || course.pricing['OFFLINE'];

    // Helper to get color based on mode
    const getModeColor = (m: string) => {
        if (m === 'OFFLINE') return 'bg-indigo-600 text-white shadow-indigo-200';
        if (m === 'ONLINE_LIVE') return 'bg-purple-600 text-white shadow-purple-200';
        return 'bg-emerald-600 text-white shadow-emerald-200';
    };

    return (
        <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative">

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-gray-800 rounded-full shadow-sm border border-gray-100">
                    {course.category}
                </span>
            </div>

            {/* Header Section */}
            <div className="p-8 pb-0 relative">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 p-3 mb-6 shadow-inner flex items-center justify-center">
                    <img src={course.image} alt={course.title} className="w-10 h-10 object-contain" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {course.description}
                </p>

                {/* Separator */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>
            </div>

            {/* Mode Switcher */}
            <div className="px-8">
                <div className="bg-gray-100/80 p-1.5 rounded-xl grid grid-cols-3 gap-1 relative">
                    {(['OFFLINE', 'ONLINE_LIVE', 'RECORDED'] as CourseMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`py-2 text-[10px] md:text-xs font-bold rounded-lg transition-all duration-300 capitalize flex flex-col items-center justify-center gap-1
                ${mode === m ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200/50'}
              `}
                        >
                            {m === 'OFFLINE' && <MapPin size={12} />}
                            {m === 'ONLINE_LIVE' && <Monitor size={12} />}
                            {m === 'RECORDED' && <Video size={12} />}
                            {m === 'ONLINE_LIVE' ? 'Live' : m.toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="p-8 pt-6 mt-auto">
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        ₹{details.price.toLocaleString()}
                    </span>
                    {mode === 'RECORDED' && <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">Best Value</span>}
                </div>

                <div className="text-xs font-medium text-gray-500 mb-6 flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${mode === 'OFFLINE' ? 'bg-indigo-500' : 'bg-green-500'}`}></div>
                    {details.location}
                </div>

                <ul className="space-y-3 mb-8">
                    {details.features.slice(0, 3).map((feat: string, i: number) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                            <div className="mt-0.5 mr-3 p-0.5 rounded-full bg-indigo-50 text-indigo-600">
                                <Check size={10} strokeWidth={4} />
                            </div>
                            {feat}
                        </li>
                    ))}
                </ul>

                {/* THIS LINK CONNECTS TO THE DETAIL PAGE */}
                <Link href={`/courses/${course.id}`} className="block w-full">
                    <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg flex justify-center items-center gap-2 group-hover:gap-3 ${getModeColor(mode)} hover:shadow-xl hover:brightness-110`}>
                        {mode === 'OFFLINE' ? 'Book Free Demo' : 'View Syllabus & Enroll'}
                        <ChevronRight size={16} />
                    </button>
                </Link>
            </div>
        </div>
    );
}