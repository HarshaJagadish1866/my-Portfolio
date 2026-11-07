"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react"
import { portfolioData, type CertificationItem } from "@/data/portfolio"
import { IssuerLogoTile } from "@/components/icons/issuer-logos"
import { trackCertificateLinkClick } from "@/lib/analytics"
import { Typewriter } from "@/components/ui/type-writer"

function CertRow({ cert, index }: { cert: CertificationItem; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const [expanded, setExpanded] = React.useState(false)
  const hasLink = Boolean(cert.credentialUrl && cert.credentialUrl.trim() !== "")

  const detailsText = cert.details || ""
  const isLongDetails = detailsText.length > 55
  const displayedDetails = isLongDetails && !expanded
    ? `${detailsText.slice(0, 52)}...`
    : detailsText

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group py-4 sm:py-5 px-2 sm:px-4 rounded-xl transition-colors hover:bg-card/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
    >
      {/* Left & Middle: Rounded-Square Issuer Tile + Title & Details */}
      <div className="flex items-start sm:items-center gap-3.5 sm:gap-4.5 min-w-0 flex-1">
        <IssuerLogoTile issuer={cert.issuer} />

        <div className="min-w-0 flex-1">
          {/* Title + Attendance Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
              {cert.title}
            </h3>
            {cert.isAttendanceLetter && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                Letter of Attendance
              </span>
            )}
          </div>

          {/* Issuer + Credential ID + Skills */}
          <div className="text-xs text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 font-sans">
            <span className="font-medium text-foreground/80">{cert.issuer}</span>
            {cert.credentialId && (
              <>
                <span className="text-border">·</span>
                <span className="font-mono text-[11px] text-muted-foreground/90">
                  ID {cert.credentialId}
                </span>
              </>
            )}
            {cert.skills && cert.skills.length > 0 && (
              <>
                <span className="text-border">·</span>
                <span className="text-[11px] text-muted-foreground/80">
                  Skills: {cert.skills.join(", ")}
                </span>
              </>
            )}
          </div>

          {/* Details line: shortened to one line with "more" toggle if longer */}
          {detailsText && (
            <div className="text-xs text-muted-foreground/90 mt-1 font-sans flex items-center gap-1.5">
              <span>{displayedDetails}</span>
              {isLongDetails && (
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center text-[11px] font-mono text-accent hover:underline cursor-pointer ml-1"
                  aria-expanded={expanded}
                  aria-label={expanded ? "Show less details" : "Show more details"}
                >
                  {expanded ? (
                    <>
                      <span>less</span>
                      <ChevronUp className="w-3 h-3 ml-0.5" />
                    </>
                  ) : (
                    <>
                      <span>more</span>
                      <ChevronDown className="w-3 h-3 ml-0.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Date, Expiration Badge, and Verify Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pl-14 sm:pl-0 pt-1 sm:pt-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
            {cert.date}
          </span>
          {cert.expires && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono bg-accent-soft text-accent border border-accent/20 whitespace-nowrap">
              Expires {cert.expires}
            </span>
          )}
        </div>

        {hasLink && (
          <a
            href={cert.credentialUrl!}
            target="_blank"
            rel="noopener noreferrer"
            data-glass-type="button"
            title="Open original credential on the issuer's website"
            aria-label={`Verify ${cert.title} on issuer website (opens in a new tab)`}
            onClick={() => trackCertificateLinkClick(cert.title)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/80 text-xs font-mono text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all cursor-pointer shadow-2xs hover:scale-105"
          >
            <BadgeCheck className="w-3.5 h-3.5 text-accent" />
            <span>Verify</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

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
          <span className="text-xs sm:text-sm font-mono text-accent font-semibold tracking-wider">
            06
          </span>
          <Typewriter
            as="h2"
            sequences={[{ text: "Earned Certificates", deleteAfter: false }]}
            autoLoop={false}
            startDelay={150}
            typingSpeed={40}
            naturalVariance={true}
            className="w-auto inline-flex justify-start"
            textClassName="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight"
          />
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
        </motion.div>

        {/* Clean list of full-width rows, newest first, separated by thin divider lines */}
        <div className="divide-y divide-border/70 border-y border-border/70">
          {certifications.map((cert: CertificationItem, index: number) => (
            <CertRow key={cert.id || index} cert={cert} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
