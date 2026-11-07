"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"

interface IntroSequenceProps {
  children: React.ReactNode
}

export function IntroSequence({ children }: IntroSequenceProps) {
  const [isTriggered, setIsTriggered] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleTrigger = useCallback(() => {
    setIsTriggered((prev) => {
      if (!prev) return true
      return prev
    })
  }, [])

  // Window event listeners for immediate responsiveness on cursor move, touch, or key
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsDismissed(true)
      return
    }

    if (isTriggered) return

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
  }, [handleTrigger, isTriggered, shouldReduceMotion])

  // When animation triggers, dismiss overlay after the 3.8s sequence
  useEffect(() => {
    if (isTriggered && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(true)
      }, 3800)
      return () => clearTimeout(timer)
    }
  }, [isTriggered, isDismissed])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 1. Full-screen, absolute/fixed dark overlay (highest z-index) */}
      <AnimatePresence>
        {!isDismissed && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            onMouseMove={handleTrigger}
            onTouchStart={handleTrigger}
            onClick={handleTrigger}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090d16] cursor-pointer select-none overflow-hidden"
            style={{
              perspective: 1000,
              perspectiveOrigin: "center center",
            }}
            aria-label="Portfolio intro screen. Move mouse to enter."
          >
            {/* Ambient Background Aura */}
            <motion.div
              animate={
                isTriggered
                  ? {
                      opacity: [0.35, 0.8, 0],
                      scale: [1, 2.5, 4],
                      transition: { duration: 3.5, ease: "easeInOut" },
                    }
                  : { opacity: 0.35, scale: 1 }
              }
              className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-400/20 to-purple-600/25 blur-[120px] pointer-events-none"
            />

            {/* 2 & 4. Centered Logo with 3D Y-axis spin & massive Z-axis camera flyout */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
              }}
              initial={{
                rotateY: 0,
                scale: 1,
                z: 0,
                opacity: 1,
              }}
              animate={
                isTriggered
                  ? {
                      rotateY: 1440, // Continuous multi-rotation spin on Y-axis
                      scale: [1, 2, 8, 25, 50], // Moves dramatically towards the camera past the screen
                      z: [0, 150, 600, 1200, 2500],
                      opacity: [1, 1, 0.95, 0.6, 0], // Fades to 0 as it gets massively close to the screen
                    }
                  : {
                      rotateY: 0,
                      scale: 1,
                      z: 0,
                      opacity: 1,
                    }
              }
              transition={
                isTriggered
                  ? {
                      duration: 3.8, // 3.8s runtime matching the 3-5s requirement
                      ease: [0.25, 0.1, 0.25, 1],
                      times: [0, 0.3, 0.6, 0.85, 1],
                    }
                  : undefined
              }
              className="relative flex flex-col items-center justify-center will-change-transform"
            >
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-[0_0_45px_rgba(6,182,212,0.5)]">
                <Image
                  src="/logo.png"
                  alt="Portfolio Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Gentle prompt (fades immediately on trigger) */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isTriggered ? { opacity: 0 } : { opacity: 0.75, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Move cursor to explore
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Main Portfolio Bento Grid website layout smoothly fades in behind receding overlay */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          isTriggered || isDismissed || shouldReduceMotion
            ? {
                opacity: 1,
                transition: {
                  duration: 1.2,
                  delay: isTriggered && !isDismissed ? 2.2 : 0, // Starts smoothly emerging as logo approaches zenith
                  ease: "easeOut",
                },
              }
            : { opacity: 0 }
        }
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default IntroSequence
