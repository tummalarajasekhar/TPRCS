"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    MapPin, Monitor, Video, CheckCircle, Star, Lock,
    ChevronDown, X, ShieldCheck
} from 'lucide-react';
import { COURSES, CourseMode } from '../../lib/data';

// TypeScript fix for Razorpay on window
declare global {
    interface Window {
        Razorpay: any;
    }
}

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = Number(params.id);
    const course = COURSES.find(c => c.id === courseId);

    // --- STATE MANAGEMENT ---
    const [mode, setMode] = useState<CourseMode>('OFFLINE');
    const [openSection, setOpenSection] = useState<number | null>(0);
    const [accessLevel, setAccessLevel] = useState<'FREE' | 'DEMO' | 'FULL'>('FREE');

    // --- AUTH & MODAL STATE ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Stores details of the purchase user is attempting
    const [pendingPurchase, setPendingPurchase] = useState<{ amount: number; type: 'DEMO' | 'FULL' } | null>(null);

    // --- 1. CHECK AUTHENTICATION ON LOAD (COOKIE BASED) ---
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // We fetch the Next.js API route. 
                // Because it's the same domain, the browser automatically sends the HttpOnly cookie.
                const response = await fetch('/api/auth/me', {
                    method: 'GET',
                    cache: 'no-store' // Ensure we don't get a cached outdated response
                });

                if (response.ok) {
                    // Status 200 means the cookie was valid and signature verified
                    setIsLoggedIn(true);
                } else {
                    // Status 401 means no token or invalid token
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (!course) return <div className="p-20 text-center font-bold">Course not found</div>;

    const details = course.pricing?.[mode] || course.pricing['OFFLINE'];

    // --- 2. HANDLE ENROLL BUTTON CLICK ---
    const handleEnrollClick = (amount: number, type: 'DEMO' | 'FULL') => {
        // Check Real Auth State
        if (!isLoggedIn) {
            setShowLoginModal(true); // Open Login Popup
            return;
        }

        // If Logged In, Open Confirmation Popup
        setPendingPurchase({ amount, type });
        setShowConfirmModal(true);
    };

    // --- 3. EXECUTE PAYMENT (Only called from Confirmation Modal) ---
    const executePayment = async () => {
        if (!pendingPurchase) return;

        // Close modal
        setShowConfirmModal(false);

        const { amount, type } = pendingPurchase;

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load. Check your internet connection.');
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount * 100, // paise
            currency: "INR",
            name: "EduTech Guntur",
            description: type === 'DEMO' ? `Demo Access: ${course.title}` : `Full Course: ${course.title}`,
            handler: function (response: any) {
                // IN PRODUCTION: Send response.razorpay_payment_id to your backend to verify
                console.log(response);
                alert(`Payment Successful! Access Granted.`);
                setAccessLevel(type);
                setPendingPurchase(null);
            },
            prefill: { name: "Student Name", contact: "9999999999" },
            theme: { color: "#4f46e5" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-indigo-100 selection:text-indigo-800 relative">

            {/* HEADER */}
            <div className="bg-slate-900 text-white pt-28 pb-16 px-4 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-10"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="flex gap-2 mb-4">
                            <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {course.category}
                            </span>
                            <span className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                                <Star size={12} className="fill-yellow-200" /> {course.rating}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{course.title}</h1>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">{course.description}</p>
                    </div>

                    <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                        <img src={course.image} className="w-full h-full object-contain p-12 opacity-80" alt="Course Logo" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-10 grid lg:grid-cols-3 gap-10">

                {/* --- LEFT CONTENT --- */}
                <div className="lg:col-span-2 space-y-10">

                    {/* Mode Selection Tabs */}
                    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex gap-2 overflow-x-auto">
                        {(['OFFLINE', 'ONLINE_LIVE', 'RECORDED'] as CourseMode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap
                  ${mode === m ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-slate-500 hover:bg-slate-50'}
                `}
                            >
                                {m === 'OFFLINE' && <MapPin size={16} />}
                                {m === 'ONLINE_LIVE' && <Monitor size={16} />}
                                {m === 'RECORDED' && <Video size={16} />}
                                {m === 'ONLINE_LIVE' ? 'Live Online' : m.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    {/* CURRICULUM ACCORDION */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Course Syllabus</h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    {accessLevel === 'FULL' ? 'Full Access Unlocked' :
                                        accessLevel === 'DEMO' ? 'Demo Access Active (3 Modules)' :
                                            'Free Preview (1 Module)'}
                                </p>
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {course.curriculum?.map((item: any, idx: number) => {
                                let isLocked = true;
                                if (accessLevel === 'FULL') isLocked = false;
                                else if (accessLevel === 'DEMO' && idx <= 2) isLocked = false;
                                else if (accessLevel === 'FREE' && idx === 0) isLocked = false;

                                return (
                                    <div key={idx} className={`group ${isLocked ? 'bg-slate-50' : 'bg-white'}`}>
                                        <button
                                            disabled={isLocked}
                                            onClick={() => setOpenSection(openSection === idx ? null : idx)}
                                            className={`w-full flex items-center justify-between p-5 text-left transition-colors 
                        ${openSection === idx ? 'bg-indigo-50/50' : ''} 
                        ${!isLocked && 'hover:bg-slate-50'}
                        ${isLocked ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
                      `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 
                            ${isLocked ? 'bg-slate-200 text-slate-500' : (openSection === idx ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600')}
                        `}>
                                                    {isLocked ? <Lock size={12} /> : idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold text-lg ${openSection === idx ? 'text-indigo-900' : 'text-slate-700'}`}>
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.duration}</span>
                                                </div>
                                            </div>

                                            <div className="text-slate-400">
                                                {isLocked ? (
                                                    <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-1 rounded uppercase tracking-wider">
                                                        {idx <= 2 && accessLevel === 'FREE' ? 'Demo Only' : 'Premium'}
                                                    </span>
                                                ) : (
                                                    <ChevronDown size={20} className={`transition-transform duration-300 ${openSection === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                                                )}
                                            </div>
                                        </button>

                                        {!isLocked && (
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="px-5 pb-6 pl-[4.5rem] bg-indigo-50/30">
                                                    <ul className="space-y-3">
                                                        {item.topics?.map((topic: string, i: number) => (
                                                            <li key={i} className="flex items-start text-slate-600 text-sm leading-relaxed">
                                                                <div className="mt-1.5 min-w-[6px] h-1.5 rounded-full bg-indigo-400 mr-3 shadow-sm"></div>
                                                                <span>{topic}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: PRICING --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sticky top-24">

                        <div className="mb-6">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Investment</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">₹{details.price.toLocaleString()}</span>
                                {mode === 'RECORDED' && <span className="text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Save 70%</span>}
                            </div>
                        </div>

                        {/* CTA LOGIC */}
                        {accessLevel === 'FULL' ? (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle size={24} />
                                </div>
                                <h4 className="font-bold text-green-800 mb-1">Full Access Active</h4>
                                <button className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 mt-4">
                                    Go to Dashboard
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Demo Button */}
                                {accessLevel === 'FREE' && (
                                    <div className="bg-indigo-50 rounded-xl p-5 mb-4 border border-indigo-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="bg-indigo-100 p-2 rounded-full text-indigo-700"><Lock size={18} /></div>
                                            <div>
                                                <h4 className="font-bold text-indigo-900 text-sm">Preview Course</h4>
                                                <p className="text-xs text-indigo-700 mt-1">Unlock 3 modules for just ₹9.</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEnrollClick(9, 'DEMO')}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition-all"
                                        >
                                            Unlock Demo (₹9)
                                        </button>
                                    </div>
                                )}

                                {/* Full Course Button */}
                                <button
                                    onClick={() => handleEnrollClick(details.price, 'FULL')}
                                    className="w-full py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-xl hover:bg-slate-900 hover:text-white transition-colors"
                                >
                                    {accessLevel === 'DEMO' ? 'Upgrade to Full Course' : 'Enroll Full Course'}
                                </button>
                            </>
                        )}

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <ul className="space-y-3">
                                {details.features.map((feat: string, i: number) => (
                                    <li key={i} className="flex items-start text-sm text-slate-600">
                                        <CheckCircle size={18} className="text-green-500 mr-3 shrink-0" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL: LOGIN REQUIRED --- */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h3>
                            <p className="text-slate-500 mb-8">You need to be logged in to purchase or access course content.</p>

                            <div className="space-y-3">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                >
                                    Login / Sign Up
                                </button>
                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="w-full py-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL: CONFIRM PURCHASE --- */}
            {showConfirmModal && pendingPurchase && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 p-1 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="pt-2">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Confirm Purchase</h3>
                            <p className="text-slate-500 text-sm mb-6">You are about to proceed to the payment gateway.</p>

                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-indigo-900 font-medium text-sm">Course</span>
                                    <span className="text-indigo-900 font-bold text-sm truncate max-w-[120px]">{course.title}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-indigo-900 font-medium text-sm">Type</span>
                                    <span className="text-xs font-bold bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded uppercase">{pendingPurchase.type}</span>
                                </div>
                                <div className="border-t border-indigo-200 my-2 pt-2 flex justify-between items-center">
                                    <span className="text-indigo-900 font-bold">Total Amount</span>
                                    <span className="text-xl font-extrabold text-indigo-700">₹{pendingPurchase.amount.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={executePayment}
                                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                                <ShieldCheck size={18} />
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}