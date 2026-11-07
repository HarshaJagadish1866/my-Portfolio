"use client"

import * as React from "react"
import { motion } from "motion/react"
import { MessageSquare, Sparkles, CheckCircle2, Clock, Send, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { submitGuestbookEntry, getApprovedGuestbookEntries, type GuestbookEntry } from "@/lib/supabase"
import { LinkedInIcon } from "@/components/icons/social-icons"

function extractAndValidateLinkedIn(input: string): { valid: boolean; username: string | null; error?: string } {
  const trimmed = input.trim()
  if (!trimmed) {
    return { valid: true, username: null }
  }

  // Strip full URLs (e.g. https://www.linkedin.com/in/username/ or linkedin.com/in/username)
  const cleaned = trimmed
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, "")
    .replace(/^linkedin\.com\/in\//i, "")
    .replace(/^\/?in\//i, "")
    .replace(/\/+$/, "")
    .trim()

  // Letters, numbers, and hyphens only, 3 to 100 characters
  const validRegex = /^[a-zA-Z0-9-]{3,100}$/
  if (!validRegex.test(cleaned)) {
    return {
      valid: false,
      username: null,
      error: "LinkedIn username should be 3–100 characters using only letters, numbers, and hyphens.",
    }
  }

  return { valid: true, username: cleaned }
}

export function Guestbook() {
  const [entries, setEntries] = React.useState<GuestbookEntry[]>([])
  const [loadingEntries, setLoadingEntries] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)

  const [name, setName] = React.useState("")
  const [linkedin, setLinkedin] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [honeypot, setHoneypot] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = React.useState("")

  const loadEntries = React.useCallback(async () => {
    setLoadingEntries(true)
    setLoadError(null)
    try {
      const res = await getApprovedGuestbookEntries()
      if (res.error) {
        setLoadError(res.error)
        setEntries([])
      } else {
        setEntries(res.data)
      }
    } catch (err: any) {
      setLoadError(err?.message || "Failed to load entries.")
      setEntries([])
    } finally {
      setLoadingEntries(false)
    }
  }, [])

  React.useEffect(() => {
    loadEntries()
  }, [loadEntries])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Honeypot anti-spam check
    if (honeypot.trim() !== "") {
      setStatus("success")
      setFeedback("Thanks! Your note will appear after I approve it.")
      setName("")
      setLinkedin("")
      setMessage("")
      return
    }

    // 2. Validation
    const cleanName = name.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanMessage) {
      setStatus("error")
      setFeedback("Please fill out both your name and message.")
      return
    }

    if (cleanName.length < 2 || cleanName.length > 50) {
      setStatus("error")
      setFeedback("Name must be between 2 and 50 characters.")
      return
    }

    if (cleanMessage.length < 3 || cleanMessage.length > 500) {
      setStatus("error")
      setFeedback("Message must be between 3 and 500 characters.")
      return
    }

    // LinkedIn Validation (Optional)
    const linkedinResult = extractAndValidateLinkedIn(linkedin)
    if (!linkedinResult.valid) {
      setStatus("error")
      setFeedback(linkedinResult.error || "Please enter a valid LinkedIn username.")
      return
    }

    // 3. Simple Rate Limit (30 seconds cooldown per session)
    const lastSentTime = sessionStorage.getItem("last_guestbook_sent")
    const now = Date.now()
    if (lastSentTime && now - parseInt(lastSentTime, 10) < 30000) {
      const waitSec = Math.ceil((30000 - (now - parseInt(lastSentTime, 10))) / 1000)
      setStatus("error")
      setFeedback(`Please wait ${waitSec}s before submitting another note.`)
      return
    }

    setSubmitting(true)
    setStatus("idle")
    setFeedback("")

    try {
      const result = await submitGuestbookEntry(cleanName, cleanMessage, linkedinResult.username)

      if (result.success) {
        sessionStorage.setItem("last_guestbook_sent", now.toString())
        setStatus("success")
        setFeedback("Thanks! Your note will appear after I approve it.")
        setName("")
        setLinkedin("")
        setMessage("")
      } else {
        setStatus("error")
        setFeedback(result.error || "Failed to submit entry. Please try again.")
      }
    } catch {
      setStatus("error")
      setFeedback("An unexpected error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-surface border border-border/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xl font-bold font-serif text-foreground">Leave a Note</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Sign the guestbook with your name and optional LinkedIn profile.
          </p>
        </div>
        <div className="h-10 w-10 rounded-2xl bg-accent-soft text-accent border border-accent/25 flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5" />
        </div>
      </div>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Hidden Honeypot Field */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="guestbook_website_bot_check">Leave this field blank</label>
          <input
            id="guestbook_website_bot_check"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="guestbook-name" className="block text-xs font-mono text-muted-foreground mb-1.5">
            Your Name *
          </label>
          <input
            id="guestbook-name"
            type="text"
            required
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Chen"
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="guestbook-linkedin" className="block text-xs font-mono text-muted-foreground">
              LinkedIn username (optional)
            </label>
            <span className="text-[11px] font-mono text-muted-foreground/80">
              the part after linkedin.com/in/
            </span>
          </div>
          <input
            id="guestbook-linkedin"
            type="text"
            maxLength={100}
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="e.g. harsha-jagadish3200671866"
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <div>
          <label htmlFor="guestbook-message" className="block text-xs font-mono text-muted-foreground mb-1.5">
            Message *
          </label>
          <textarea
            id="guestbook-message"
            required
            rows={3}
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a short note, advice, or feedback (max 500 chars)..."
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted-foreground/60 resize-none"
          />
        </div>

        {/* Status Alert */}
        {status !== "idle" && feedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-xl text-xs font-mono flex items-start gap-2 ${
              status === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{feedback}</span>
          </motion.div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Moderated before publishing</span>
          </span>

          <button
            type="submit"
            disabled={submitting}
            className="py-2.5 px-5 rounded-xl font-semibold text-xs bg-accent hover:bg-accent-strong text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Sign Guestbook</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Approved Entries Section */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4 text-xs font-mono text-muted-foreground">
          <span>Approved Entries</span>
          <span>{loadingEntries ? "Loading..." : `${entries.length} Notes`}</span>
        </div>

        {/* 1. Loading Skeleton */}
        {loadingEntries ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-background/50 border border-border animate-pulse"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="h-3.5 w-28 bg-muted-foreground/20 rounded" />
                  <div className="h-2.5 w-16 bg-muted-foreground/15 rounded" />
                </div>
                <div className="h-3 w-4/5 bg-muted-foreground/15 rounded mb-1.5" />
                <div className="h-3 w-1/2 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        ) : loadError ? (
          /* 2. Error State with Retry Button */
          <div className="py-6 px-4 text-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
            <AlertCircle className="w-5 h-5 text-rose-500 mx-auto mb-2" />
            <p className="text-rose-600 dark:text-rose-300 font-mono text-xs mb-3 leading-relaxed">
              {loadError}
            </p>
            <button
              type="button"
              onClick={loadEntries}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface hover:bg-surface/80 text-foreground text-xs font-medium border border-border transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        ) : entries.length > 0 ? (
          /* 3. Approved Entries List */
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {entries.map((entry, idx) => (
              <div
                key={entry.id || idx}
                className="p-4 rounded-2xl bg-background/70 border border-border text-xs hover:border-accent/40 transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  {entry.linkedin_username ? (
                    <a
                      href={`https://www.linkedin.com/in/${encodeURIComponent(entry.linkedin_username)}`}
                      target="_blank"
                      rel="noopener noreferrer nofollow ugc"
                      className="group inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-accent transition-colors"
                      title={`View ${entry.name}'s LinkedIn profile`}
                    >
                      <span>{entry.name}</span>
                      <LinkedInIcon className="w-3 h-3 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  ) : (
                    <span className="font-semibold text-foreground">{entry.name}</span>
                  )}
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
          /* 4. Empty State */
          <div className="py-8 text-center rounded-2xl bg-background/40 border border-border/60 text-xs font-mono text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent mx-auto mb-2 opacity-70" />
            <span>Be the first to sign!</span>
          </div>
        )}
      </div>
    </div>
  )
}
