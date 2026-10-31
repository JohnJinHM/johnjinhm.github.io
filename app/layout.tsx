import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import RouteAccent from '@/components/RouteAccent'
import Scene from '@/components/Scene'
import { LocaleProvider } from '@/components/LocaleProvider'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '700', '900'],
  variable: '--font-red-hat-display',
})

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-red-hat-text',
})

const redHatMono = Red_Hat_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-red-hat-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${redHatDisplay.variable} ${redHatText.variable} ${redHatMono.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#0a0b1c" />
      <meta name="theme-color" content="#0a0b1c" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-ground text-ink antialiased">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <RouteAccent>
            <LocaleProvider>
              <Scene />
              <div className="relative flex min-h-screen flex-col">
                <SectionContainer className="flex-1">
                  <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                    <Header />
                    <main>{children}</main>
                  </SearchProvider>
                </SectionContainer>
                <SectionContainer>
                  <Footer />
                </SectionContainer>
              </div>
            </LocaleProvider>
          </RouteAccent>
        </ThemeProviders>
      </body>
    </html>
  )
}
