import { NextRequest, NextResponse, connection } from "next/server"

interface CachedRepoStats {
  data: {
    stars: number
    forks: number
    language: string | null
    updatedAt: string
    formattedDate: string
  }
  timestamp: number
}

// In-memory server cache (1 hour TTL)
const cache = new Map<string, CachedRepoStats>()
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

export async function GET(request: NextRequest) {
  await connection()
  const searchParams = request.nextUrl.searchParams
  let repo = searchParams.get("repo")

  if (!repo) {
    return NextResponse.json({ error: "Missing repo parameter" }, { status: 400 })
  }

  // Support both full URL (https://github.com/owner/repo) and 'owner/repo' format
  try {
    if (repo.startsWith("http")) {
      const url = new URL(repo)
      repo = url.pathname.replace(/^\/|\/$/g, "")
    }
  } catch {
    // Keep repo as is
  }

  const parts = repo.split("/").filter(Boolean)
  if (parts.length < 2) {
    return NextResponse.json(
      { error: "Invalid repository format. Expected owner/repo" },
      { status: 400 }
    )
  }

  const repoKey = `${parts[0]}/${parts[1]}`

  // Check cache first
  const cached = cache.get(repoKey)
  const now = Date.now()
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({ ...cached.data, cached: true })
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-HarshaJagadish",
    }

    // Optional server token for elevated 5,000 req/hr rate limit
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`https://api.github.com/repos/${repoKey}`, {
      headers,
      next: { revalidate: 3600 }, // Next.js fetch cache 1 hour
    })

    if (!response.ok) {
      // If rate-limited or not found, return fallback info gracefully
      return NextResponse.json(
        {
          available: false,
          status: response.status,
          message: response.status === 403 ? "Rate limit reached" : "Repository not found",
        },
        { status: 200 }
      )
    }

    const json = await response.json()

    // Format updated date (e.g., "Jul 2026")
    let formattedDate = ""
    try {
      const d = new Date(json.updated_at)
      formattedDate = d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    } catch {
      formattedDate = "Recently"
    }

    const result = {
      available: true,
      stars: json.stargazers_count ?? 0,
      forks: json.forks_count ?? 0,
      language: json.language ?? null,
      updatedAt: json.updated_at ?? "",
      formattedDate,
    }

    // Save in cache
    cache.set(repoKey, {
      data: result,
      timestamp: now,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("GitHub stats fetch error:", error)
    return NextResponse.json(
      {
        available: false,
        error: "Failed to connect to GitHub API",
      },
      { status: 200 }
    )
  }
}
