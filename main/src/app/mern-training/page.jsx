"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
	Code2, 
	Database, 
	Server, 
	Layout, 
	CheckCircle2, 
	ArrowRight, 
	MonitorPlay,
	Loader2,
	ShoppingCart,
	MessageSquare, 
	Globe, 
	Check,
	Sparkles, 
	Tag,
	TicketPercent // Icon for the ticket inside form and floating ad
} from 'lucide-react';

export default function MernTrainingPage() {
	// --- STATE MANAGEMENT ---
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: ''
	});
	const [status, setStatus] = useState('idle');
	
	// State for 25% Discount Feature
	const [isDiscountActive, setIsDiscountActive] = useState(false);

	// NEW: State for floating ad button visibility
	const [showFloatingAd, setShowFloatingAd] = useState(false);

	// Ref for scrolling to form
	const enrollSectionRef = useRef(null);

	// --- SCROLL EFFECT FOR FLOATING AD ---
	useEffect(() => {
		const handleScroll = () => {
			// Show the ad once the user scrolls past the hero section (e.g., after 500px)
			if (window.scrollY > 500) {
				setShowFloatingAd(true);
			} else {
				// Hide the ad if we are back at the top
				setShowFloatingAd(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// --- HANDLERS ---
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setStatus('submitting');

		// --- PREPARE DATA TO SEND ---
		// This includes the offer status explicitly
		const dataToSend = {
			...formData,
			offer_applied: isDiscountActive,
			offer_type: isDiscountActive ? '25% SCHOLARSHIP OFF' : 'STANDARD ADMISSION',
			timestamp: new Date().toISOString()
		};

		try {await fetch('https://rajabackend.srikrishnatechhub.com/request-callback', {

			method: 'POST',

			headers: { 'Content-Type': 'application/json' },

			body: JSON.stringify(dataToSend)

		})
			console.log("🚀 Sending Data to Backend:", dataToSend);
			
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1500));

			setStatus('success');
			setFormData({ name: '', email: '', phone: '' }); 
			// Optional: Reset offer after success? 
			// setIsDiscountActive(false); 
		} catch (error) {
			console.error("Submission Error:", error);
			setStatus('error');
		} finally {
			setTimeout(() => {
				if(status === 'success') setStatus('idle');
			}, 5000);
		}
	};

	// Function to handle "Claim Offer" click from Pricing Card or Floating Ad
	const handleClaimOffer = () => {
		setIsDiscountActive(true); // Force enable the discount
		enrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
			
			{/* --- NAVBAR --- */}
			<nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex-shrink-0 flex items-center gap-2">
							<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
							<span className="font-bold text-xl tracking-tight text-slate-900">TPR CS Academy</span>
						</div>
						<div className="hidden md:flex space-x-8">
							<a href="#curriculum" className="text-slate-600 hover:text-indigo-600 font-medium transition">Curriculum</a>
							<a href="#projects" className="text-slate-600 hover:text-indigo-600 font-medium transition">Projects</a>
							<a href="#pricing" className="text-slate-600 hover:text-indigo-600 font-medium transition">Pricing</a>
						</div>
						<div>
							<button onClick={() => enrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-lg shadow-indigo-200">
								Enroll Now
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* --- HERO SECTION --- */}
			<section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="text-center max-w-3xl mx-auto">
						<div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
							<span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
							New Batch Starting Soon
						</div>
						<h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
							Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">MERN Stack</span>. <br />
							Build Your Future.
						</h1>
						<p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
							Stop just learning syntax. Start building real applications. 
							Join <strong>TPR CS Academy</strong> and go from beginner to Job-Ready Developer.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button onClick={() => enrollSectionRef.current?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-xl shadow-indigo-200">
								Start Your Journey
								<ArrowRight className="ml-2 w-5 h-5" />
							</button>
							<a href="#projects" className="flex items-center justify-center bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold transition">
								View Projects
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* --- CURRICULUM SECTION --- */}
			<section id="curriculum" className="py-24 bg-slate-50">
				<div className="max-w-7xl mx-auto px-4 text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Full-Stack Curriculum</h2>
					<p className="text-lg text-slate-600">We cover everything you need to crack developer interviews.</p>
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg"><Database className="mb-4 text-green-600"/><h3 className="font-bold text-xl">MongoDB</h3><p className="text-sm text-slate-500">Data Modeling & Aggregation</p></div>
					<div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg"><Server className="mb-4 text-gray-600"/><h3 className="font-bold text-xl">Express & Node</h3><p className="text-sm text-slate-500">REST API & Auth</p></div>
					<div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-lg"><Code2 className="mb-4 text-blue-600"/><h3 className="font-bold text-xl">React.js</h3><p className="text-sm text-slate-500">Hooks & Redux</p></div>
					<div className="p-6 rounded-2xl bg-slate-900 text-white shadow-lg"><MonitorPlay className="mb-4 text-indigo-400"/><h3 className="font-bold text-xl">Live Projects</h3><p className="text-sm text-slate-400">Deploy & Scale</p></div>
				</div>
			</section>

			{/* --- DETAILED CURRICULUM SECTION (NEW) --- */}
			<section id="details" className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Deep Dive</span>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">In-Depth Module Breakdown</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-10">
						{/* React Module Details */}
						<div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-200 shadow-lg">
							<div className="flex items-center gap-3 mb-6">
								<Code2 className="w-8 h-8 text-blue-600"/>
								<h3 className="text-2xl font-bold text-slate-900">Frontend Mastery: React.js</h3>
							</div>
							<ul className="space-y-4 text-slate-700">
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">React Fundamentals & Component Lifecycle:</strong> 
										Mastering functional components, JSX, props, and component rendering phases.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Modern State Management (Hooks):</strong> 
										In-depth practice with `useState`, `useEffect`, `useContext`, and advanced custom hooks for scalable state logic.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Routing & Navigation:</strong> 
										Implementing multi-page applications using modern solutions like React Router DOM.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Advanced State with Redux Toolkit:</strong> 
										Handling complex global state, asynchronous actions, and efficient data flow in large applications.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Forms, Validation & API Calls:</strong> 
										Building robust forms using modern libraries (e.g., React Hook Form) and integrating with backend REST APIs via Axios/Fetch.
									</div>
								</li>
							</ul>
						</div>

						{/* Express/Node Module Details */}
						<div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-200 shadow-lg">
							<div className="flex items-center gap-3 mb-6">
								<Server className="w-8 h-8 text-gray-700"/>
								<h3 className="text-2xl font-bold text-slate-900">Backend Core: Express & Node.js</h3>
							</div>
							<ul className="space-y-4 text-slate-700">
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Node.js Basics & Asynchronous Programming:</strong> 
										Understanding the Event Loop, NPM, and handling promises/async-await efficiently.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">RESTful API Design & Routing:</strong> 
										Structuring clean and scalable backends, defining routes, and managing HTTP methods.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Data Persistence with MongoDB & Mongoose:</strong> 
										Setting up database connections, creating schemas, and performing CRUD operations (Create, Read, Update, Delete).
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Authentication & Security (JWT):</strong> 
										Implementing user sign-up/login, securing endpoints using JSON Web Tokens (JWT), and protecting against common vulnerabilities.
									</div>
								</li>
								<li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1"/> 
									<div>
										<strong className="block text-slate-900">Middleware & Error Handling:</strong> 
										Custom middleware for logging, rate limiting, and creating robust global error handlers.
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>


			{/* --- PROJECTS SECTION --- */}
			<section id="projects" className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<span className="text-indigo-600 font-semibold tracking-wider uppercase text-sm">Portfolio Ready</span>
						<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">What You Will Build</h2>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
							<div className="h-48 bg-indigo-50 flex items-center justify-center"><ShoppingCart className="w-16 h-16 text-indigo-300 group-hover:text-indigo-600 transition" /></div>
							<div className="p-6"><h3 className="text-xl font-bold mb-2">E-Commerce</h3><p className="text-slate-600 text-sm">Full Amazon clone with Stripe payments.</p></div>
						</div>
						<div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
							<div className="h-48 bg-pink-50 flex items-center justify-center"><Globe className="w-16 h-16 text-pink-300 group-hover:text-pink-600 transition" /></div>
							<div className="p-6"><h3 className="text-xl font-bold mb-2">Social Media</h3><p className="text-slate-600 text-sm">Instagram clone with image uploads.</p></div>
						</div>
						<div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all">
							<div className="h-48 bg-green-50 flex items-center justify-center"><MessageSquare className="w-16 h-16 text-green-300 group-hover:text-green-600 transition" /></div>
							<div className="p-6"><h3 className="text-xl font-bold mb-2">Chat App</h3><p className="text-slate-600 text-sm">Real-time messaging with Socket.io.</p></div>
						</div>
					</div>
				</div>
			</section>

			{/* --- PRICING SECTION --- */}
			<section id="pricing" className="py-24 bg-indigo-900 text-white relative overflow-hidden">
				{/* Background decoration */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
					<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-purple-500 blur-3xl"></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<div className="text-center mb-10">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
						<p className="text-indigo-200 text-lg max-w-2xl mx-auto">
							Invest in yourself. No hidden fees.
						</p>
					</div>

					{/* --- TOGGLE DISCOUNT SWITCH --- */}
					<div className="flex justify-center mb-12">
						<div className="bg-indigo-950/50 p-1.5 rounded-full border border-indigo-700 inline-flex relative cursor-pointer">
							<div className={`absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-6px)] bg-indigo-500 rounded-full transition-all duration-300 ${isDiscountActive ? 'translate-x-full' : 'translate-x-0'}`}></div>
							<button onClick={() => setIsDiscountActive(false)} className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors ${!isDiscountActive ? 'text-white' : 'text-indigo-300'}`}>Standard</button>
							<button onClick={() => setIsDiscountActive(true)} className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${isDiscountActive ? 'text-white' : 'text-indigo-300'}`}><Sparkles className="w-4 h-4" /> Unlock 25% OFF</button>
						</div>
					</div>

					<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
						
						{/* Plan 1: Crash Course */}
						<div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 flex flex-col h-full">
							<h3 className="text-xl font-bold text-slate-300">Crash Course</h3>
							<div className="my-6 h-20 flex flex-col justify-center">
								{isDiscountActive ? (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
										<div className="text-slate-400 text-lg line-through decoration-red-500 decoration-2">₹4,999</div>
										<div className="flex items-baseline gap-2">
											<span className="text-4xl font-bold text-green-400">₹3,750</span>
											<span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">25% OFF</span>
										</div>
									</div>
								) : (
									<div><span className="text-4xl font-bold">₹4,999</span><span className="text-slate-400">/one-time</span></div>
								)}
							</div>
							<p className="text-slate-400 text-sm mb-6">Recorded sessions & source code.</p>
							<div className="flex-grow"></div>
							<button onClick={handleClaimOffer} className={`block w-full py-3 rounded-lg border text-center font-semibold transition ${isDiscountActive ? 'bg-green-600 border-green-600 hover:bg-green-700 text-white' : 'border-slate-600 hover:bg-slate-700 text-white'}`}>
								{isDiscountActive ? 'Claim Offer' : 'Select Plan'}
							</button>
						</div>

						{/* Plan 2: Live Mentorship */}
						<div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl transform md:-translate-y-4 border-4 border-indigo-500 relative flex flex-col h-full">
							<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">Most Popular</div>
							<h3 className="text-xl font-bold text-indigo-600">Live Mentorship</h3>
							<div className="my-6 h-20 flex flex-col justify-center">
								{isDiscountActive ? (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
										<div className="text-slate-400 text-lg line-through decoration-red-500 decoration-2">₹14,999</div>
										<div className="flex items-baseline gap-2">
											<span className="text-5xl font-bold text-green-600">₹11,250</span>
											<span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">25% OFF</span>
										</div>
									</div>
								) : (
									<div><span className="text-5xl font-bold">₹14,999</span><span className="text-slate-500">/batch</span></div>
								)}
							</div>
							<p className="text-slate-600 text-sm mb-6">Live weekend classes with direct interaction.</p>
							<ul className="space-y-3 mb-8 text-slate-700 text-sm">
								<li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600"/> Placement Assistance</li>
								<li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600"/> 3 Live Projects</li>
							</ul>
							<button onClick={handleClaimOffer} className={`block w-full py-4 rounded-lg text-center font-bold text-lg shadow-lg transition ${isDiscountActive ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}>
								{isDiscountActive ? 'Claim 25% Off' : 'Join Next Batch'}
							</button>
						</div>

						{/* Plan 3: Personal */}
						<div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 flex flex-col h-full">
							<h3 className="text-xl font-bold text-slate-300">1-on-1 Personal</h3>
							<div className="my-6 h-20 flex flex-col justify-center">
								{isDiscountActive ? (
									<div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
										<div className="text-slate-400 text-lg line-through decoration-red-500 decoration-2">₹29,999</div>
										<div className="flex items-baseline gap-2">
											<span className="text-4xl font-bold text-green-400">₹22,500</span>
											<span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold">25% OFF</span>
										</div>
									</div>
								) : (
									<div><span className="text-4xl font-bold">₹29,999</span><span className="text-slate-400">/month</span></div>
								)}
							</div>
							<p className="text-slate-400 text-sm mb-6">Dedicated personal training.</p>
							<div className="flex-grow"></div>
							<button onClick={handleClaimOffer} className={`block w-full py-3 rounded-lg border text-center font-semibold transition ${isDiscountActive ? 'bg-green-600 border-green-600 hover:bg-green-700 text-white' : 'border-slate-600 hover:bg-slate-700 text-white'}`}>
								{isDiscountActive ? 'Claim Offer' : 'Check Availability'}
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* --- ENROLL / CONTACT FORM --- */}
			<section id="enroll" ref={enrollSectionRef} className="py-24 bg-white">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Start Coding?</h2>
					<p className="text-xl text-slate-600 mb-10">
						Fill out the form below to get the complete syllabus and confirm your seat.
					</p>
					
					<form onSubmit={handleSubmit} className={`relative bg-slate-50 p-8 rounded-3xl shadow-sm border max-w-md mx-auto text-left transition-colors duration-500 ${isDiscountActive ? 'border-green-400 shadow-xl shadow-green-100' : 'border-slate-100'}`}>
						
						{/* Visual Badge on Top of Form */}
						{isDiscountActive && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg animate-in fade-in slide-in-from-top-2">
								<Tag className="w-4 h-4" />
								Discount Active
							</div>
						)}

						{status === 'success' && (
							<div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
								<CheckCircle2 className="w-5 h-5" />
								<span>We received your details! We will call you shortly.</span>
							</div>
						)}

						<div className="mb-4 mt-2">
							<label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
							<input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full dark:text-white text-slate-900 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
							<input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full dark:text-white 	text-slate-900 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
							<input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 7674091177" className="w-full dark:text-white text-slate-900 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
						</div>

						{/* --- THIS IS THE VISUAL OFFER TICKET INSIDE THE FORM --- */}
						{isDiscountActive && (
							<div className="mb-6 p-3 bg-green-50 border border-dashed border-green-400 rounded-lg flex items-center justify-between animate-in fade-in zoom-in-95 duration-300">
								<div className="flex items-center gap-3">
									<div className="bg-green-100 p-2 rounded-full">
										<TicketPercent className="w-5 h-5 text-green-600" />
									</div>
									<div>
										<p className="text-sm font-bold text-green-800">Scholarship Applied</p>
										<p className="text-xs text-green-600">25% Off Coupon attached to your application.</p>
									</div>
								</div>
								<CheckCircle2 className="w-5 h-5 text-green-500" />
							</div>
						)}
						{/* ----------------------------------------------------------- */}
						
						<button 
							type="submit"
							disabled={status === 'submitting'}
							className={`w-full font-bold py-3 rounded-lg transition shadow-lg flex justify-center items-center gap-2 ${isDiscountActive ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'}`}
						>
							{status === 'submitting' ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									Sending...
								</>
							) : (
								isDiscountActive ? 'Submit Application with Discount' : 'Request Syllabus & Call Back'
							)}
						</button>
						
						<p className="text-xs text-center text-slate-400 mt-4">
							{isDiscountActive ? 'Offer valid for limited seats only.' : 'No spam. We only contact you regarding the course.'}
						</p>
					</form>
				</div>
			</section>

			{/* --- FOOTER --- */}
			<footer className="bg-slate-900 text-slate-300 py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<h3 className="text-white text-2xl font-bold mb-2">TPR CS</h3>
						<p className="text-sm text-slate-400">Building the next generation of developers.</p>
					</div>
					{/* Updated to show a direct, clickable phone number */}
					<div className="flex space-x-6 text-sm items-center">
						<a href="https://www.instagram.com/tprcs_web/" className="hover:text-white transition">Instagram</a>
						<a href="tel:+917674091177" className="hover:text-white transition font-semibold text-lg border-l border-slate-700 pl-6">
                            Contact: +917674091177
                        </a>
					</div>
				</div>
				<div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
					&copy; {new Date().getFullYear()} TPR CS. All rights reserved.
				</div>
			</footer>

			{/* --- FLOATING DISCOUNT AD BUTTON (NEW) --- */}
			{showFloatingAd && (
				<button 
					onClick={handleClaimOffer} 
					className="fixed bottom-6 right-6 z-50 p-3 lg:p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl shadow-red-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm lg:text-base font-bold animate-bounce-slow"
					style={{ animation: 'bounce-slow 3s infinite' }}
				>
					<TicketPercent className="w-5 h-5 lg:w-6 lg:h-6" />
					<span className="hidden sm:inline">Fill your details to get 25% off now!</span>
					<span className="inline sm:hidden">25% OFF! Claim Now</span>
				</button>
			)}

			{/* Custom CSS for the slow bounce animation */}
			<style jsx>{`
				@keyframes bounce-slow {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-8px);
					}
				}
				.animate-bounce-slow {
					animation: bounce-slow 3s infinite;
				}
			`}</style>
		</div>
	);
}