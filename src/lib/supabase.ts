import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface ContactMessagePayload {
  name: string
  email: string
  message: string
}

export interface GuestbookEntry {
  id?: string
  name: string
  message: string
  approved?: boolean
  created_at?: string
}

// 1. Submit Contact Message
export async function submitContactMessage(payload: ContactMessagePayload) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: "Supabase is not configured yet. Please add your credentials to .env.local.",
    }
  }

  const { error } = await supabase.from("contact_messages").insert([
    {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
    },
  ])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// 2. Submit Guestbook Entry (Defaults to approved = false)
export async function submitGuestbookEntry(name: string, message: string) {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      error: "Supabase is not configured yet. Please add your credentials to .env.local.",
    }
  }

  const { error } = await supabase.from("guestbook").insert([
    {
      name: name.trim(),
      message: message.trim(),
      approved: false,
    },
  ])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

// 3. Fetch Approved Guestbook Entries with timeout and error tracking
export async function getApprovedGuestbookEntries(): Promise<{
  data: GuestbookEntry[]
  error: string | null
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: [],
      error: "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    }
  }

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database connection timed out. Please retry.")), 7000)
    )

    const fetchPromise = supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(25)

    const result = (await Promise.race([fetchPromise, timeoutPromise])) as {
      data: GuestbookEntry[] | null
      error: { message: string } | null
    }

    if (result.error) {
      return { data: [], error: result.error.message }
    }

    return { data: (result.data as GuestbookEntry[]) || [], error: null }
  } catch (err: any) {
    return {
      data: [],
      error: err?.message || "Failed to load guestbook entries.",
    }
  }
}

// 4. Increment and get project view count via safe RPC function
export async function recordProjectView(projectSlug: string): Promise<number | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null
  }

  try {
    const { data, error } = await supabase.rpc("increment_project_views", {
      p_slug: projectSlug,
    })

    if (error) {
      console.warn("View counter RPC error:", error.message)
      return null
    }

    return typeof data === "number" ? data : Number(data)
  } catch (err) {
    console.warn("View counter unexpected error:", err)
    return null
  }
}
