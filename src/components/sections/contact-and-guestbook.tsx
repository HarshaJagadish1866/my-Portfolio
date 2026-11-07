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
    <section id="contact" className="py-24 border-t border-border/40 scroll-mt-20 relative bg-secondary/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.9, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-wider mb-2">
            <span>07</span>
            <span>/</span>
            <span>Connect & Guestbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-sm mt-1 max-w-xl">
            Drop a private message or sign the community guestbook.
          </p>
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
