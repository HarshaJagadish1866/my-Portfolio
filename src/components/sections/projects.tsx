"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import {
  Users,
  Calendar,
  ArrowUpRight,
  GitFork,
  Bot,
  Compass,
  Mic,
  Images,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { portfolioData, type ProjectItem } from "@/data/portfolio"
import { ProjectViewCounter } from "@/components/sections/project-view-counter"
import { GithubRepoStats } from "@/components/github-repo-stats"
import { trackProjectLinkClick } from "@/lib/analytics"
import { SectionHeader } from "@/components/ui/section-header"

function ProjectBlueprintIcon({ id }: { id: string }) {
  switch (id) {
    case "voiceops":
      return <Mic className="w-6 h-6" />
    case "photopodra":
      return <Images className="w-6 h-6" />
    case "voyager":
      return <Compass className="w-6 h-6" />
    default:
      return <Bot className="w-6 h-6" />
  }
}

function ProjectBlueprintSubtitle({ id }: { id: string }) {
  switch (id) {
    case "voiceops":
      return "Voice & Policy RAG Architecture"
    case "photopodra":
      return "Local-First Vector Search Gallery"
    case "voyager":
      return "Multi-Agent Travel Planning Architecture"
    default:
      return "Multi-Agent Legal Review Architecture"
  }
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem
  index: number
}) {
  const shouldReduceMotion = useReducedMotion()
  const [showHighlights, setShowHighlights] = React.useState(false)

  const isCompleted = project.status === "Completed"
  const isSolo =
    project.contributors.length === 1 &&
    project.contributors[0] === "Harsha Jagadish"
  const contributorText = isSolo
    ? "Harsha Jagadish"
    : `${project.contributors.join(", ")} & Harsha Jagadish`

  return (
    <motion.div
      data-glass-type="card"
      initial={shouldReduceMotion ? false : { opacity: 0.9, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-3xl bg-card border border-border/80 hover:border-primary/50 overflow-hidden flex flex-col justify-between shadow-xs group transition-all h-full"
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
                  <span className="text-[10px] font-mono text-muted-foreground ml-2 truncate max-w-[160px] sm:max-w-[220px]">
                    {project.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-accent font-medium whitespace-nowrap">
                  {project.period}
                </span>
              </div>

              {/* Interactive Agent/System Diagram Preview */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center py-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-xs mb-2 group-hover:scale-110 transition-transform">
                  <ProjectBlueprintIcon id={project.id} />
                </div>
                <div className="text-foreground font-sans font-bold text-base tracking-tight line-clamp-1">
                  {project.title}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  <ProjectBlueprintSubtitle id={project.id} />
                </div>
              </div>

              {/* Status bar */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-border/60">
                <span className="truncate max-w-[200px]">
                  {isSolo ? "Author: Harsha Jagadish" : `Team: ${project.contributors.join(", ")}`}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">
                  ● {project.status}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-6 sm:p-8">
          {/* Header: Status badge & Period */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {project.status}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.period}</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {project.summary}
          </p>

          {/* Highlights Section */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-5">
              <button
                type="button"
                onClick={() => setShowHighlights(!showHighlights)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline cursor-pointer mb-2"
                aria-expanded={showHighlights}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {showHighlights ? "Hide Key Highlights" : `Key Highlights (${project.highlights.length})`}
                </span>
                {showHighlights ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>

              {showHighlights && (
                <ul className="space-y-2 text-xs text-muted-foreground font-sans bg-secondary/50 p-3.5 rounded-xl border border-border/60 transition-all">
                  {project.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-accent text-[11px] mt-0.5 shrink-0">●</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Contributors */}
          <div className="flex items-center gap-2 mb-5 text-xs text-muted-foreground font-mono bg-secondary/70 px-3.5 py-2 rounded-xl border border-border/70">
            <Users className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{isSolo ? "Author:" : "Contributors:"}</span>
            <span className="text-foreground font-medium">
              {contributorText}
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

          {/* GitHub Source Code Button (Only if URL exists) */}
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
}

export function Projects() {
  const { projects } = portfolioData

  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeader
          number="05"
          title="Featured Projects"
          subtitle="Things I have built, from multi-agent systems to voice assistants and local AI apps."
        />

        {/* Projects Cards Grid: 4 cards, 2 columns on desktop, 1 on phone, equal heights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
