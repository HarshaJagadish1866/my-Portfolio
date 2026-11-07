"use client"

import * as React from "react"
import { portfolioData, type SocialLink } from "@/data/portfolio"
import { SocialIcon } from "@/components/icons/social-icons"
import { trackSocialLinkClick } from "@/lib/analytics"
import { cn } from "@/lib/utils"

interface SocialLinksProps {
  className?: string
  pillClassName?: string
  links?: SocialLink[]
}

export function SocialLinks({ className, pillClassName, links }: SocialLinksProps) {
  const items = links || portfolioData.owner.socialLinks || []

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {items.map((link) => {
        const isExternal = !link.href.startsWith("mailto:")

        return (
          <a
            key={link.platform}
            href={link.href}
            data-glass-type="button"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={`${link.label} (opens ${isExternal ? "in a new tab" : "email application"})`}
            onClick={() => trackSocialLinkClick(link.platform)}
            className={cn(
              "group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full",
              "border border-border/80 bg-card/70 text-foreground/90 text-xs font-mono font-medium",
              "transition-all duration-200 select-none cursor-pointer",
              "hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_14px_rgba(249,115,22,0.25)] hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
              pillClassName
            )}
          >
            <span className="text-muted-foreground group-hover:text-orange-400 transition-colors">
              <SocialIcon platform={link.platform} className="w-3.5 h-3.5" />
            </span>
            <span>{link.label}</span>
          </a>
        )
      })}
    </div>
  )
}
