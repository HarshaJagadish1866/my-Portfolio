import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { AnalyticsWrapper } from "@/components/analytics-wrapper"
import { GlobalLiquidCursor } from "@/components/global-liquid-cursor"
import { GoogleAnalytics } from "@next/third-parties/google"
import { portfolioData } from "@/data/portfolio"
import { GA_MEASUREMENT_ID } from "@/lib/analytics"

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
        {/* Clean up browser extension DOM attribute injection (e.g. Bitdefender bis_skin_checked) before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    var clean = function(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
      if (node.hasAttribute('bis_register')) node.removeAttribute('bis_register');
    };
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.type === 'attributes') {
            clean(m.target);
          } else if (m.type === 'childList') {
            for (var j = 0; j < m.addedNodes.length; j++) {
              clean(m.addedNodes[j]);
            }
          }
        }
      }).observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['bis_skin_checked', 'bis_register']
      });
    }
  } catch (e) {}
})();`,
          }}
        />
        {/* Google Consent Mode v2: default to denied until user consents, or restore granted if previously accepted */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    var hasConsent = false;
    try {
      hasConsent = localStorage.getItem('portfolio_cookie_consent') === 'accepted';
    } catch (e) {}
    gtag('consent', 'default', {
      'analytics_storage': hasConsent ? 'granted' : 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  } catch (e) {}
})();`,
          }}
        />
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
          <GlobalLiquidCursor />
          <ScrollProgress />
          <Navbar />
          <div suppressHydrationWarning className="flex-1 flex flex-col">
            {children}
          </div>
          <AnalyticsWrapper />
          {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
        </ThemeProvider>
      </body>
    </html>
  )
}
