import { ImageResponse } from "next/og"
import { portfolioData } from "@/data/portfolio"

export const alt = "Harsha Jagadish - Data Science & AI Engineer"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  const { owner } = portfolioData

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0) 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #F26B21, #C2410C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              HJ
            </div>
            <div
              style={{
                color: "#A8988B",
                fontSize: "20px",
                fontFamily: "monospace",
                letterSpacing: "0.05em",
              }}
            >
              IIT Madras • BS Data Science
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(242, 107, 33, 0.15)",
              border: "1px solid rgba(242, 107, 33, 0.4)",
              color: "#F26B21",
              fontSize: "16px",
              fontFamily: "monospace",
            }}
          >
            ● Available for AI Projects
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {owner.name}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#FB923C",
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            {owner.tagline}
          </div>
        </div>

        {/* Bottom Tech Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {["Multi-Agent AI", "Google ADK", "Arbitr-AI", "Voyager", "Python", "LLMs"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(51, 65, 85, 0.8)",
                  color: "#cbd5e1",
                  fontSize: "15px",
                  fontFamily: "monospace",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
