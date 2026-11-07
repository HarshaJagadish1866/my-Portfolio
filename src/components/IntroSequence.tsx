"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import Image from "next/image"

// =========================================================================
// 🎯 LOOP TRANSFORM ORIGIN CONFIGURATION
// Tweak these percentages to perfectly align the camera zoom through the loop:
// - LOOP_ORIGIN_X: Horizontal percentage (0% = left, 100% = right)
// - LOOP_ORIGIN_Y: Vertical percentage (0% = top, 100% = bottom)
// =========================================================================
export const LOOP_ORIGIN_X = "48%" // Default: 48% (tweak: 44% - 54%)
export const LOOP_ORIGIN_Y = "58%" // Default: 58% (tweak: 52% - 64%)
export const LOOP_TRANSFORM_ORIGIN = `${LOOP_ORIGIN_X} ${LOOP_ORIGIN_Y}`

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

  // Automatically dismiss overlay once the fly-through sequence finishes
  useEffect(() => {
    if (isTriggered && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(true)
      }, 3400)
      return () => clearTimeout(timer)
    }
  }, [isTriggered, isDismissed])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 1. Full-screen dark overlay with 3D perspective */}
      <AnimatePresence>
        {!isDismissed && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            animate={
              isTriggered
                ? {
                    opacity: [1, 1, 0.85, 0],
                    transition: {
                      duration: 3.4,
                      times: [0, 0.65, 0.85, 1],
                      ease: "easeInOut",
                    },
                  }
                : { opacity: 1 }
            }
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            onMouseMove={handleTrigger}
            onTouchStart={handleTrigger}
            onClick={handleTrigger}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090d16] cursor-pointer select-none overflow-hidden"
            style={{
              perspective: 1200,
              perspectiveOrigin: "center center",
            }}
            aria-label="Portfolio intro screen. Move mouse to enter."
          >
            {/* Ambient Background Glow */}
            <motion.div
              animate={
                isTriggered
                  ? {
                      opacity: [0.4, 0.8, 0],
                      scale: [1, 2.5, 6],
                      transition: { duration: 3.2, ease: "easeInOut" },
                    }
                  : { opacity: 0.4, scale: 1 }
              }
              className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-500/20 to-blue-600/30 blur-[130px] pointer-events-none"
            />

            {/* 3 & 4. 3D Extruded Logo with Zoom-Through Animation */}
            <motion.div
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: LOOP_TRANSFORM_ORIGIN, // 🎯 Centers zoom directly on the circular loop
              }}
              initial={{
                rotateY: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={
                isTriggered
                  ? {
                      rotateY: [0, 180, 540, 900, 1080], // 3D Y-axis spinning
                      scale: [1, 1.25, 4.5, 25, 100], // Massive scale-up swallowing screen through loop
                      opacity: [1, 1, 1, 0.9, 0], // Fades to transparent as camera emerges on other side
                    }
                  : {
                      rotateY: 0,
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={
                isTriggered
                  ? {
                      duration: 3.3,
                      times: [0, 0.25, 0.55, 0.82, 1],
                      ease: [0.22, 1, 0.36, 1], // Smooth acceleration into the loop
                    }
                  : undefined
              }
              className="relative flex flex-col items-center justify-center will-change-transform"
            >
              {/* Logo with Multi-layered 3D Extrusion Effect */}
              <div
                className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 select-none"
                style={{
                  // Stacked drop-shadows creating physical faux 3D bevel & depth
                  filter: `
                    drop-shadow(1px 1px 0px #06b6d4)
                    drop-shadow(2px 2px 0px #0891b2)
                    drop-shadow(3px 3px 0px #0e7490)
                    drop-shadow(4px 4px 0px #155e75)
                    drop-shadow(5px 5px 0px #0f172a)
                    drop-shadow(6px 6px 0px #020617)
                    drop-shadow(0 0 35px rgba(6, 182, 212, 0.55))
                  `,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Harsha Jagadish 3D Monogram Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Interaction Hint (Fades out immediately on mousemove) */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isTriggered ? { opacity: 0 } : { opacity: 0.8, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-8 text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Move cursor to enter
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Main Portfolio Bento Grid emerges smoothly from behind receding loop */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        animate={
          isTriggered || isDismissed || shouldReduceMotion
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1.2,
                  delay: isTriggered && !isDismissed ? 2.1 : 0, // Enters smoothly as the loop swallows the screen
                  ease: [0.16, 1, 0.3, 1],
                },
              }
            : { opacity: 0, scale: 0.92 }
        }
        className="w-full min-h-screen origin-center"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default IntroSequence
