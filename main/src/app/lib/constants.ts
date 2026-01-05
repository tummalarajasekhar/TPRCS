export const MAIN_DOMAIN = process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost:3000'
export const CONTACT_EMAIL = 'team@yourdomain.com'

export const SERVICES = [
  {
    id: 'web',
    name: 'Website Development',
    subdomain: 'web',
    description: 'Custom websites that convert visitors into customers',
    icon: 'Code',
    benefits: 'Modern, responsive, and SEO-optimized websites',
    features: ['Custom Design', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
    pricing: 'Starting from ₹2000'
  },
  {
    id: 'abroad',
    name: 'Abroad Consultancy', 
    subdomain: 'abroad',
    description: 'Expert guidance for studying and working abroad',
    icon: 'Globe',
    benefits: 'Navigate visa processes and university applications',
    features: ['Visa Assistance', 'University Selection', 'Application Support', 'Interview Prep'],
    pricing: 'Starting from ₹6000'
  },
  {
    id: 'mutuals',
    name: 'Mutual Funds',
    subdomain: 'mutuals',
    description: 'Smart investment strategies for your financial future',
    icon: 'TrendingUp',
    benefits: 'Professional portfolio management and investment advice',
    features: ['Portfolio Analysis', 'Risk Assessment', 'Goal Planning', 'Regular Reviews'],
    pricing: 'Free consultation'
  }
]

export const BRAND_COLORS = {
  primary: '#0f172a',
  accent: '#0ea5a4', 
  accent2: '#f59e0b'
}