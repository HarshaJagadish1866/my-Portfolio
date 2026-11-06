import { portfolioData } from "@/data/portfolio"
import { Hero } from "@/components/sections/hero"
import { BookOpen, Award, Layers, Terminal, Mail, MessageSquare, ArrowUpRight } from "lucide-react"

export default function Home() {
  const { owner, education, projects, certifications, skills } = portfolioData

  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Placeholder / Anchor */}
      <section id="about" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>02</span>
            <span>/</span>
            <span>About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Background & Focus
          </h2>
          <div className="p-8 rounded-3xl bg-secondary/30 border border-border/60 backdrop-blur-sm max-w-3xl">
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {owner.aboutMe}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Education Placeholder / Anchor */}
      <section id="education" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>03</span>
            <span>/</span>
            <span>Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Academic Foundation
          </h2>
          <div className="p-6 sm:p-8 rounded-3xl bg-secondary/30 border border-border/60 max-w-2xl flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{education[0].institution}</h3>
              <p className="text-cyan-400 font-medium text-sm mt-0.5">{education[0].degree}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono mt-3">
                <span className="px-2.5 py-1 rounded-md bg-secondary border border-border">{education[0].period}</span>
                {education[0].certificate && (
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {education[0].certificate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Skills Placeholder / Anchor */}
      <section id="skills" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>04</span>
            <span>/</span>
            <span>Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Technical Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((group) => (
              <div key={group.category} className="p-6 rounded-2xl bg-secondary/30 border border-border/60">
                <div className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs bg-background/80 text-muted-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Projects Placeholder / Anchor */}
      <section id="projects" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>05</span>
            <span>/</span>
            <span>Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Featured AI & Agent Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-8 rounded-3xl bg-secondary/30 border border-border/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      {proj.status}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{proj.period}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{proj.summary}</p>
                </div>
                <div className="pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Contributors: {proj.contributors.join(", ")}</span>
                  <Terminal className="w-4 h-4 text-cyan-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Certifications Placeholder / Anchor */}
      <section id="certifications" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>06</span>
            <span>/</span>
            <span>Certifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
            Verified Credentials ({certifications.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.slice(0, 6).map((cert) => (
              <div key={cert.id} className="p-5 rounded-2xl bg-secondary/30 border border-border/60">
                <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-2">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm">{cert.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact & Guestbook Placeholder / Anchor */}
      <section id="contact" className="py-20 border-t border-border/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>07</span>
            <span>/</span>
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Let's Collaborate
          </h2>
          <p className="text-muted-foreground max-w-xl mb-8">
            Interested in multi-agent workflows, data science research, or building AI solutions together?
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${owner.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>{owner.email}</span>
            </a>
            <a
              href={owner.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border bg-secondary/50 text-foreground font-semibold text-sm hover:border-cyan-500/40 transition-all"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-500" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-8 border-t border-border/60 bg-background/80 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 {owner.name}. Built with Next.js, Motion & Anime.js.</div>
          <div className="flex items-center gap-5 font-mono">
            <a href={owner.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">GitHub</a>
            <a href={owner.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">LinkedIn</a>
            <a href={`mailto:${owner.email}`} className="hover:text-cyan-500 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
