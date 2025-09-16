'use client'

import { useParams } from 'next/navigation'
import { ServicePage } from '@/src/components/service-page'
import { SERVICES } from '@/src/lib/constants'
import { Header } from '@/src/components/header'
import { Footer } from '@/src/components/footer'

export default function PageWrapper() {
  const params = useParams()
  const serviceId = params.id
  const service = SERVICES.find(s => s.id === serviceId)

  if (!service) {
    return (
      <div className="p-10 text-center text-red-600">
        Service not found
      </div>
    )
  }

  return (
    <>
      <Header showBackButton serviceName={service.name} />
      <ServicePage service={service} />
      <Footer   />
    </>
  )
}
