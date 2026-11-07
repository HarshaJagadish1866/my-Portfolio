"use client"

import React from "react"
import { motion } from "motion/react"

export function BeamsBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div suppressHydrationWarning className="relative w-full overflow-hidden bg-background">
      {/* Background Grid Pattern */}
      <div suppressHydrationWarning className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Gradient Glows in Warm Amber/Orange */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/20 via-amber-400/15 to-orange-600/15 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Foreground Content */}
      <div suppressHydrationWarning className="relative z-10">{children}</div>
    </div>
  )
}
