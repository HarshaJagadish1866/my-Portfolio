"use client"

import * as React from "react"
import { Guestbook } from "@/components/sections/guestbook"
import { DevJokeWidget } from "@/components/dev-joke-widget"
import { SectionHeader } from "@/components/ui/section-header"

export function ContactAndGuestbook() {
  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-border scroll-mt-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Header: Number + Serif Title + Extending Line */}
        <SectionHeader
          number="07"
          title="Sign the Guestbook"
          subtitle="Leave a note, a thought, or a hello."
        />

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
