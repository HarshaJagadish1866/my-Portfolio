"use client"

import * as React from "react"
import { Eye } from "lucide-react"
import { recordProjectView, isSupabaseConfigured } from "@/lib/supabase"

export function ProjectViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    async function loadViews() {
      if (!isSupabaseConfigured) {
        if (isMounted) setLoading(false)
        return
      }

      // Record view once per session per project
      const sessionKey = `viewed_${slug}`
      const hasViewed = typeof window !== "undefined" && sessionStorage.getItem(sessionKey)

      if (!hasViewed) {
        try {
          const count = await recordProjectView(slug)
          if (isMounted && count !== null) {
            setViews(count)
            sessionStorage.setItem(sessionKey, "true")
          }
        } catch {
          // graceful fallback
        }
      } else {
        // If already viewed this session, we can still load current count if desired
      }

      if (isMounted) setLoading(false)
    }

    loadViews()

    return () => {
      isMounted = false
    }
  }, [slug])

  if (!isSupabaseConfigured || views === null) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border/70 text-[11px] font-mono text-muted-foreground">
      <Eye className="w-3 h-3 text-primary" />
      <span>{views} {views === 1 ? "view" : "views"}</span>
    </div>
  )
}
