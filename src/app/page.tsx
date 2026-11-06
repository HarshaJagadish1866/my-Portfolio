import { portfolioData } from "@/data/portfolio"
import { Hero } from "@/components/sections/hero"
import { StatsStrip } from "@/components/sections/stats-strip"
import { About } from "@/components/sections/about"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { ContactAndGuestbook } from "@/components/sections/contact-and-guestbook"

export default function Home() {
  const { owner } = portfolioData

  return (
    <main className="flex-1 flex flex-col">
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
      <footer className="py-10 border-t border-border/60 bg-background text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 {owner.name}. All verified data wired via TypeScript.</div>
          <div className="flex items-center gap-6 font-mono">
            <a href={owner.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">GitHub</a>
            <a href={owner.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">LinkedIn</a>
            <a href={`mailto:${owner.email}`} className="hover:text-cyan-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
