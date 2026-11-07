"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { animate, stagger } from "animejs"
import { ArrowRight, Mail, Bot, Database, Sparkles, BrainCircuit } from "lucide-react"
import { portfolioData } from "@/data/portfolio"
import { BeamsBackground } from "@/components/kokonutui/beams-background"
import { ShimmerButton } from "@/components/kokonutui/shimmer-button"

export function Hero() {
  const { owner } = portfolioData
  const shouldReduceMotion = useReducedMotion()
  const nameRef = React.useRef<HTMLHeadingElement>(null)
  const svgLineRef = React.useRef<SVGPathElement>(null)

  React.useEffect(() => {
    if (shouldReduceMotion) return

    // Anime.js v4 Dynamic Letter Rise Effect
    animate(".anime-letter", {
      translateY: [16, 0],
      rotateZ: [-2, 0],
      delay: stagger(25, { start: 50 }),
      ease: "outCubic",
      duration: 600,
    })

    // Anime.js v4 SVG Underline Drawing
    if (svgLineRef.current) {
      const length = svgLineRef.current.getTotalLength?.() || 220
      svgLineRef.current.style.strokeDasharray = `${length}`
      svgLineRef.current.style.strokeDashoffset = `${length}`

      animate(svgLineRef.current, {
        strokeDashoffset: [length, 0],
        ease: "inOutQuart",
        duration: 1400,
        delay: 200,
      })
    }
  }, [shouldReduceMotion])

  const nameLetters = owner.name.split("")

  return (
    <section id="hero" className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 overflow-hidden">
      <BeamsBackground>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12">
            
            {/* Left Column: Text & Call to Actions */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0.8, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 text-center md:text-left flex flex-col items-center md:items-start"
            >
              {/* Badge: IIT Madras & Specialization */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary-dark dark:text-primary text-xs font-mono mb-4 shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="hidden sm:inline">IIT Madras BS in Data Science & Applications</span>
                <span className="sm:hidden">IIT Madras BS • Data Science</span>
              </div>

              {/* Animated Name in Editorial Serif */}
              <h1
                ref={nameRef}
                data-glass-type="text"
                className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.08] mb-2"
              >
                {shouldReduceMotion ? (
                  owner.name
                ) : (
                  <span className="inline-block">
                    {nameLetters.map((char, index) => (
                      <span
                        key={index}
                        className="anime-letter inline-block"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                )}
              </h1>

              {/* SVG Dynamic Underline in Warm Orange Gradient */}
              <div className="w-48 sm:w-60 h-3 mb-5">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 12" fill="none">
                  <path
                    ref={svgLineRef}
                    d="M 0 6 C 50 12, 150 0, 200 6"
                    stroke="url(#orange-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F26B21" />
                      <stop offset="50%" stopColor="#FB923C" />
                      <stop offset="100%" stopColor="#C2410C" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-7 leading-relaxed">
                Building autonomous{" "}
                <span className="text-foreground font-semibold">multi-agent AI systems</span>,
                LLM applications, and scalable data workflows for real-world impact.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
                {/* 1. View Projects (Shimmer Button) */}
                <Link href="#projects">
                  <ShimmerButton>
                    <span>View Projects</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </ShimmerButton>
                </Link>

                {/* 2. Contact Button */}
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-border/80 bg-card hover:bg-secondary hover:border-primary/50 text-foreground text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Contact</span>
                </Link>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 mt-6 border-t border-border/70 w-full max-w-lg">
                <div className="text-center md:text-left">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-foreground">Multi-Agent</div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Google ADK</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-foreground">9 Verified</div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">Certificates</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-lg sm:text-2xl font-serif font-bold text-foreground">IIT Madras</div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">BS Data Science</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Holographic Photo / Identity Card */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0.85, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="relative flex items-center justify-center shrink-0 mb-2 md:mb-0"
            >
              {/* Outer Amber/Orange Glow Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500/25 via-amber-500/20 to-orange-600/25 blur-xl opacity-80 animate-pulse pointer-events-none" />

              {/* Card Container */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-orange-500/30 via-border/80 to-border/40 backdrop-blur-md border border-orange-500/35 shadow-xl">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden bg-card border border-border/80 flex flex-col items-center justify-between p-6">
                  
                  {/* Subtle Grid Inside Card */}
                  <div className="absolute inset-0 bg-[radial-gradient(#f26b2115_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  {/* Top Status Bar */}
                  <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available
                    </span>
                    <span className="text-muted-foreground text-[11px]">IIT Madras</span>
                  </div>

                  {/* Center Monogram / AI Avatar Graphic */}
                  <div className="relative z-10 flex flex-col items-center text-center my-auto">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 p-[2px] shadow-xl shadow-orange-500/20 mb-3 group hover:scale-105 transition-transform duration-300">
                      <div className="h-full w-full rounded-[14px] bg-card flex items-center justify-center">
                        <BrainCircuit className="w-12 h-12 sm:w-14 sm:h-14 text-primary" />
                      </div>
                    </div>
                    <div className="text-foreground font-serif font-bold text-lg sm:text-xl tracking-tight">
                      {owner.name}
                    </div>
                    <p className="text-primary-dark dark:text-primary text-xs font-mono mt-0.5">
                      Data Science & AI Engineer
                    </p>
                  </div>

                  {/* Bottom Chip Strip */}
                  <div className="relative z-10 w-full pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Multi-Agent</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Database className="w-3.5 h-3.5" />
                      <span>Google ADK</span>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Chips Outside Card */}
                <div className="hidden sm:flex absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-card text-foreground backdrop-blur-md border border-border/80 shadow-md items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium font-mono">Agentic AI</span>
                </div>

                <div className="hidden sm:flex absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-card text-foreground backdrop-blur-md border border-border/80 shadow-md items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-xs font-medium font-mono">Data Science</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </BeamsBackground>
    </section>
  )
}
