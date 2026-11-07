"use client"

import React, { useEffect, useRef, useState, useId } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "motion/react"
import { cn } from "@/lib/utils"

export type GlassCursorType = "default" | "text" | "button" | "card" | "input"

interface HoverState {
  type: GlassCursorType
  width: number
  height: number
  radius: number
  scale: number
  aberration: number
  frost: number
  tint: number
  magneticCenter?: { x: number; y: number }
}

const DEFAULT_STATE: HoverState = {
  type: "default",
  width: 42,
  height: 42,
  radius: 999,
  scale: 36,
  aberration: 4,
  frost: 0.3,
  tint: 0.12,
}

// Global displacement filter cache to prevent unnecessary re-computations
const filterCache = new Map<string, { id: string; svg: string }>()

export function GlobalLiquidCursor() {
  const shouldReduceMotion = useReducedMotion()
  const reactId = useId().replace(/:/g, "")

  const [isSupported, setIsSupported] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverState, setHoverState] = useState<HoverState>(DEFAULT_STATE)
  const [activeFilter, setActiveFilter] = useState<{ id: string; svg: string } | null>(null)

  // Raw mouse coordinates
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Springs for position
  const posSpringConfig = shouldReduceMotion
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 450, damping: 28, mass: 0.7 }

  const smoothX = useSpring(rawX, posSpringConfig)
  const smoothY = useSpring(rawY, posSpringConfig)

  // Springs for morphing dimensions
  const morphSpringConfig = shouldReduceMotion
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 340, damping: 25, mass: 0.9 }

  const smoothWidth = useSpring(DEFAULT_STATE.width, morphSpringConfig)
  const smoothHeight = useSpring(DEFAULT_STATE.height, morphSpringConfig)
  const smoothRadius = useSpring(DEFAULT_STATE.radius, morphSpringConfig)

  // Center-aligned top/left transforms
  const lensLeft = useTransform([smoothX, smoothWidth], ([x, w]) => (x as number) - (w as number) / 2)
  const lensTop = useTransform([smoothY, smoothHeight], ([y, h]) => (y as number) - (h as number) / 2)

  // 1. Device check: Disable on mobile / touch
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkDevice = () => {
      const isTouch =
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches

      if (isTouch) {
        setIsSupported(false)
        document.documentElement.classList.remove("has-custom-cursor")
      } else {
        setIsSupported(true)
        document.documentElement.classList.add("has-custom-cursor")
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  // 2. Mouse tracking & context-aware hover detection
  useEffect(() => {
    if (!isSupported) return

    let lastKnownX = -100
    let lastKnownY = -100

    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX
      const clientY = e.clientY
      lastKnownX = clientX
      lastKnownY = clientY

      if (!isVisible) setIsVisible(true)

      // Find hovered DOM element
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement | null
      if (!target) {
        rawX.set(clientX)
        rawY.set(clientY)
        setHoverState(DEFAULT_STATE)
        return
      }

      // Check explicit data-glass-type attribute
      const explicitType = target.closest("[data-glass-type]")?.getAttribute("data-glass-type")

      // A. Input / Form / Terminal Focus
      if (
        explicitType === "input" ||
        target.closest("input, textarea, [contenteditable='true'], .terminal-code, pre, code")
      ) {
        rawX.set(clientX)
        rawY.set(clientY)
        setHoverState({
          type: "input",
          width: 20,
          height: 20,
          radius: 999,
          scale: 0,
          aberration: 0,
          frost: 0,
          tint: 0.05,
        })
        return
      }

      // B. Buttons & Interactive Links (Pill Morph with Chromatic Aberration)
      const buttonEl =
        explicitType === "button"
          ? (target.closest("[data-glass-type='button']") as HTMLElement)
          : (target.closest("button, a, [role='button']") as HTMLElement)

      if (buttonEl && explicitType !== "card") {
        const rect = buttonEl.getBoundingClientRect()
        const btnCenterX = rect.left + rect.width / 2
        const btnCenterY = rect.top + rect.height / 2
        const magnetX = btnCenterX * 0.45 + clientX * 0.55
        const magnetY = btnCenterY * 0.45 + clientY * 0.55

        rawX.set(magnetX)
        rawY.set(magnetY)

        setHoverState({
          type: "button",
          width: Math.round(rect.width + 12),
          height: Math.round(rect.height + 8),
          radius: 999,
          scale: 48,
          aberration: 9,
          frost: 0.15,
          tint: 0.14,
          magneticCenter: { x: btnCenterX, y: btnCenterY },
        })
        return
      }

      // C. Big Typography / Headers (Magnifying Glass Enclosure)
      const isTextHeader =
        explicitType === "text" ||
        target.closest("h1, h2, h3, .hero-name, [data-glass-type='text']")

      if (isTextHeader && explicitType !== "card") {
        const headerEl = (target.closest("h1, h2, h3, [data-glass-type='text']") || target) as HTMLElement
        const rect = headerEl.getBoundingClientRect()

        rawX.set(clientX)
        rawY.set(clientY)

        const encloseW = Math.max(120, Math.min(Math.round(rect.width + 24), 280))
        const encloseH = Math.max(64, Math.min(Math.round(rect.height + 16), 110))

        setHoverState({
          type: "text",
          width: encloseW,
          height: encloseH,
          radius: Math.round(encloseH / 2),
          scale: 64, // Powerful magnification
          aberration: 6,
          frost: 0.08,
          tint: 0.08,
        })
        return
      }

      // D. Interactive Cards (Skills Matrix, Projects, Certifications)
      const isCard =
        explicitType === "card" ||
        target.closest(
          "#projects article, #projects .group, #skills .rounded-2xl, #certifications .rounded-3xl, #education .rounded-3xl, [data-glass-type='card']"
        )

      if (isCard) {
        // If hovering on an inner button inside a card, morph to button
        const innerBtn = target.closest("button, a, [role='button']") as HTMLElement | null
        if (innerBtn) {
          const rect = innerBtn.getBoundingClientRect()
          const btnCenterX = rect.left + rect.width / 2
          const btnCenterY = rect.top + rect.height / 2
          const magnetX = btnCenterX * 0.45 + clientX * 0.55
          const magnetY = btnCenterY * 0.45 + clientY * 0.55

          rawX.set(magnetX)
          rawY.set(magnetY)

          setHoverState({
            type: "button",
            width: Math.round(rect.width + 12),
            height: Math.round(rect.height + 8),
            radius: 999,
            scale: 48,
            aberration: 9,
            frost: 0.15,
            tint: 0.14,
            magneticCenter: { x: btnCenterX, y: btnCenterY },
          })
          return
        }

        rawX.set(clientX)
        rawY.set(clientY)
        setHoverState({
          type: "card",
          width: 120,
          height: 120,
          radius: 999,
          scale: 28,
          aberration: 3,
          frost: 1.2, // Frosted blur
          tint: 0.18,
        })
        return
      }

      // E. Default Empty Space
      rawX.set(clientX)
      rawY.set(clientY)
      setHoverState(DEFAULT_STATE)
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
  }, [isSupported, isVisible, rawX, rawY])

  // 3. Update dimension springs when target changes
  useEffect(() => {
    smoothWidth.set(hoverState.width)
    smoothHeight.set(hoverState.height)
    smoothRadius.set(hoverState.radius)
  }, [hoverState.width, hoverState.height, hoverState.radius, smoothWidth, smoothHeight, smoothRadius])

  // 4. Generate & Cache Liquid Glass SVG Displacement Map
  useEffect(() => {
    if (!isSupported) return
    let cancelled = false

    const { width, height, radius, scale, aberration, frost } = hoverState
    const cacheKey = `${hoverState.type}-${width}x${height}-r${radius}-s${scale}-a${aberration}-f${frost}`

    if (filterCache.has(cacheKey)) {
      setActiveFilter(filterCache.get(cacheKey)!)
      return
    }

    ;(async () => {
      try {
        const mapUrl = await generateDisplacementBlobUrl({
          width: Math.max(1, width),
          height: Math.max(1, height),
          radius: Math.min(radius, width / 2, height / 2),
          bevelDepth: Math.min(14, Math.min(width, height) / 2),
          dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2),
        })

        if (cancelled) {
          URL.revokeObjectURL(mapUrl)
          return
        }

        const id = `lg-cur-${reactId}-${cacheKey.replace(/[^a-zA-Z0-9]/g, "-")}`
        const svg = buildFilterSvg({
          id,
          mapUrl,
          width,
          height,
          scale,
          aberration,
          frost,
        })

        const item = { id, svg }
        filterCache.set(cacheKey, item)
        setActiveFilter(item)
      } catch (err) {
        console.debug("Liquid cursor filter generation fallback:", err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [
    isSupported,
    hoverState.type,
    hoverState.width,
    hoverState.height,
    hoverState.radius,
    hoverState.scale,
    hoverState.aberration,
    hoverState.frost,
    reactId,
  ])

  if (!isSupported) return null

  // Compute backdrop filter
  const backdrop = activeFilter
    ? `url(#${activeFilter.id}) blur(0.5px) saturate(1.8) brightness(1.04)`
    : "blur(14px) saturate(1.6) brightness(1.04)"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: lensLeft,
            y: lensTop,
            width: smoothWidth,
            height: smoothHeight,
            borderRadius: smoothRadius,
            pointerEvents: "none",
            zIndex: 999999,
          }}
          className="overflow-hidden"
          aria-hidden="true"
        >
          {/* Glass Lens Container */}
          <div
            className={cn(
              "relative w-full h-full transition-colors duration-200 pointer-events-none select-none",
              "border border-white/40 dark:border-cyan-400/30",
              "shadow-[0_8px_32px_0_rgba(6,182,212,0.18),inset_0_0_0_1px_rgba(255,255,255,0.25)]"
            )}
            style={{
              borderRadius: "inherit",
              backdropFilter: backdrop,
              WebkitBackdropFilter: backdrop,
              backgroundColor: `rgb(255 255 255 / ${hoverState.tint})`,
            }}
          >
            {/* SVG Filter Injection */}
            {activeFilter && (
              <span
                key={activeFilter.id}
                className="pointer-events-none absolute size-0 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: activeFilter.svg }}
              />
            )}

            {/* Specular curved gloss highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                borderRadius: "inherit",
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 45%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ==============================================================================
 * Core LiquidGlass Snell's Law Math & Displacement Engine
 * ============================================================================== */

type DisplacementOptions = {
  width: number
  height: number
  radius: number
  bevelDepth: number
  dpr?: number
}

function sdRoundedBox(px: number, py: number, halfW: number, halfH: number, r: number) {
  const qx = Math.abs(px) - halfW + r
  const qy = Math.abs(py) - halfH + r
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0))
  const inside = Math.min(Math.max(qx, qy), 0)
  return inside + outside - r
}

function bendFromDepth(x: number) {
  const u = 1 - Math.min(1, Math.max(0, x))
  const denom = (1 - u ** 4) ** 0.75
  if (denom < 1e-6) return 0
  const thetaI = Math.atan(Math.min(u ** 3 / denom, 8))
  const sinT = Math.sin(thetaI) / 1.5
  if (sinT >= 1) return Math.sin(thetaI)
  return Math.sin(thetaI - Math.asin(sinT))
}

function buildPhiTable(bevelPx: number) {
  const n = Math.max(1, Math.ceil(bevelPx))
  const phi = new Float32Array(n + 1)
  for (let d = 1; d <= n; d++) phi[d] = phi[d - 1] + bendFromDepth(d / n)
  return phi
}

function samplePhi(phi: Float32Array, depth: number) {
  const max = phi.length - 1
  if (depth <= 0) return phi[0]
  if (depth >= max) return phi[max]
  const i = Math.floor(depth)
  const f = depth - i
  return phi[i] * (1 - f) + phi[i + 1] * f
}

function computeDisplacementData(opts: DisplacementOptions) {
  const dpr = opts.dpr ?? 1
  const gain = 1.35
  const lx = -0.55
  const ly = -0.85

  const W = Math.max(1, Math.round(opts.width * dpr))
  const H = Math.max(1, Math.round(opts.height * dpr))
  const halfW = W / 2
  const halfH = H / 2
  const r = Math.min(opts.radius * dpr, halfW, halfH)
  const bevel = Math.max(1, opts.bevelDepth * dpr)
  const phi = buildPhiTable(bevel)

  const field = new Float32Array(W * H)
  for (let y = 0; y < H; y++) {
    const py = y - halfH + 0.5
    for (let x = 0; x < W; x++) {
      const d = sdRoundedBox(x - halfW + 0.5, py, halfW, halfH, r)
      field[y * W + x] = d > 0 ? 0 : samplePhi(phi, Math.min(bevel, -d))
    }
  }

  const data = new Uint8ClampedArray(W * H * 4)
  for (let y = 0; y < H; y++) {
    const py = y - halfH + 0.5
    for (let x = 0; x < W; x++) {
      const px = x - halfW + 0.5
      const i = (y * W + x) << 2
      const d = sdRoundedBox(px, py, halfW, halfH, r)

      if (d > 0) {
        data[i] = data[i + 1] = data[i + 2] = 128
        data[i + 3] = 0
        continue
      }

      const x0 = Math.max(0, x - 1)
      const x1 = Math.min(W - 1, x + 1)
      const y0 = Math.max(0, y - 1)
      const y1 = Math.min(H - 1, y + 1)

      const dPhiX = (field[y * W + x1] - field[y * W + x0]) / (x1 - x0 || 1)
      const dPhiY = (field[y1 * W + x] - field[y0 * W + x]) / (y1 - y0 || 1)

      const dx = Math.max(-1, Math.min(1, dPhiX * gain))
      const dy = Math.max(-1, Math.min(1, dPhiY * gain))

      let specular = 0
      if (d >= -bevel) {
        const gx =
          sdRoundedBox(px + 1, py, halfW, halfH, r) -
          sdRoundedBox(px - 1, py, halfW, halfH, r)
        const gy =
          sdRoundedBox(px, py + 1, halfW, halfH, r) -
          sdRoundedBox(px, py - 1, halfW, halfH, r)
        const len = Math.hypot(gx, gy) || 1
        const dot = (gx / len) * lx + (gy / len) * ly
        const rim = 1 - Math.min(1, -d / bevel)
        specular = (Math.max(0, dot) + Math.max(0, -dot) * 0.35) * rim
      }

      data[i] = 128 + dx * 127
      data[i + 1] = 128 + dy * 127
      data[i + 2] = Math.round(specular * 255)
      data[i + 3] = 255
    }
  }

  return { data, width: W, height: H }
}

async function generateDisplacementBlobUrl(opts: DisplacementOptions) {
  const { data, width, height } = computeDisplacementData(opts)
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("2d context unavailable")
  ctx.putImageData(new ImageData(data, width, height), 0, 0)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))
  if (!blob) throw new Error("Failed to encode displacement map")
  return URL.createObjectURL(blob)
}

type FilterOptions = {
  id: string
  mapUrl: string
  width: number
  height: number
  scale: number
  aberration: number
  frost: number
}

function buildFilterSvg({ id, mapUrl, width, height, scale, aberration, frost }: FilterOptions) {
  const pad = Math.ceil(scale + aberration + 4)
  const px = (pad / Math.max(1, width)) * 100
  const py = (pad / Math.max(1, height)) * 100
  const region = `x="-${px.toFixed(3)}%" y="-${py.toFixed(3)}%" width="${(100 + 2 * px).toFixed(3)}%" height="${(100 + 2 * py).toFixed(3)}%"`

  const map = `<feImage href="${mapUrl}" xlink:href="${mapUrl}" x="0" y="0" width="${width}" height="${height}" result="map" preserveAspectRatio="none"/>`
  const displace = (s: number, result: string) =>
    `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G" result="${result}"/>`

  const body =
    aberration <= 0
      ? `${displace(scale, "rgb")}`
      : `${displace(scale + aberration, "dispR")}
  <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
  ${displace(scale, "dispG")}
  <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
  ${displace(Math.max(0, scale - aberration), "dispB")}
  <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
  <feBlend in="red" in2="green" mode="screen" result="rg"/>
  <feBlend in="rg" in2="blue" mode="screen" result="rgb"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><filter id="${id}" color-interpolation-filters="sRGB" ${region}>
  ${map}
  ${body}
  <feGaussianBlur in="rgb" stdDeviation="${frost}"/>
</filter></svg>`
}
