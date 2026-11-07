"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { portfolioData } from "@/data/portfolio"

// Distinctive emoji/glyph mapping matching the reference screenshot style
const SKILL_ICONS: Record<string, string> = {
  "Artificial Intelligence": "🤖",
  "Agentic Workflows": "🔄",
  "LLM Application": "🧠",
  "Machine Learning": "📈",
  "AI Literacy": "📚",
  "AI Integrations": "🔌",
  "Model Training": "⚙️",
  "Prompt Engineering": "✍️",
  "AI-Assisted Development": "💻",
  "Multi-agent Systems": "👥",
  "Google Agent Development Kit (ADK)": "🛠️",
  "Python": "🐍",
  "Data Visualization Tools": "📊",
  "Spreadsheet Skills": "📑",
  "Data Analysis": "🔍",
  "Data Modeling": "🧱",
  "Cybersecurity": "🛡️",
}

export function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const { skills } = portfolioData

  // Normalize category headings to match "// CATEGORY" reference style
  const formatCategoryHeader = (category: string) => {
    if (category.toLowerCase().includes("ai")) return "// AI & AGENTS"
    if (category.toLowerCase().includes("program")) return "// PROGRAMMING"
    if (category.toLowerCase().includes("data")) return "// DATA"
    if (category.toLowerCase().includes("security")) return "// SECURITY"
    return `// ${category.toUpperCase()}`
  }

  return (
    <section id="skills" className="py-20 sm:py-24 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Number + Serif Title + Extending Divider Line */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.8, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-baseline gap-3 mb-10 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider">
            04
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight">
            Skills
          </h2>
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
        </motion.div>

        {/* 3-Column Grid on Desktop, 2 on Tablet, 1 on Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {skills.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: groupIdx * 0.08 }}
              className="flex flex-col gap-3.5"
            >
              {/* Category Label: "// CATEGORY" in uppercase mono with wide tracking */}
              <div className="font-mono text-xs tracking-widest uppercase font-semibold text-muted-foreground flex items-center gap-1.5">
                <span className="text-primary font-bold">//</span>
                <span>{group.category === "AI and Agents" ? "AI & AGENTS" : group.category.toUpperCase()}</span>
              </div>

              {/* Full Rounded Pill Chips with Icon & Skill Name */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, skillIdx) => {
                  const icon = SKILL_ICONS[skill] || "✦"

                  return (
                    <motion.div
                      key={skill}
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: groupIdx * 0.06 + skillIdx * 0.02,
                      }}
                      data-glass-type="button"
                      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-card/80 text-foreground text-xs sm:text-sm font-medium shadow-xs transition-all duration-200 select-none cursor-default hover:-translate-y-0.5 hover:border-primary hover:text-primary-dark dark:hover:text-primary hover:shadow-[0_4px_12px_rgba(242,107,33,0.12)]"
                    >
                      <span className="text-sm select-none shrink-0" aria-hidden="true">
                        {icon}
                      </span>
                      <span>{skill}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
