"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { ContactForm } from "@/components/sections/contact-form"
import { Guestbook } from "@/components/sections/guestbook"
import { DevJokeWidget } from "@/components/dev-joke-widget"
import { SocialLinks } from "@/components/social-links"

export function ContactAndGuestbook() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-border/60 scroll-mt-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header: Number + Serif Title + Extending Line */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex items-baseline gap-3 mb-10 sm:mb-14"
        >
          <span className="text-xs sm:text-sm font-mono text-primary font-semibold tracking-wider">
            07
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground tracking-tight">
            Connect & Guestbook
          </h2>
          <div className="flex-1 h-[1px] bg-border ml-2 sm:ml-4 self-center opacity-80" />
        </motion.div>

        {/* 2-Column Grid: Contact Form (Left) & Guestbook (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ContactForm />
          <Guestbook />
        </div>

        {/* Fun Widget: Dev Joke of the Day (Public API) */}
        <div className="mt-12">
          <DevJokeWidget />
        </div>

        {/* Quick Social Connect Bar */}
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-muted-foreground">
            Connect across my verified platforms:
          </div>
          <SocialLinks />
        </div>

      </div>
    </section>
  )
}
