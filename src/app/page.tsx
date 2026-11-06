import { portfolioData } from "@/data/portfolio"
import { Hero } from "@/components/sections/hero"
import { StatsStrip } from "@/components/sections/stats-strip"
import { About } from "@/components/sections/about"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { Mail, ArrowUpRight, MessageSquare } from "lucide-react"

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

      {/* 5. Projects Section (Extensible Cards) */}
      <Projects />

      {/* 6. Certifications Section (Vertical Timeline with Issuer Filter) */}
      <Certifications />

      {/* 7. Contact Anchor (Phase 5 will add Supabase Contact Form & Guestbook) */}
      <section id="contact" className="py-24 border-t border-border/40 scroll-mt-20 relative bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>07</span>
            <span>/</span>
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Let's Collaborate
          </h2>
          <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
            Interested in multi-agent workflows, data science research, or building AI solutions together? Reach out directly or connect on professional channels.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${owner.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{owner.email}</span>
            </a>
            <a
              href={owner.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border bg-secondary/50 text-foreground font-semibold text-sm hover:border-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-500" />
            </a>
          </div>
        </div>
      </section>

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
