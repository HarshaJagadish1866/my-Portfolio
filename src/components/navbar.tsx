"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ArrowDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { portfolioData } from "@/data/portfolio"
import { trackResumeDownload } from "@/lib/analytics"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ]

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/70 py-3 shadow-xs"
          : "bg-background/40 backdrop-blur-sm py-4"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="#hero"
          className="group flex items-center gap-2.5 text-foreground font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg shrink-0"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            HJ
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-serif font-bold tracking-tight group-hover:text-primary transition-colors">
              {portfolioData.owner.name}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono -mt-0.5">
              AI & Data Science
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-card/70 border border-border/70 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-primary hover:bg-secondary/70 rounded-full transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={portfolioData.owner.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackResumeDownload}
            data-glass-type="button"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-1" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger + Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={mobileMenuOpen}
            className="w-10 h-10 rounded-xl border border-border/80 bg-card/90 text-foreground flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs cursor-pointer hover:bg-secondary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>

        {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-border/80 px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border/60 flex flex-col gap-2 mt-2">
                <a
                  href={portfolioData.owner.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackResumeDownload()
                    setMobileMenuOpen(false)
                  }}
                  className="group w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 cursor-pointer transition-all"
                >
                  <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
