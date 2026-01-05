// components/EduAuthLayout.jsx
import Link from 'next/link';

const EduAuthLayout = ({ title, subtitle, children, formType }) => {
  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-950">
      {/* LEFT SIDE: Form Area 
        Takes up 100% on mobile, 40-50% on desktop.
      */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-[45%] z-10">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Brand Logo / Home Link */}
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all"></div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                TPR CS
              </span>
            </Link>
          </div>

          {/* Header Text */}
          <div className="text-left">
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}{" "}
              <Link 
                href={formType === 'login' ? 'signup' : 'login'} 
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                {( title !== "Verify your account" &&title !== "Forgot Password") && (formType === 'login'  ? 'Create an account' : 'Log in now')}
              </Link>
            </p>
          </div>

          {/* Form Container */}
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Visual/Brand Area 
        Hidden on mobile, visible on lg screens.
        Contains the "Vibe" of the EduTech platform.
      */}
      <div className="relative hidden w-0 flex-1 lg:block">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
           {/* Abstract decorative shapes */}
           <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-3xl"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-20 z-20">
          <blockquote className="space-y-6">
            <div className="relative">
              {/* Giant quote mark decoration */}
              <svg className="absolute -top-8 -left-8 h-12 w-12 text-white/10" fill="currentColor" viewBox="0 0 32 32">
                 <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-2xl font-medium leading-relaxed text-white">
                "This platform completely transformed my career. The MERN stack courses are comprehensive and the projects are real-world ready."
              </p>
            </div>
            <footer className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <div className="text-base font-semibold text-white">John Developer</div>
                <div className="text-sm text-indigo-200">Full Stack Engineer @ TechCorp</div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default EduAuthLayout;