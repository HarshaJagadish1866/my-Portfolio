"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { MessageSquare, Sparkles, CheckCircle2, Clock, Send, Loader2, AlertCircle } from "lucide-react"
import { submitGuestbookEntry, getApprovedGuestbookEntries, type GuestbookEntry, isSupabaseConfigured } from "@/lib/supabase"

export function Guestbook() {
  const [entries, setEntries] = React.useState<GuestbookEntry[]>([])
  const [loadingEntries, setLoadingEntries] = React.useState(true)

  const [name, setName] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = React.useState("")

  const loadEntries = React.useCallback(async () => {
    setLoadingEntries(true)
    try {
      const data = await getApprovedGuestbookEntries()
      setEntries(data)
    } catch {
      // ignore
    } finally {
      setLoadingEntries(false)
    }
  }, [])

  React.useEffect(() => {
    loadEntries()
  }, [loadEntries])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      setStatus("error")
      setFeedback("Please fill out both your name and message.")
      return
    }

    setSubmitting(true)
    setStatus("idle")
    setFeedback("")

    try {
      const result = await submitGuestbookEntry(name, message)

      if (result.success) {
        setStatus("success")
        setFeedback("Thank you! Your entry has been submitted for approval.")
        setName("")
        setMessage("")
      } else {
        setStatus("error")
        setFeedback(result.error || "Failed to submit entry. Please try again.")
      }
    } catch {
      setStatus("error")
      setFeedback("An unexpected error occurred.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-secondary/30 border border-border/70 backdrop-blur-md shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">Community Guestbook</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Leave a public note or testimonial for other visitors to see.
            </p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Submit Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 mb-8">
          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name or Handle"
              className="w-full px-4 py-2 rounded-xl bg-card border border-border/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-muted-foreground/60"
            />
          </div>

          <div>
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a short note or encouragement..."
              className="w-full px-4 py-2 rounded-xl bg-card border border-border/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all placeholder:text-muted-foreground/60 resize-none"
            />
          </div>

          {/* Status Message */}
          {status !== "idle" && feedback && (
            <div
              className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
                status === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{feedback}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              <span>Moderated via Supabase</span>
            </span>

            <button
              type="submit"
              disabled={submitting}
              className="py-2 px-4 rounded-xl font-semibold text-xs bg-card border border-border/80 hover:border-cyan-500/50 hover:bg-secondary text-foreground transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>Sign Guestbook</span>
            </button>
          </div>
        </form>

        {/* Approved Entries List */}
        <div className="border-t border-border/50 pt-5">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
            <span>Approved Signatures</span>
            <span>{entries.length} Entries</span>
          </div>

          {loadingEntries ? (
            <div className="py-6 text-center text-xs font-mono text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-500" />
              <span>Checking database...</span>
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {entries.map((entry, idx) => (
                <div
                  key={entry.id || idx}
                  className="p-3.5 rounded-xl bg-card/60 border border-border/60 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground">{entry.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center rounded-2xl bg-card/30 border border-border/40 text-xs font-mono text-muted-foreground">
              <Sparkles className="w-4 h-4 text-cyan-500 mx-auto mb-2 opacity-60" />
              <span>No public signatures yet. Be the first to leave your mark!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
