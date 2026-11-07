"use client"

import * as React from "react"
import { portfolioData } from "@/data/portfolio"
import { trackResumeDownload } from "@/lib/analytics"
import { SocialLinks } from "@/components/social-links"
import { FileText } from "lucide-react"

export function Footer() {
  const { owner } = portfolioData

  return (
    <footer className="py-12 border-t border-border/60 bg-background text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span>© 2026 {owner.name}. All verified data wired via TypeScript.</span>
          <a
            href={owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackResumeDownload}
            data-glass-type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/70 bg-card text-foreground hover:border-primary hover:text-primary font-mono transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Social Links Pill Group */}
        <SocialLinks />
      </div>
    </footer>
  )
}
