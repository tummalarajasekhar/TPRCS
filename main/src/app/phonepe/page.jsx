"use client"; // This must be a Client Component to use hooks and handle user interaction

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// A simple utility to generate a unique ID for the transaction
const generateUniqueId = () => `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

export default function CheckoutPage() {
  const router = useRouter();
  const [amount, setAmount] = useState(100); // Default amount in Rupees (e.g., ₹100)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Securely initiates the payment flow by calling the backend API.
   * @param {number} paymentAmount - The amount to pay in Rupees.
   */
  const handlePay = async (paymentAmount) => {
    setLoading(true);
    setError(null);

    // 1. Prepare the non-sensitive data to send to the backend
    const orderData = {
      amount: paymentAmount, // The amount will be validated and converted to paise on the server
      userId: 'user-001', // Get this from your actual authentication context
      merchantOrderId: generateUniqueId(), // Unique order ID for this transaction
    };

    try {
      // 2. Call your secure Route Handler
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.success && data.redirectUrl) {
        // 3. **Success:** Redirect the user to the official PhonePe payment URL
        console.log('Redirecting to PhonePe:', data.redirectUrl);
        router.push(data.redirectUrl);
      } else {
        // 4. Handle known API errors
        setError(data.message || 'Payment initiation failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      // 5. Handle network or unexpected errors
      console.error('Checkout failed:', err);
      setError('An unexpected network error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Secure Checkout</h1>
        
        {/* Input Field for Testing */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Amount (₹):
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-blue-500 focus:border-blue-500"
          min="1"
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={() => handlePay(amount)}
          disabled={loading || amount <= 0}
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-300 ${
            loading || amount <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-md'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Processing...
              {/* Simple spinner */}
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            `Pay ₹${amount.toFixed(2)} with PhonePe`
          )}
        </button>
      </div>
    </div>
  );
}