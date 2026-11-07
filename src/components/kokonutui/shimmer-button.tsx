"use client"

import React from "react"
import { motion, type HTMLMotionProps } from "motion/react"

interface ShimmerButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode
  className?: string
}

export function ShimmerButton({
  children,
  className = "",
  ...props
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-[1px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative inline-flex items-center gap-2 rounded-[15px] bg-background/90 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-xl transition-colors group-hover:bg-background/70">
        {children}
      </span>
    </motion.button>
  )
}
