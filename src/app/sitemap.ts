import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://harsha-jagadish.vercel.app"

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ]
}
