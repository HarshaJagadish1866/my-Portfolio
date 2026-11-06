"use client"

import * as React from "react"
import { motion, useInView } from "motion/react"
import { animate } from "animejs"
import { Award, Terminal, Layers, Sparkles } from "lucide-react"
import { portfolioData } from "@/data/portfolio"

export function StatsStrip() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const hasAnimated = React.useRef(false)

  const certCount = portfolioData.certifications.length
  const projectCount = portfolioData.projects.length
  const categoryCount = portfolioData.skills.length
  const totalSkillsCount = portfolioData.skills.reduce(
    (acc, group) => acc + group.skills.length,
    0
  )

  const stats = [
    {
      id: "certs",
      target: certCount,
      suffix: "+",
      label: "Verified Credentials",
      caption: "Google, Kaggle & IITs",
      icon: Award,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      id: "projects",
      target: projectCount,
      suffix: "",
      label: "Multi-Agent Projects",
      caption: "Arbitr-AI & Voyager",
      icon: Terminal,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      id: "skills",
      target: totalSkillsCount,
      suffix: "",
      label: "Technical Skills",
      caption: "AI, Agents, Data & Security",
      icon: Sparkles,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      id: "categories",
      target: categoryCount,
      suffix: "",
      label: "Specialized Domains",
      caption: "AI, Code, Data, Security",
      icon: Layers,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ]

  React.useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    stats.forEach((stat) => {
      const el = document.getElementById(`counter-${stat.id}`)
      if (!el) return

      const counterObj = { count: 0 }
      animate(counterObj, {
        count: stat.target,
        round: 1,
        ease: "outExpo",
        duration: 1600,
        onUpdate: () => {
          el.innerText = `${counterObj.count}${stat.suffix}`
        },
      })
    })
  }, [isInView, stats])

  return (
    <section ref={containerRef} className="py-12 border-y border-border/40 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0.9, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/70 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                    Computed Metric
                  </span>
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.border} border`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <div
                    id={`counter-${stat.id}`}
                    className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight"
                  >
                    {stat.target}{stat.suffix}
                  </div>
                  <div className="text-sm font-semibold text-foreground mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.caption}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
