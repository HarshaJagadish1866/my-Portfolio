"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { FileDown, Sparkles, CheckCircle2, MapPin, Award, BookOpen } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

export function About() {
  const { owner } = portfolioData
  const shouldReduceMotion = useReducedMotion()
  const [photoError, setPhotoError] = React.useState(false)

  return (
    <section id="about" className="py-24 border-t border-border/40 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>02</span>
            <span>/</span>
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Engineering Systems with Autonomous Agents & Data
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Photo & Quick Status Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0.9, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col items-center sm:items-start"
          >
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-cyan-500/30 via-border/70 to-border/40 backdrop-blur-md border border-cyan-500/30 shadow-xl w-full max-w-sm">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                {!photoError ? (
                  <Image
                    src={owner.photoUrl}
                    alt={owner.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={() => setPhotoError(true)}
                  />
                ) : null}

                {/* Portrait Overlay Fallback */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-300 font-semibold uppercase tracking-wide">
                      Open for Collaborations
                    </span>
                  </div>
                  <div className="text-white font-bold text-xl">{owner.name}</div>
                  <div className="text-cyan-400 text-xs font-mono mt-0.5">
                    IIT Madras BS in Data Science
                  </div>
                </div>
              </div>

              {/* Status strip beneath photo */}
              <div className="p-3 text-xs font-mono text-muted-foreground flex items-center justify-between">
                <span>Location: India</span>
                <span className="text-cyan-400 font-medium">May 2025 – Present</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Quick Facts Grid */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0.9, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Polished About Me Text */}
            <div className="p-7 sm:p-8 rounded-3xl bg-secondary/40 border border-border/70 backdrop-blur-sm shadow-sm">
              <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
                {owner.aboutMe}
              </p>
              <div className="pt-6 mt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={owner.resumeUrl}
                  download="Harsha_Jagadish_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Full Resume</span>
                </a>
                <span className="text-xs font-mono text-muted-foreground">
                  Verified PDF • Dec 2025 – Aug 2026 Skills
                </span>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                Key Background Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {owner.quickFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-card/80 border border-border/60 flex items-start gap-3 hover:border-cyan-500/40 transition-colors shadow-sm"
                  >
                    <div className="h-7 w-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {fact.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground mt-0.5">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
