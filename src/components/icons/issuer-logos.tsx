import * as React from "react"

export function GoogleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  )
}

export function KaggleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#20BEFF">
      <path d="M18.825 23.859c-.022.09-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.246l-5.32-6.505-1.523 1.453v5.038c0 .164-.082.26-.246.26H5.065c-.164 0-.258-.096-.258-.26V.26c0-.164.094-.26.258-.26h2.759c.164 0 .246.096.246.26v14.482L14.717.307c.117-.205.281-.307.492-.307h3.35c.141 0 .234.059.281.176.047.117.023.223-.07.316l-7.382 7.194 7.511 15.827c.07.164.047.281-.07.346z" />
    </svg>
  )
}

export function HackerRankLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#00EA64">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm2.727 17.455h-2.182v-4.364H9.455v4.364H7.273V6.545h2.182v4.364h3.091V6.545h2.182v10.91z" />
    </svg>
  )
}

export function ForageLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0F172A" />
      <path
        d="M8 7h8v2.5H10.5v2.8h4.5v2.5h-4.5V17H8V7z"
        fill="#38BDF8"
      />
    </svg>
  )
}

export function IITLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#7C2D12" />
      <path
        d="M7 6h10v2H13v8h3v2H8v-2h3V8H7V6z"
        fill="#FEF3C7"
      />
    </svg>
  )
}

export function AnalyticsClubLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="22" height="22" x="1" y="1" rx="5" fill="#1E1B4B" />
      <path
        d="M6 16l3.5-5 3 3 5.5-7.5"
        stroke="#F26B21"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function IssuerLogoTile({ issuer }: { issuer: string }) {
  const norm = issuer.toLowerCase()

  let icon = null
  if (norm.includes("google")) {
    icon = <GoogleLogo className="w-6 h-6" />
  } else if (norm.includes("kaggle")) {
    icon = <KaggleLogo className="w-5 h-5" />
  } else if (norm.includes("hackerrank")) {
    icon = <HackerRankLogo className="w-6 h-6" />
  } else if (norm.includes("forage") || norm.includes("deloitte")) {
    icon = <ForageLogo className="w-6 h-6" />
  } else if (norm.includes("consulting") || norm.includes("analytics club")) {
    icon = <AnalyticsClubLogo className="w-6 h-6" />
  } else if (norm.includes("iit") || norm.includes("madras") || norm.includes("guwahati") || norm.includes("sunderbans")) {
    icon = <IITLogo className="w-6 h-6" />
  } else {
    // Elegant monogram / initials tile
    const initials = issuer
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    icon = <span className="text-xs font-serif font-bold text-stone-800">{initials}</span>
  }

  return (
    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#E0D3BF]/70 shadow-xs flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
      {icon}
    </div>
  )
}
