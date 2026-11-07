"use client"

import React, { useEffect, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "motion/react"

export function GlobalLiquidCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [isSupported, setIsSupported] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Raw mouse coordinates
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Position spring: smooth, lag-free trailing glow
  const smoothX = useSpring(rawX, { stiffness: 350, damping: 28, mass: 0.5 })
  const smoothY = useSpring(rawY, { stiffness: 350, damping: 28, mass: 0.5 })

  // 1. Device check: Hide on mobile/touch devices and respect reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkDevice = () => {
      const isTouch =
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches

      setIsSupported(!isTouch)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // 2. Mouse tracking: Only active when cursor is inside the window
  useEffect(() => {
    if (!isSupported || shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isSupported, isVisible, rawX, rawY, shouldReduceMotion])

  // Disable on unsupported devices, touch screens, or if user prefers reduced motion
  if (!isSupported || shouldReduceMotion) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: -1, // Sits safely BEHIND content so it never covers or distorts text
          }}
          aria-hidden="true"
        >
          {/* Small, soft ambient backlight glow */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500/15 via-amber-500/10 to-transparent blur-2xl pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
