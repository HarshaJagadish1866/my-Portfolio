import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"
import { LiquidGlassCursor } from "@/components/liquid-glass-cursor"
import { portfolioData } from "@/data/portfolio"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harsha-jagadish.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${portfolioData.owner.name} | Data Science & AI Engineer`,
  description: portfolioData.owner.aboutMe,
  keywords: [
    "Harsha Jagadish",
    "IIT Madras",
    "Data Science",
    "AI Engineer",
    "Multi-agent Systems",
    "Google ADK",
    "Arbitr-AI",
    "Voyager",
    "LLM Applications",
    "Python Developer",
  ],
  authors: [{ name: portfolioData.owner.name, url: siteUrl }],
  creator: portfolioData.owner.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${portfolioData.owner.name} | Data Science & AI Engineer`,
    description: portfolioData.owner.tagline,
    url: siteUrl,
    siteName: `${portfolioData.owner.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.owner.name} | Data Science & AI Engineer`,
    description: portfolioData.owner.tagline,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.owner.name,
    jobTitle: "Data Science & AI Engineer",
    url: siteUrl,
    image: `${siteUrl}/photo.jpg`,
    description: portfolioData.owner.aboutMe,
    sameAs: [portfolioData.owner.linkedIn, portfolioData.owner.github],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology, Madras",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Multi-agent Systems",
      "Google Agent Development Kit (ADK)",
      "Data Science",
      "Python",
      "LLM Application Development",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-cyan-500 selection:text-black"
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <AnalyticsWrapper />
          <LiquidGlassCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
