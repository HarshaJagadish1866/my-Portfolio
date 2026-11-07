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
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(242,107,33,0.5)]"
      style={{ scaleX }}
    />
  )
}
