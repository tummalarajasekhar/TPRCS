import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TPRCS- Professional Services | Web Development, Abroad Consultancy & Mutual Funds',
  description: 'Professional services for website development, abroad consultancy, and mutual fund investments. Get expert guidance and solutions tailored to your needs.',
  keywords: 'website development, abroad consultancy, mutual funds, professional services, web design',
  authors: [{ name: 'TPRCS Team' }],
  openGraph: {
    title: 'TPRCS - Professional Services',
    description: 'Professional services for website development, abroad consultancy, and mutual fund investments.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TPRCS - Professional Services',
    description: 'Professional services for website development, abroad consultancy, and mutual fund investments.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/logo.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TPRCS",
              "description": "Professional services for website development, abroad consultancy, and mutual fund investments",
              "url": "https://tprcs.com",
              "logo": "https://tprcs.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "info@tprcs.com"
              },
              
              "service": [
                {
                  "@type": "Service",
                  "name": "Website Development",
                  "description": "Custom websites that convert visitors into customers"
                },
                {
                  "@type": "Service", 
                  "name": "Abroad Consultancy",
                  "description": "Expert guidance for studying and working abroad"
                },
                {
                  "@type": "Service",
                  "name": "Mutual Funds",
                  "description": "Smart investment strategies for your financial future"
                }
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}