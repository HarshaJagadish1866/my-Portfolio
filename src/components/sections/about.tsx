"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { CheckCircle2 } from "lucide-react"
import { portfolioData } from "@/data/portfolio"
import { MarkerText, Mark } from "@/components/kokonutui/marker-text"

export function About() {
  const { owner } = portfolioData
  const shouldReduceMotion = useReducedMotion()
  const [photoError, setPhotoError] = React.useState(false)

  return (
    <section id="about" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-baseline gap-3 mb-10 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-mono text-accent font-semibold tracking-wider">
            02
          </span>
          <MarkerText as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight">
            About <Mark type="underline" color="var(--accent)">Me</Mark>
          </MarkerText>
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
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
            <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-orange-500/25 via-border/80 to-border/40 backdrop-blur-md border border-orange-500/30 shadow-xl w-full max-w-sm">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-card flex items-center justify-center border border-border/80">
                {!photoError ? (
                  <Image
                    src={owner.photoUrl}
                    alt={`Portrait of ${owner.name}, Data Science and AI Engineer`}
                    fill
                    sizes="(max-width: 640px) 100vw, 384px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={() => setPhotoError(true)}
                  />
                ) : null}

                {/* Portrait Overlay Fallback */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-300 font-semibold uppercase tracking-wide">
                      Open for Collaborations
                    </span>
                  </div>
                  <div className="text-white font-serif font-bold text-xl">{owner.name}</div>
                  <div className="text-orange-300 text-xs font-mono mt-0.5">
                    IIT Madras BS in Data Science
                  </div>
                </div>
              </div>

              {/* Status strip beneath photo */}
              <div className="p-3 text-xs font-mono text-muted-foreground flex items-center justify-between">
                <span>Location: India</span>
                <span className="text-primary-dark dark:text-primary font-medium">May 2025 – Present</span>
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
            <div className="p-7 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs">
              <p className="text-foreground leading-relaxed text-base sm:text-lg">
                {owner.aboutMe}
              </p>
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
                    className="p-4 rounded-2xl bg-card border border-border/70 flex items-start gap-3 hover:border-primary/50 transition-colors shadow-2xs"
                  >
                    <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
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
