"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { portfolioData, type CertificationItem } from "@/data/portfolio"
import { IssuerLogoTile } from "@/components/icons/issuer-logos"
import { trackCertificateLinkClick } from "@/lib/analytics"

export function Certifications() {
  const shouldReduceMotion = useReducedMotion()
  const { certifications } = portfolioData

  return (
    <section id="certifications" className="py-20 sm:py-24 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Number + Serif Title + Extending Divider Line */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.8, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-baseline gap-3 mb-8 sm:mb-12"
        >
          <span className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider">
            06
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight">
            Certificates
          </h2>
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
        </motion.div>

        {/* Clean list of full-width rows, newest first, separated by thin divider lines */}
        <div className="divide-y divide-border/70 border-y border-border/70">
          {certifications.map((cert: CertificationItem, index: number) => {
            const hasLink = Boolean(cert.credentialUrl)

            return (
              <motion.div
                key={cert.id || index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group py-4 sm:py-5 px-2 sm:px-4 rounded-xl transition-colors hover:bg-card/70 flex items-center justify-between gap-4"
              >
                {/* Left: Rounded-Square White Tile with Issuer Logo */}
                <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                  <IssuerLogoTile issuer={cert.issuer} />

                  {/* Middle: Title in Serif & Issuer Name in Muted Text */}
                  <div className="min-w-0">
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <div className="text-xs text-muted-foreground mt-0.5 flex flex-wrap items-center gap-1.5 font-sans">
                      <span>{cert.issuer}</span>
                      {cert.credentialId && (
                        <>
                          <span className="text-border">·</span>
                          <span className="font-mono text-[11px] text-muted-foreground/80">
                            ID {cert.credentialId}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Date in Mono + Circular Outlined External Link Button */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {cert.date}
                  </span>

                  {hasLink ? (
                    <a
                      href={cert.credentialUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-glass-type="button"
                      aria-label={`View certificate for ${cert.title} (opens in a new tab)`}
                      onClick={() => trackCertificateLinkClick(cert.title)}
                      className="w-8 h-8 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:bg-primary/10 transition-all cursor-pointer shadow-2xs hover:scale-105"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
