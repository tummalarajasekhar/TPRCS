'use client'

import { useEffect, useState, Suspense } from 'react'

import { Header } from '../components/header'
import { Hero } from '../components/hero'
import { ServicesGrid } from '../components/services-grid'
import { HowItWorks } from '../components/how-it-works'
import { Testimonials } from '../components/testimonials'
import { ContactForm } from '../components/contact-form'
import { Footer } from '../components/footer'
import { ServicePage } from '../components/service-page'
import { SERVICES } from '../lib/constants'
import About from '../components/About'
import SpecialOffer from '../components/specialOffer'
import { usePathname, useSearchParams } from 'next/navigation'


// 👇 Move the searchParams logic into a child component
function HomeContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')

  // Check if we're showing a specific service (for subdomain simulation)
  const currentService = serviceParam ? SERVICES.find(s => s.id === serviceParam) : null
  useEffect(() => {
  if (window.location.hash === '#contact') {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}, [pathname])
  if (currentService) {
    return (
      <>
        <Header showBackButton serviceName={currentService.name} />
        <ServicePage service={currentService} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Transform Your Vision Into Reality"
          subtitle="Professional services for website development, abroad consultancy, and smart investment strategies. Let us help you achieve your goals with expert guidance and proven solutions."
          showVideo
        />
        <SpecialOffer />
        <ServicesGrid />
        <About />
        <HowItWorks />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-slate-900" />
  }

  return (
    // 👇 Wrap inside Suspense
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-slate-900" />}>
      <HomeContent />
    </Suspense>
  )
}
