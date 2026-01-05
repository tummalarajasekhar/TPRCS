// app/signup/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EduAuthLayout from '../components/EduAuthLayout';

// --- ICONS ---
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
);

// Loading Spinner Component
const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SignupPage = () => {
  const router = useRouter();

  // State Management
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // <--- LOADING STATE
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.server) {
      setErrors((prev) => ({ ...prev, [name]: '', server: '' }));
    }
    if (name === 'password') calculateStrength(value);
  };

  const calculateStrength = (pass) => {
    let score = 0;
    if (!pass) return setPasswordStrength(0);
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    setPasswordStrength(score);
  };

  const getStrengthMeta = () => {
    switch (passwordStrength) {
      case 0: return { color: 'bg-gray-200', text: '', width: '0%' };
      case 1: return { color: 'bg-red-500', text: 'Weak', width: '25%' };
      case 2: return { color: 'bg-orange-500', text: 'Fair', width: '50%' };
      case 3: return { color: 'bg-blue-500', text: 'Good', width: '75%' };
      case 4: return { color: 'bg-green-500', text: 'Strong', width: '100%' };
      default: return { color: 'bg-gray-200', text: '', width: '0%' };
    }
  };

  // --- SUBMIT STEP 1 (Signup) ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (passwordStrength < 3) newErrors.password = "Password is too weak.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // START LOADING
    setIsLoading(true); 

    try {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await res.json();
        
        if (res.ok) {
            setStep(2); 
        } else {
            setErrors({ server: data.error }); 
        }
    } catch (err) {
        setErrors({ server: "Something went wrong. Please try again." });
    } finally {
        // STOP LOADING
        setIsLoading(false);
    }
  };

  // --- SUBMIT STEP 2 (OTP) ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.otp.trim()) {
      setErrors({ otp: "Please enter the OTP" });
      return;
    }

    // START LOADING
    setIsLoading(true);

    try {
        const res = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, otp: formData.otp })
        });
        
        if (res.ok) {
            router.push('dashboard');
            // We don't set loading false here because we are redirecting
        } else {
            const data = await res.json();
            setErrors({ otp: data.error });
            setIsLoading(false); // Stop loading on error
        }
    } catch (err) {
        console.error(err);
        setErrors({ otp: "Verification failed" });
        setIsLoading(false);
    }
  };

  const strengthMeta = getStrengthMeta();

  return (
    <EduAuthLayout 
      title={step === 1 ? "Start learning today" : "Verify your account"} 
      subtitle={step === 1 ? "Already have an account?" : "We sent a code to your email"}
      formType={step === 1 ? "signup" : "login"}
    >
      {/* STEP 1: SIGNUP FORM */}
      {step === 1 && (
        <form onSubmit={handleSignupSubmit} className="space-y-5" noValidate>
          {/* Server Error Alert */}
          {errors.server && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.server}
            </div>
          )}

          {/* Fields (Name, Email, Password, Confirm) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div className="mt-1">
              <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-white transition sm:text-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} placeholder="John Doe" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
            <div className="mt-1">
              <input name="email" type="email" value={formData.email} onChange={handleChange} className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-white transition sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} placeholder="name@company.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="mt-1 relative">
              <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-white transition sm:text-sm pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {formData.password && (
              <div className="mt-2">
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${strengthMeta.color} transition-all duration-300`} style={{ width: strengthMeta.width }}></div>
                </div>
                <p className={`text-xs mt-1 font-medium ${passwordStrength < 2 ? 'text-red-500' : passwordStrength < 4 ? 'text-blue-500' : 'text-green-500'}`}>Security: {strengthMeta.text}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Re-enter Password</label>
            <div className="mt-1">
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-white transition sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} placeholder="Confirm password" />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* SIGNUP BUTTON WITH LOADER */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {isLoading ? <Spinner /> : "Create Account & Send OTP"}
          </button>
          <a 
  href="/api/auth/google"
  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-900 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 cursor-pointer"
>
    <span className="sr-only">Sign in with Google</span>
    <svg className="h-5 w-5" viewBox="0 0 24 24">
       <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
       <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
       <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
       <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
</a>
        </form>
      )}

      {/* STEP 2: OTP FORM */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <div className="text-center mb-4">
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Please enter the OTP sent to <strong>{formData.email}</strong>
             </p>
          </div>
          
          {errors.otp && (
             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">{errors.otp}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">One Time Password</label>
            <div className="mt-1">
              <input name="otp" type="text" value={formData.otp} onChange={handleChange} className={`appearance-none block w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-900 dark:text-white transition sm:text-sm ${errors.otp ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`} placeholder="Enter 6-digit code" />
            </div>
          </div>

          {/* VERIFY BUTTON WITH LOADER */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-green-500/30 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
          >
             {isLoading ? <Spinner /> : "Verify & Go to Dashboard"}
          </button>
          
          <button 
            type="button" 
            onClick={() => setStep(1)}
            disabled={isLoading} // Disable back button while loading
            className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 mt-2 disabled:text-gray-400"
          >
            Back to Signup
          </button>
        </form>
      )}

    </EduAuthLayout>
  );
};

export default SignupPage;