import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { I18nProvider } from "@/lib/i18n"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })
const display = Manrope({ subsets: ["latin"], variable: "--font-display" })

// Basic SEO for Cyprus demo
export const metadata: Metadata = {
  title: "Pawsome Grooming Cyprus - Professional Pet Grooming in Nicosia",
  description: "Professional dog & cat grooming in Nicosia, Cyprus. Book your appointment today!",
  // generator removed for cleanliness
  // Use site icons from public/logos (for clarity and consistency across platforms)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pawsome-grooming.vercel.app"),
  verification: {
    google: 'your-google-site-verification-id', // Add your Google verification ID
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "el": "/?lang=el",
    },
  },
  keywords: [
    "pet grooming",
    "dog grooming Nicosia",
    "cat grooming Cyprus",
    "pet salon",
    "full grooming",
  ],
  category: "Pets & Animals",
  openGraph: {
    type: "website",
    url: "/",
    title: "Pawsome Grooming Cyprus",
    description:
      "Professional dog & cat grooming in Nicosia, Cyprus. Book your appointment today!",
    siteName: "Pawsome Grooming Cyprus",
    locale: "en_GB",
    images: [
      {
        url: "/logos/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Pawsome Grooming Cyprus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawsome Grooming Cyprus",
    description:
      "Professional dog & cat grooming in Nicosia, Cyprus. Book your appointment today!",
    images: ["/logos/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: "/logos/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logos/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logos/apple-touch-icon.png",
    shortcut: "/logos/favicon.ico",
    other: [
      { rel: "android-chrome-192x192", url: "/logos/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/logos/android-chrome-512x512.png" },
    ],
  },
}

// Hreflang and preconnect links for better SEO and performance
const Preconnect = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
)

// Ensure proper scaling on mobile without disabling zoom
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${display.variable}`}>
        <Preconnect />
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
