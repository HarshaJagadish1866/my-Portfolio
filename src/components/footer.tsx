"use client"

import * as React from "react"
import { portfolioData } from "@/data/portfolio"
import { SocialLinks } from "@/components/social-links"

export function Footer() {
  const { owner } = portfolioData

  return (
    <footer className="py-12 border-t border-border bg-background text-xs text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span>© 2026 {owner.name}.</span>
        </div>

        {/* Social Links Pill Group */}
        <SocialLinks />
      </div>
    </footer>
  )
}
