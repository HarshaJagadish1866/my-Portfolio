"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Award, Calendar, CheckCircle2, ExternalLink, Filter, Sparkles, Building2 } from "lucide-react"
import { portfolioData, type CertificationItem } from "@/data/portfolio"
import { trackCertificateLinkClick } from "@/lib/analytics"

export function Certifications() {
  const { certifications } = portfolioData
  const shouldReduceMotion = useReducedMotion()
  const [activeIssuer, setActiveIssuer] = React.useState<string>("All")

  // Extract unique issuers for filtering
  const issuers = ["All", ...Array.from(new Set(certifications.map((c) => c.issuer)))]

  // Filter list
  const filteredCerts =
    activeIssuer === "All"
      ? certifications
      : certifications.filter((c) => c.issuer === activeIssuer)

  return (
    <section id="certifications" className="py-24 border-t border-border/40 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
              <span>06</span>
              <span>/</span>
              <span>Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Certifications & Timeline
            </h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xl">
              Chronological milestones tracing prompt engineering, AI agent workflows, data modeling, and cybersecurity fundamentals.
            </p>
          </div>

          <div className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-border/60 self-start md:self-auto">
            {filteredCerts.length} of {certifications.length} Displayed (Newest First)
          </div>
        </motion.div>

        {/* Filter by Issuer */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {issuers.map((issuer) => {
            const count =
              issuer === "All"
                ? certifications.length
                : certifications.filter((c) => c.issuer === issuer).length
            const isActive = activeIssuer === issuer

            return (
              <button
                key={issuer}
                onClick={() => setActiveIssuer(issuer)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-sm shadow-cyan-500/15"
                    : "bg-secondary/40 text-muted-foreground border-border/50 hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                <span>{issuer}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 font-bold"
                      : "bg-background/80 text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-cyan-500/20 ml-2 sm:ml-4 space-y-8">
          <AnimatePresence>
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={shouldReduceMotion ? false : { opacity: 0.9, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="relative group"
              >
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 h-4 w-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.6)]" />

                {/* Timeline Card */}
                <div data-glass-type="card" className="p-6 sm:p-7 rounded-3xl bg-secondary/30 border border-border/60 hover:border-cyan-500/40 backdrop-blur-md transition-all shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    
                    {/* Issuer Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-medium">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{cert.issuer}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{cert.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-border/40">
                    <span className="text-[11px] font-mono text-muted-foreground mr-1">
                      Validated Skills:
                    </span>
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-card text-foreground border border-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Optional Credential Link (if present) */}
                  {cert.credentialUrl && (
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCertificateLinkClick(cert.title)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>View Verified Certificate</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
