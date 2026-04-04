import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://harshavardhini.com'),
  title: 'Harsha Vardhini Veeravalli Prabu | Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization. University Gold Medalist. MS Marketing at UT Dallas.',
  openGraph: {
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, social media, and campaign optimization specialist. Open to full-time marketing roles in the US.',
    url: 'https://harshavardhini.com',
    siteName: 'Harsha Vardhini Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harsha Vardhini Veeravalli Prabu -- Digital Marketing Professional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, and campaign optimization specialist. MS Marketing at UT Dallas.',
  },
  alternates: { canonical: 'https://harshavardhini.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harsha Vardhini Veeravalli Prabu',
  url: 'https://harshavardhini.com',
  email: 'harshavprabu@gmail.com',
  jobTitle: 'Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization.',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'The University of Texas at Dallas',
    },
    { '@type': 'CollegeOrUniversity', name: 'University of Madras' },
  ],
  knowsAbout: [
    'SEO',
    'SEM',
    'Social Media Marketing',
    'Campaign Optimization',
    'Google Analytics',
    'HubSpot',
    'Meta Ads Manager',
    'Shopify',
    'SEMrush',
  ],
  sameAs: ['https://www.linkedin.com/in/hveeravalliprabu'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
