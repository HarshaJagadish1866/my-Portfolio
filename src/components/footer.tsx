"use client"

import { portfolioData } from "@/data/portfolio"
import { trackSocialLinkClick } from "@/lib/analytics"

export function Footer() {
  const { owner } = portfolioData

  return (
    <footer className="py-10 border-t border-border/60 bg-background text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 {owner.name}. All verified data wired via TypeScript.</div>
        <div className="flex items-center gap-6 font-mono">
          <a
            href={owner.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialLinkClick("GitHub")}
            className="hover:text-cyan-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href={owner.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialLinkClick("LinkedIn")}
            className="hover:text-cyan-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${owner.email}`}
            onClick={() => trackSocialLinkClick("Email")}
            className="hover:text-cyan-500 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
