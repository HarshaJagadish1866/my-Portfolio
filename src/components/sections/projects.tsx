"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { Terminal, Users, Calendar, ArrowUpRight, GitFork, ExternalLink, Bot, Sparkles, Compass, ShieldAlert } from "lucide-react"
import { portfolioData, type ProjectItem } from "@/data/portfolio"
import { ProjectViewCounter } from "@/components/sections/project-view-counter"
import { GithubRepoStats } from "@/components/github-repo-stats"
import { trackProjectLinkClick } from "@/lib/analytics"

export function Projects() {
  const { projects } = portfolioData
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="projects" className="py-24 border-t border-border/40 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
              <span>05</span>
              <span>/</span>
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Multi-Agent AI & Applications
            </h2>
            <p className="text-muted-foreground text-sm mt-1 max-w-xl">
              Production-oriented intelligent agents designed with Google ADK, LLM pipelines, and cooperative multi-agent architectures.
            </p>
          </div>

          <div className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-border/60 self-start md:self-auto">
            {projects.length} System Architectures
          </div>
        </motion.div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isCompleted = project.status === "Completed"

            return (
              <motion.div
                key={project.id}
                initial={shouldReduceMotion ? false : { opacity: 0.9, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="rounded-3xl bg-secondary/30 border border-border/60 hover:border-cyan-500/40 backdrop-blur-md overflow-hidden flex flex-col justify-between shadow-sm group transition-all"
              >
                <div>
                  {/* Project Screenshot / Visual Blueprint Frame */}
                  <div className="relative aspect-[16/9] w-full bg-slate-950 border-b border-border/60 overflow-hidden flex items-center justify-center p-6">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Tech Mockup Placeholder Blueprint */
                      <div className="w-full h-full rounded-xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#38bdf812_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Mock Window Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                            <span className="text-[10px] font-mono text-slate-400 ml-2">
                              {project.id}.agent.config
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400">
                            {project.period}
                          </span>
                        </div>

                        {/* Interactive Agent Diagram Preview */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-4">
                          <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg mb-2 group-hover:scale-110 transition-transform">
                            {project.id === "voyager" ? (
                              <Compass className="w-6 h-6" />
                            ) : (
                              <Bot className="w-6 h-6" />
                            )}
                          </div>
                          <div className="text-white font-bold text-sm tracking-tight">
                            {project.title}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            Multi-Agent Pipeline Architecture
                          </div>
                        </div>

                        {/* Status bar */}
                        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                          <span>Team: {project.contributors.join(", ")}</span>
                          <span className={isCompleted ? "text-emerald-400" : "text-amber-400"}>
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
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-400" : "bg-cyan-400 animate-pulse"
                          }`}
                        />
                        {project.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{project.period}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Contributors */}
                    <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground font-mono bg-card/60 px-3.5 py-2 rounded-xl border border-border/50">
                      <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-card text-muted-foreground border border-border/60 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
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
                <div className="px-6 sm:px-8 pb-6 pt-3 border-t border-border/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Live Demo Button (Only if URL exists) */}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectLinkClick(project.title, "live")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-sm hover:scale-105 transition-all"
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
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card border border-border text-foreground text-xs font-medium hover:border-cyan-500/40 transition-colors"
                      >
                        <GitFork className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : null}

                    {/* If neither link is public yet, show clean status note */}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
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
