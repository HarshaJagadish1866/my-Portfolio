import { portfolioData } from "@/data/portfolio"
import { Hero } from "@/components/sections/hero"
import { StatsStrip } from "@/components/sections/stats-strip"
import { About } from "@/components/sections/about"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { ContactAndGuestbook } from "@/components/sections/contact-and-guestbook"
import { Footer } from "@/components/footer"

export default function Home() {
  const { owner } = portfolioData

  return (
    <main id="main-content" className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* Real-time Computed Stats Strip with Anime.js Counter */}
      <StatsStrip />

      {/* 2. About Section */}
      <About />

      {/* 3. Education Section */}
      <Education />

      {/* 4. Skills Section (Grouped & Filterable) */}
      <Skills />

      {/* 5. Projects Section (Extensible Cards with View Counters) */}
      <Projects />

      {/* 6. Certifications Section (Vertical Timeline with Issuer Filter) */}
      <Certifications />

      {/* 7. Contact & Guestbook Section (Supabase Powered) */}
      <ContactAndGuestbook />

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}
