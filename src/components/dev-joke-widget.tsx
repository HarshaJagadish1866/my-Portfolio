"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, RotateCw, Copy, Check, Terminal, Smile } from "lucide-react"

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
      // Safe client fallback
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
      // Ignore clipboard write failures
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto my-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md overflow-hidden shadow-lg shadow-zinc-950/5"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/90">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>dev_humor.sh</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={copyJokeToClipboard}
            disabled={loading || !joke}
            title="Copy joke"
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition disabled:opacity-40"
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
            className="p-1.5 rounded-lg text-zinc-500 hover:text-cyan-500 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition disabled:opacity-40"
            aria-label="Refresh joke"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Joke Body */}
      <div className="p-5 font-mono text-sm min-h-[110px] flex flex-col justify-center">
        {loading ? (
          <div className="space-y-2.5 py-1" aria-label="Loading joke">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3 animate-pulse" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={joke?.id || "fallback"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="space-y-2 leading-relaxed"
            >
              {joke?.type === "twopart" ? (
                <>
                  <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold mr-1.5">$</span>
                    {joke.setup}
                  </p>
                  <p className="text-cyan-600 dark:text-cyan-400 font-medium pl-4 border-l-2 border-cyan-500/40 text-sm">
                    {joke.delivery}
                  </p>
                </>
              ) : (
                <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold mr-1.5">$</span>
                  {joke?.joke}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer Pill */}
      <div className="px-5 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Smile className="w-3.5 h-3.5 text-amber-500" />
          <span>Dev Joke of the Day</span>
        </span>
        <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
          Powered by JokeAPI
        </span>
      </div>
    </motion.div>
  )
}
