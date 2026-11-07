"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Users, Calendar, ArrowUpRight, GitFork, Bot, Compass } from "lucide-react"
import { portfolioData } from "@/data/portfolio"
import { ProjectViewCounter } from "@/components/sections/project-view-counter"
import { GithubRepoStats } from "@/components/github-repo-stats"
import { trackProjectLinkClick } from "@/lib/analytics"

export function Projects() {
  const { projects } = portfolioData
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-baseline gap-3 mb-10 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider">
            05
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight">
            Projects
          </h2>
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
        </motion.div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isCompleted = project.status === "Completed"

            return (
              <motion.div
                key={project.id}
                data-glass-type="card"
                initial={shouldReduceMotion ? false : { opacity: 0.9, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="rounded-3xl bg-card border border-border/80 hover:border-primary/50 overflow-hidden flex flex-col justify-between shadow-xs group transition-all"
              >
                <div>
                  {/* Project Visual Blueprint Frame */}
                  <div className="relative aspect-[16/9] w-full bg-secondary/80 border-b border-border/70 overflow-hidden flex items-center justify-center p-6">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-card/90 border border-border/70 p-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-[radial-gradient(#f26b2110_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Mock Window Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-border/60 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                            <span className="text-[10px] font-mono text-muted-foreground ml-2">
                              {project.id}.agent.config
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-primary font-medium">
                            {project.period}
                          </span>
                        </div>

                        {/* Interactive Agent Diagram Preview */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-xs mb-2 group-hover:scale-110 transition-transform">
                            {project.id === "voyager" ? (
                              <Compass className="w-6 h-6" />
                            ) : (
                              <Bot className="w-6 h-6" />
                            )}
                          </div>
                          <div className="text-foreground font-serif font-bold text-base tracking-tight">
                            {project.title}
                          </div>
                          <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                            Multi-Agent Pipeline Architecture
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/60">
                          <span>Team: {project.contributors.join(", ")}</span>
                          <span className={isCompleted ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-primary-dark dark:text-primary font-medium"}>
                            ● {project.status}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8">
                    {/* Header: Title & Status */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                          isCompleted
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : "bg-primary/10 text-primary-dark dark:text-primary border-primary/30"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-500" : "bg-primary animate-pulse"
                          }`}
                        />
                        {project.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.period}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Contributors */}
                    <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground font-mono bg-secondary/70 px-3.5 py-2 rounded-xl border border-border/70">
                      <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Contributors:</span>
                      <span className="text-foreground font-medium">
                        {project.contributors.join(", ")} & Harsha Jagadish
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-full text-xs font-mono bg-secondary/80 text-foreground border border-border/70 hover:text-primary hover:border-primary/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Live Stats (Stars, Language, Updated) */}
                    <GithubRepoStats githubUrl={project.githubUrl} />
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-border/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Live Demo Button (Only if URL exists) */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectLinkClick(project.title, "live")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold shadow-xs hover:scale-105 transition-all"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : null}

                    {/* GitHub Button (Only if URL exists) */}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectLinkClick(project.title, "github")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary border border-border/80 text-foreground text-xs font-medium hover:border-primary/50 transition-colors"
                      >
                        <GitFork className="w-3.5 h-3.5 text-primary" />
                        <span>Source Code</span>
                      </a>
                    ) : null}

                    {/* If neither link is public yet, show clean status note */}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-border" />
                        Links: Available on Request
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <ProjectViewCounter slug={project.id} />
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
