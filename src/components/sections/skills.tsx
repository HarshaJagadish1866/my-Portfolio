"use client"

import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Layers, Bot, Code, Database, Shield, Check, Sparkles } from "lucide-react"
import { portfolioData, type SkillCategory } from "@/data/portfolio"

export function Skills() {
  const { skills } = portfolioData
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = React.useState<string>("All")

  const categories = ["All", ...skills.map((s) => s.category)]

  const categoryIcons: Record<string, React.ElementType> = {
    "AI and Agents": Bot,
    "Programming": Code,
    "Data": Database,
    "Security": Shield,
  }

  // Flattened list with category metadata for filtering
  const allSkillsList = skills.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill,
      category: group.category,
    }))
  )

  const filteredSkills =
    activeCategory === "All"
      ? allSkillsList
      : allSkillsList.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 border-t border-border/40 scroll-mt-20 relative">
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
              <span>04</span>
              <span>/</span>
              <span>Skills Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Technical Capabilities
            </h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xl">
              Verified domain competencies spanning agentic workflows, model operations, and data infrastructure.
            </p>
          </div>

          <div className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-border/60 self-start md:self-auto">
            {filteredSkills.length} Verified Skills Listed
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? allSkillsList.length
                : skills.find((s) => s.category === cat)?.skills.length || 0
            const isActive = activeCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-sm shadow-cyan-500/15"
                    : "bg-secondary/40 text-muted-foreground border-border/50 hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                <span>{cat}</span>
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

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const Icon = categoryIcons[skill.category] || Sparkles

              return (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  layout
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border/60 hover:border-cyan-500/40 hover:bg-secondary/60 backdrop-blur-sm transition-all group flex items-center justify-between gap-3 shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-card border border-border/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground tracking-tight group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                        {skill.category}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-border group-hover:bg-cyan-400 transition-colors shrink-0" />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
