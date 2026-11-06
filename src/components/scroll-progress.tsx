"use client"

import { motion, useScroll, useSpring } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(6,182,212,0.6)]"
      style={{ scaleX }}
    />
  )
}
