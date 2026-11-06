import { sendGAEvent } from "@next/third-parties/google"

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

export const CONSENT_STORAGE_KEY = "portfolio_cookie_consent"

/**
 * Checks whether the user has explicitly consented to analytics.
 */
export function hasUserConsented(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted"
}

/**
 * Generic safe event tracker. Only fires if consent was granted and GA ID is configured.
 */
export function trackEvent(
  action: string,
  params: Record<string, string | number | boolean> = {}
) {
  if (!hasUserConsented() || !GA_MEASUREMENT_ID) {
    return
  }

  try {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      ;(window as any).gtag("event", action, params)
    } else {
      sendGAEvent({ event: action, ...params })
    }
  } catch (err) {
    console.debug("Analytics event failed silently:", err)
  }
}

// 1. Resume download event
export function trackResumeDownload() {
  trackEvent("resume_download", {
    file_name: "Harsha_Jagadish_Resume.pdf",
    source: "portfolio_button",
  })
}

// 2. Contact form submission event
export function trackContactSubmit() {
  trackEvent("contact_submit", {
    method: "contact_form",
  })
}

// 3. Project link click event
export function trackProjectLinkClick(projectName: string, linkType: "github" | "live") {
  trackEvent("project_link_click", {
    project_name: projectName,
    link_type: linkType,
  })
}

// 4. Certificate link click event
export function trackCertificateLinkClick(certificateTitle: string) {
  trackEvent("certificate_link_click", {
    certificate_title: certificateTitle,
  })
}

// 5. Social link click event (GitHub, LinkedIn, Email)
export function trackSocialLinkClick(platform: string) {
  trackEvent("social_link_click", {
    platform,
  })
}

// 6. Theme toggle event (Dark / Light)
export function trackThemeToggle(newTheme: string) {
  trackEvent("theme_toggle", {
    theme: newTheme,
  })
}
