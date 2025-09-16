'use client'

import { motion } from 'framer-motion'
import { ArrowRight, } from 'lucide-react'
import { Button } from './ui/button'


interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
  onCtaClick?: () => void
  showVideo?: boolean
}

export function Hero({ 
  title, 
  subtitle, 
  ctaText = "Explore Services", 
  onCtaClick,
   
}: HeroProps) {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {title.split(' ').map((word, index) => (
              <span key={index} className={index === title.split(' ').length - 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold group"
              onClick={onCtaClick || scrollToServices}
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16"
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-teal-100 to-amber-100 dark:from-teal-900 dark:to-amber-900 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className='flex flex-col'>
                <div className="text-4xl md:text-6xl text-teal-600 dark:text-teal-400 font-bold">
                  want a website?
                </div>
                <div className="text-4xl md:text-6xl text-teal-600 dark:text-teal-400 font-bold">
                  want to go to abroad?
                </div>
                <div className="text-4xl md:text-6xl text-teal-600 dark:text-teal-400 font-bold">
                  want an app?
                </div>
                <div className="text-xl md:text-6xl text-teal-600 dark:text-teal-400 font-bold">
                  you are at right place..
                </div>
              </div>
              </div>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}