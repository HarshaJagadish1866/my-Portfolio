"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RotateCw, Copy, Check, Smile } from "lucide-react"

interface JokeData {
  id?: number | string
  type: "single" | "twopart"
  joke?: string
  setup?: string
  delivery?: string
  isFallback?: boolean
}

export function DevJokeWidget() {
  const [joke, setJoke] = useState<JokeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  async function fetchJoke() {
    setLoading(true)
    try {
      const res = await fetch("/api/dev-joke")
      const data = await res.json()
      setJoke(data)
    } catch {
      setJoke({
        type: "twopart",
        setup: "Why do programmers prefer dark mode?",
        delivery: "Because light attracts bugs.",
        isFallback: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  const copyJokeToClipboard = async () => {
    if (!joke) return
    const text =
      joke.type === "twopart" ? `${joke.setup}\n${joke.delivery}` : joke.joke || ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto my-6 rounded-2xl border border-border bg-surface/70 backdrop-blur-md overflow-hidden shadow-xs"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center gap-2">
          <Smile className="w-4 h-4 text-accent" />
          <span className="font-serif font-semibold text-sm text-foreground">
            Dev Joke of the Day
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={copyJokeToClipboard}
            disabled={loading || !joke}
            title="Copy joke"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Copy joke"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={fetchJoke}
            disabled={loading}
            title="Get another joke"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-background/80 transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Refresh joke"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Joke Body */}
      <div className="p-5 font-mono text-sm min-h-[96px] flex flex-col justify-center">
        {loading ? (
          <div className="space-y-2 py-1" aria-label="Loading joke">
            <div className="h-4 bg-muted-foreground/15 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-muted-foreground/15 rounded w-2/3 animate-pulse" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={joke?.id || "fallback"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 leading-relaxed"
            >
              {joke?.type === "twopart" ? (
                <>
                  <p className="text-foreground text-sm">
                    {joke.setup}
                  </p>
                  <p className="text-accent-strong dark:text-accent font-medium pl-3 border-l-2 border-accent/40 text-sm">
                    {joke.delivery}
                  </p>
                </>
              ) : (
                <p className="text-foreground text-sm">
                  {joke?.joke}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
