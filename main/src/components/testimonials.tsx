'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Startup Founder',
    content: 'The website development service exceeded my expectations. Professional, fast, and exactly what I needed to launch my business.',
    rating: 5,
    service: 'Website Development'
  },
  {
    name: 'Michael Chen',
    role: 'Student',
    content: 'Thanks to the abroad consultancy, I got accepted to my dream university in Canada. The guidance was invaluable throughout the process.',
    rating: 5,
    service: 'Abroad Consultancy'
  },
  {
    name: 'Priya Patel',
    role: 'Investment Banker',
    content: 'The mutual funds advice helped me diversify my portfolio and achieve better returns. Highly recommended for investment planning.',
    rating: 5,
    service: 'Mutual Funds'
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">Clients</span> Say
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Hear from satisfied clients who have achieved their goals with our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-teal-500 mb-4" />
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                   &quot;{testimonial.content}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                      {testimonial.service}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}