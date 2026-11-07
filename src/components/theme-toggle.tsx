"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { trackThemeToggle } from "@/lib/analytics"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl border border-border/60 bg-secondary/60 flex items-center justify-center opacity-70" />
    )
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark"

  const handleToggle = () => {
    const nextTheme = isDark ? "light" : "dark"
    setTheme(nextTheme)
    trackThemeToggle(nextTheme)
  }

  return (
    <button
      onClick={handleToggle}
      className="relative w-10 h-10 rounded-xl border border-border/80 bg-card hover:bg-secondary text-foreground flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-orange-600 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  )
}
