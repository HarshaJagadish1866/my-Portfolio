"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Typewriter } from "@/components/ui/type-writer"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  number: string
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
}

export function SectionHeader({
  number,
  title,
  subtitle,
  className,
  titleClassName,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={cn("mb-8 sm:mb-12 w-full", className)}
    >
      <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-3 w-full">
        {/* 1. Orange Mono Number: baseline aligned with the title */}
        <span className="text-xs sm:text-sm font-mono text-accent font-semibold tracking-wider shrink-0 select-none self-baseline">
          {number}
        </span>

        {/* 2. Title: shrink-0 and w-auto so it never takes full width and never pushes the line underneath */}
        <div className="w-auto shrink-0 inline-flex items-baseline">
          <Typewriter
            as="h2"
            sequences={[{ text: title, deleteAfter: false }]}
            autoLoop={false}
            startDelay={150}
            typingSpeed={40}
            naturalVariance={true}
            className="w-auto shrink-0 inline-flex items-baseline justify-start text-left font-serif"
            textClassName={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight pr-1",
              titleClassName
            )}
          />
        </div>

        {/* 3. Horizontal Line: separate element after title, flex-1, min-w-0, 1px height, self-center, left margin ~16px (ml-4) */}
        <div
          className="flex-1 min-w-[1.5rem] h-[1px] bg-border ml-4 self-center shrink"
          aria-hidden="true"
        />
      </div>

      {subtitle && (
        <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9 mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
