"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { GraduationCap, Calendar, Award, CheckCircle } from "lucide-react"
import { portfolioData } from "@/data/portfolio"
import { SectionHeader } from "@/components/ui/section-header"

export function Education() {
  const { education } = portfolioData
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="education" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <SectionHeader number="03" title="Education & Journey" />

        {/* Education Cards Grid */}
        <div className="space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-7 sm:p-9 rounded-3xl bg-card border border-border/80 shadow-xs group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">

                {/* Left: Icon & Core Details */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-primary text-xs font-mono mb-2 border border-primary/20 font-medium">
                      <span>Premier Indian Institute</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-foreground tracking-tight">
                      {item.institution}
                    </h3>
                    <p className="text-base sm:text-lg text-primary-dark dark:text-primary font-medium mt-1">
                      {item.degree}
                    </p>
                    {item.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mt-4 max-w-3xl">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Timeline & Certificate Badge */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border/70 text-xs font-mono text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{item.period}</span>
                  </div>

                  {item.certificate && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shadow-2xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.certificate}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Skills Strip */}
              <div className="pt-6 mt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground mr-1">
                    Core Coursework Skills:
                  </span>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-secondary/80 border border-border/70 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Enrolled & In Progress</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
