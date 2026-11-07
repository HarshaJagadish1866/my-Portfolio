"use client"

import * as React from "react"
import { GoogleAnalytics } from "@next/third-parties/google"
import { motion, AnimatePresence } from "motion/react"
import { ShieldCheck, Cookie, X } from "lucide-react"
import { GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY } from "@/lib/analytics"

export function AnalyticsWrapper() {
  const [consent, setConsent] = React.useState<"accepted" | "declined" | "pending">("pending")
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "accepted")
    setConsent("accepted")
  }

  const handleDecline = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, "declined")
    setConsent("declined")
  }

  return (
    <>
      {/* Load GA4 only if visitor explicitly accepted and ID is configured */}
      {consent === "accepted" && GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      ) : null}

      {/* Polite Cookie & Analytics Notice Banner */}
      <AnimatePresence>
        {isClient && consent === "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 sm:p-5 rounded-2xl bg-background/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-border shadow-2xl shadow-cyan-950/15"
            role="region"
            aria-label="Cookie consent banner"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span>Privacy & Analytics</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use privacy-friendly Google Analytics 4 to understand site traffic and improve performance. No personal or sensitive data is collected.
                </p>
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm hover:opacity-95 transition cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={handleDecline}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer border border-border/60"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
