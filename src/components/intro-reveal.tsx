"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"

interface IntroRevealProps {
  children: React.ReactNode
}

export function IntroReveal({ children }: IntroRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleTrigger = useCallback(() => {
    setIsRevealed(true)
  }, [])

  useEffect(() => {
    // If the user prefers reduced motion, skip the heavy intro animation
    if (shouldReduceMotion) {
      setIsRevealed(true)
      return
    }

    if (isRevealed) return

    const onMove = () => handleTrigger()
    const onTouch = () => handleTrigger()
    const onKeyDown = () => handleTrigger()

    window.addEventListener("mousemove", onMove, { passive: true, once: true })
    window.addEventListener("touchstart", onTouch, { passive: true, once: true })
    window.addEventListener("keydown", onKeyDown, { passive: true, once: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchstart", onTouch)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [handleTrigger, isRevealed, shouldReduceMotion])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 1. Fullscreen Intro Overlay with Centered Logo */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
            }}
            onMouseMove={handleTrigger}
            onTouchStart={handleTrigger}
            onClick={handleTrigger}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090d16] cursor-pointer select-none overflow-hidden"
            style={{ perspective: 1200 }}
            aria-label="Welcome intro screen. Move mouse or tap to enter portfolio."
          >
            {/* Ambient Background Glow Behind Logo */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-blue-600/20 blur-3xl pointer-events-none" />

            {/* 3. The Logo Animation: spins rapidly (rotate: 720deg), scales down to 0, fades out, flies into background (negative Z-axis translation) */}
            <motion.div
              initial={{ rotate: 0, scale: 1, opacity: 1, z: 0 }}
              exit={{
                rotate: 720,
                scale: 0,
                opacity: 0,
                z: -900,
                transition: {
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="relative z-10 flex flex-col items-center justify-center"
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-[0_0_40px_rgba(6,182,212,0.45)]">
                <Image
                  src="/logo.png"
                  alt="Harsha Jagadish Signature Monogram Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Interaction Call-to-Action Hint */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.8, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Move cursor to enter
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. The Content Reveal: Main website content scales up to 1 and fades in to opacity 1 */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        animate={
          isRevealed
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.0,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.15,
                },
              }
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        className="w-full min-h-screen origin-center"
      >
        {children}
      </motion.div>
    </div>
  )
}
