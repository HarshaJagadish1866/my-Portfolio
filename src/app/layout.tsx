import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProgress } from "@/components/scroll-progress"
import { Navbar } from "@/components/navbar"
import { portfolioData } from "@/data/portfolio"

export const metadata: Metadata = {
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
  ],
  authors: [{ name: portfolioData.owner.name }],
  openGraph: {
    title: `${portfolioData.owner.name} | Data Science & AI Engineer`,
    description: portfolioData.owner.tagline,
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-cyan-500 selection:text-black"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
