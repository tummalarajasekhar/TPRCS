'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";


export default function RequestCallback() {
    const [showForm, setShowForm] = useState(false);
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!(phone && !/^(\+91\d{10}|\d{10})$/.test(phone))) {
            // Send phone number to backend or API
            try {
                const response = await fetch('https://rajabackend.srikrishnatechhub.com/request-callback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone })
                });
                if (!response.ok) {

                    // alert('Failed to submit. Please try again later.');
                    return;
                }
            } catch (error) {
                // alert('An error occurred. Please try again later.');
                console.error("Error submitting phone:", error);
                return;
            }
            console.log("Phone submitted:", phone);
            // alert(`Thank you! We'll call you at ${phone}`);
            setPhone("");
            
            setShowForm(false);
            setLoading(true);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-auto m-2">
            {!showForm ? (
                <motion.button
                    whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(255,165,0,0.6)" }}
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r 
                     from-orange-500 to-orange-600 text-white px-10 py-4 text-lg font-bold 
                     rounded-full shadow-lg relative overflow-hidden transition"
                >
                    <FaPhoneAlt className="mr-2 text-xl" /> Request Callback
                </motion.button>
            ) : (
                <motion.form
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-80"
                >
                    <h3 className="text-lg font-semibold text-gray-700">Enter your phone number</h3>
                    {phone && !/^(\+91\d{10}|\d{10})$/.test(phone) && (
                        <div className="text-red-500 text-sm mb-1">
                            Please enter a valid 10-digit number or start with +91.
                        </div>
                    )}
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className="border border-gray-300 rounded px-3 py-2 bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                            ) : (
                                "Request Callback"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.form>
            )}
        </div>
    );
}
