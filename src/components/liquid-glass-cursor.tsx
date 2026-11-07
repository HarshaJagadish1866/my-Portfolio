"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { LiquidGlass } from "@/components/ui/liquid-glass"

export function LiquidGlassCursor() {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  // Cursor coordinates
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Smooth fluid spring physics
  const springConfig = { damping: 26, stiffness: 320, mass: 0.45 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  React.useEffect(() => {
    setMounted(true)

    // Check for touch / coarse pointer devices (hide cursor on phones/tablets)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    // Detect clickable interactive elements for magnetic/scale expansion
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], label, [tabindex="0"]'
      )
      setIsHovered(!!interactive)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [isVisible, mouseX, mouseY])

  // Don't render on server, touch devices, or if reduced motion is requested
  if (!mounted || isTouchDevice || reduceMotion) {
    return null
  }

  // Base diameter of the circular liquid glass lens
  const size = 68

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="fixed top-0 left-0"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: -size / 2,
          translateY: -size / 2,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.88 : isHovered ? 1.35 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: "spring", damping: 20, stiffness: 350 },
        }}
      >
        <div
          style={{ width: size, height: size }}
          className="relative flex items-center justify-center rounded-full"
        >
          {/* Liquid Glass Refractive Lens */}
          <LiquidGlass
            radius={size / 2}
            scale={isHovered ? 45 : 32}
            aberration={isHovered ? 10 : 6}
            bevelDepth={isHovered ? 20 : 14}
            frost={0.3}
            tint={0.1}
            className="size-full shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_20px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-cyan-400/30"
          />

          {/* Inner Cyan Precision Dot */}
          <div
            className={`absolute h-1.5 w-1.5 rounded-full transition-all duration-200 pointer-events-none ${
              isHovered
                ? "bg-cyan-300 scale-150 shadow-[0_0_8px_#38bdf8]"
                : "bg-cyan-400/80 shadow-[0_0_4px_#06b6d4]"
            }`}
          />
        </div>
      </motion.div>
    </div>
  )
}
