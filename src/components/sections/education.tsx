"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { GraduationCap, Calendar, Award, Code, CheckCircle, ExternalLink } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

export function Education() {
  const { education } = portfolioData
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="education" className="py-24 border-t border-border/40 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>03</span>
            <span>/</span>
            <span>Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Academic Pedigree
          </h2>
        </motion.div>

        {/* Education Cards Grid */}
        <div className="space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-secondary/30 border border-border/60 hover:border-cyan-500/40 backdrop-blur-md transition-all shadow-sm group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Left: Icon & Core Details */}
                <div className="flex items-start gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-blue-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-2 border border-cyan-500/20">
                      <span>Premier Indian Institute</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {item.institution}
                    </h3>
                    <p className="text-base sm:text-lg text-cyan-400 font-medium mt-1">
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
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-card border border-border/60 text-xs font-mono text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{item.period}</span>
                  </div>

                  {item.certificate && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-sm">
                      <Award className="w-3.5 h-3.5" />
                      <span>{item.certificate}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Skills Strip */}
              <div className="pt-6 mt-8 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground mr-1">
                    Core Coursework Skills:
                  </span>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-card/80 border border-border/60 text-xs font-mono font-medium text-foreground hover:border-cyan-500/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
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
