'use client'

import { motion } from 'framer-motion'
import { MessageCircle, FileText, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
const steps = [
  {
    icon: MessageCircle,
    title: 'Initial Consultation',
    description: 'We discuss your needs and goals to understand your requirements'
  },
  {
    icon: FileText,
    title: 'Custom Strategy',
    description: 'We create a tailored plan that aligns with your objectives'
  },
  {
    icon: Zap,
    title: 'Execute & Deliver',
    description: 'We implement the solution and deliver exceptional results'
  }
]

export function HowItWorks() {
  const router = useRouter()
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 z-10">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">Works</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our streamlined process ensures you get the best results every time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Mobile progress line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-300 to-amber-300 md:hidden z-0"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <step.icon className="w-8 h-8 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
              
              
              
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-teal-600 to-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:from-teal-700 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => {router.push('/#contact')}}>
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}