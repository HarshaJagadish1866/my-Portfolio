"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Guestbook } from "@/components/sections/guestbook"
import { DevJokeWidget } from "@/components/dev-joke-widget"
import { Typewriter } from "@/components/ui/type-writer"

export function ContactAndGuestbook() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-border scroll-mt-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Number + Serif Title + Extending Line */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs sm:text-sm font-mono text-accent font-semibold tracking-wider">
              07
            </span>
            <Typewriter
              as="h2"
              sequences={[{ text: "Sign the Guestbook", deleteAfter: false }]}
              autoLoop={false}
              startDelay={150}
              typingSpeed={40}
              naturalVariance={true}
              className="w-auto inline-flex justify-start"
              textClassName="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight"
            />
            <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
          </div>
          <p className="text-sm sm:text-base text-muted-foreground ml-7 sm:ml-9">
            Leave a note, a thought, or a hello.
          </p>
        </motion.div>

        {/* Guestbook Card (Centered) */}
        <div className="w-full">
          <Guestbook />
        </div>

        {/* Fun Widget: Dev Joke of the Day (Public API) */}
        <div className="mt-10">
          <DevJokeWidget />
        </div>

      </div>
    </section>
  )
}
