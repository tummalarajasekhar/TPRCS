'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { SERVICES } from '../lib/constants'
import { getServiceUrl } from '../lib/subdomain'

const iconMap = {
  Code,
  Globe, 
  TrendingUp
}

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We offer comprehensive solutions to help you achieve your goals across different domains
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full border-2 border-transparent hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {service.benefits}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                        {service.pricing}
                      </span>
                      <Link href={getServiceUrl(service.id)}>
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white group-hover:shadow-lg transition-all duration-300">
                          Explore {service.name.split(' ')[0]}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
