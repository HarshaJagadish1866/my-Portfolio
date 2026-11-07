"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitContactMessage } from "@/lib/supabase"
import { trackContactSubmit } from "@/lib/analytics"

export function ContactForm() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [honeypot, setHoneypot] = React.useState("") // Spam trap

  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [feedback, setFeedback] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Spam trap check
    if (honeypot.trim() !== "") {
      setStatus("success")
      setFeedback("Thanks! Your message was received.")
      setName("")
      setEmail("")
      setMessage("")
      return
    }

    // 2. Client-side input validation
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setStatus("error")
      setFeedback("Please fill out all required fields.")
      return
    }

    if (cleanName.length < 2 || cleanName.length > 100) {
      setStatus("error")
      setFeedback("Name must be between 2 and 100 characters.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      setStatus("error")
      setFeedback("Please enter a valid email address.")
      return
    }

    if (cleanMessage.length < 5 || cleanMessage.length > 1000) {
      setStatus("error")
      setFeedback("Message must be between 5 and 1000 characters.")
      return
    }

    // 3. Simple Rate Limit (30 seconds cooldown between submissions per session)
    const lastSentTime = sessionStorage.getItem("last_contact_sent")
    const now = Date.now()
    if (lastSentTime && now - parseInt(lastSentTime, 10) < 30000) {
      const waitSec = Math.ceil((30000 - (now - parseInt(lastSentTime, 10))) / 1000)
      setStatus("error")
      setFeedback(`Please wait ${waitSec} seconds before sending another message.`)
      return
    }

    setLoading(true)
    setStatus("idle")
    setFeedback("")

    try {
      const result = await submitContactMessage({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      })

      if (result.success) {
        sessionStorage.setItem("last_contact_sent", now.toString())
        setStatus("success")
        setFeedback("Thanks! Your message was received.")
        setName("")
        setEmail("")
        setMessage("")
        trackContactSubmit()
      } else {
        setStatus("error")
        setFeedback(result.error || "Failed to submit message. Please try again.")
      }
    } catch {
      setStatus("error")
      setFeedback("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-7 sm:p-9 rounded-3xl bg-secondary/30 border border-border/70 backdrop-blur-md shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Saved directly to my database for review.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hidden Honeypot Field */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website_url_check">Leave this field blank</label>
          <input
            id="website_url_check"
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="block text-xs font-mono text-muted-foreground mb-1.5">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Chen"
            className="w-full px-4 py-2.5 rounded-xl bg-card border border-border/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-mono text-muted-foreground mb-1.5">
            Your Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            maxLength={100}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-card border border-border/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono text-muted-foreground mb-1.5">
            Message *
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi Harsha, I saw your work on Arbitr-AI and would like to discuss..."
            className="w-full px-4 py-2.5 rounded-xl bg-card border border-border/70 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/60 resize-none"
          />
        </div>

        {/* Feedback Alert */}
        {status !== "idle" && feedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3.5 rounded-xl text-xs font-mono flex items-start gap-2.5 ${
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
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-5 rounded-xl font-semibold text-sm bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-md shadow-orange-500/20 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
