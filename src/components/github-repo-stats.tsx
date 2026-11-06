"use client"

import { useEffect, useState } from "react"
import { Star, Clock, Code2, AlertCircle } from "lucide-react"

interface RepoStats {
  available: boolean
  stars: number
  forks: number
  language: string | null
  formattedDate: string
}

interface GithubRepoStatsProps {
  githubUrl: string | null | undefined
}

export function GithubRepoStats({ githubUrl }: GithubRepoStatsProps) {
  const [stats, setStats] = useState<RepoStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!githubUrl) {
      setLoading(false)
      return
    }

    let isMounted = true

    async function fetchStats() {
      try {
        setLoading(true)
        setError(false)

        const res = await fetch(`/api/github-stats?repo=${encodeURIComponent(githubUrl!)}`)
        if (!res.ok) {
          throw new Error("HTTP error")
        }

        const data = await res.json()
        if (isMounted) {
          if (data.available === false) {
            setError(true)
          } else {
            setStats(data)
          }
        }
      } catch (err) {
        if (isMounted) setError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchStats()

    return () => {
      isMounted = false
    }
  }, [githubUrl])

  // If no GitHub link or failed to load, hide gracefully
  if (!githubUrl || error) {
    return null
  }

  // Loading skeleton
  if (loading) {
    return (
      <div
        className="flex items-center gap-3 pt-2 text-xs font-mono text-zinc-600 dark:text-zinc-400"
        aria-label="Loading repository stats"
      >
        <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>
    )
  }

  if (!stats) return null

  // Language dot color mapping
  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "python":
        return "bg-blue-500"
      case "typescript":
        return "bg-sky-500"
      case "javascript":
        return "bg-yellow-400"
      case "html":
        return "bg-orange-500"
      default:
        return "bg-cyan-500"
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-mono">
      {stats.language && (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
          <span className={`w-2 h-2 rounded-full ${getLanguageColor(stats.language)}`} />
          <span>{stats.language}</span>
        </span>
      )}

      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
        <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
        <span>{stats.stars}</span>
      </span>

      {stats.formattedDate && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
          <Clock className="w-3 h-3" />
          <span>{stats.formattedDate}</span>
        </span>
      )}
    </div>
  )
}
