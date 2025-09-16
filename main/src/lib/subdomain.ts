import { SERVICES } from './constants'

export function getServiceFromSubdomain(host: string) {
  if (!host) return null
  
  const subdomain = host.split('.')[0]
  return SERVICES.find(service => service.subdomain === subdomain)
}

export function getServiceUrl(serviceId: string) {
  const service = SERVICES.find(s => s.id === serviceId)
  if (!service) return '/'
  
  if (process.env.NODE_ENV === 'production') {
    return `https://${service.subdomain}.yourdomain.com`
  }
  return `/?service=${serviceId}`
}

export function isSubdomain(host: string) {
  if (!host) return false
  
  const parts = host.split('.')
  if (process.env.NODE_ENV === 'production') {
    return parts.length > 2 || (parts.length === 2 && parts[0] !== 'yourdomain')
  }
  return false
}