'use client'


import { Facebook, Twitter, Linkedin as LinkedIn, Instagram, ArrowUp } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  
  // const socialLinks = [
  //   { icon: Facebook, href: '#', label: 'Facebook' },
  //   { icon: Twitter, href: '#', label: 'Twitter' },
  //   { icon: LinkedIn, href: '#', label: 'LinkedIn' },
  //   { icon: Instagram, href: '#', label: 'Instagram' }
  // ]

  const footerLinks = {
    'Services': [
      { name: 'Website Development', href: '#' },
      { name: 'Abroad Consultancy', href: '#' },
      { name: 'Mutual Funds', href: '#' }
    ],
    'Company': [
      { name: 'About Us', href: '#about' },
     
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    
  }

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-8 bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TPR</span>
              </div>
              <span className="font-bold text-xl">Services</span>
            </Link>
            <p className="text-slate-300 mb-6 max-w-md">
              We provide comprehensive solutions for website development, abroad consultancy, 
              and mutual fund investments to help you achieve your goals.
            </p>
            {/* <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div> */}
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm mb-4 md:mb-0">
            © 2017 TPRCS. All rights reserved. Powered by innovation.
          </p>
          
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  )
}