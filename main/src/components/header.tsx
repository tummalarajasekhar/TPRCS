
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Phone } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import InputBox from './inputBox'
interface HeaderProps {
  showBackButton?: boolean
  serviceName?: string
}

export function Header({ showBackButton = false, serviceName }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-gradient-to-br from-teal-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TPR</span>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white hidden md:block">
                Services
              </span>
            </Link>
            
            {showBackButton && (
              <Link 
                href="/"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                ← Back to Services
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!showBackButton && navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            
            {showBackButton && serviceName && (
              <span className="text-slate-600 dark:text-slate-300">
                {serviceName}
              </span>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="text-slate-600 dark:text-slate-300"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* CTA Button */}
           {!callback && (<Button className="hidden sm:flex bg-teal-600 hover:bg-teal-700 text-white" onClick={() => setCallback(true)}>
              <Phone className="w-4 h-4 mr-2" />
              Request Callback
            </Button>)}
            <div className='hidden sm:block'>
{callback && (<InputBox onSubmit={() => setCallback(false)} />)}
</div>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800"
          >
            <nav className="flex flex-col space-y-4">
              {!showBackButton && navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
             {!callback && (<Button className="w-full sm:hidden bg-teal-600 hover:bg-teal-700 text-white" onClick={() => { setCallback(true);  }}>
                <Phone className="w-4 h-4 mr-2" />
                Request Callback
              </Button>)}
              
              {callback && (<div className='w-full'><InputBox onSubmit={() => { setCallback(false); }} /></div>)}

            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}