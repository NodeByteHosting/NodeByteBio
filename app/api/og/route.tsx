import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

// Dark theme colors from globals.css
const colors = {
  background: "#1a1d2e",
  backgroundDark: "#12141f",
  card: "#23273a",
  primary: "#4f6dd4",
  accent: "#4a9eba",
  foreground: "#f5f6fa",
  mutedForeground: "#9095a8",
  border: "#2d3348",
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Allow customization via query params for testing
  const title = searchParams.get("title") || "NodeByte Hosting"
  const subtitle = searchParams.get("subtitle") || "Quick Links & Resources"
  const width = parseInt(searchParams.get("width") || "1200")
  const height = parseInt(searchParams.get("height") || "630")

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundDark} 50%, ${colors.background} 100%)`,
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary}26 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, ${colors.accent}1a 0%, transparent 50%)`,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            position: "relative",
          }}
        >
          {/* Logo circle with glow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              boxShadow: `0 0 60px ${colors.primary}80, 0 0 100px ${colors.accent}4d`,
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "64px",
                fontWeight: 800,
                color: colors.foreground,
                letterSpacing: "-2px",
              }}
            >
              NB
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: colors.foreground,
              margin: 0,
              letterSpacing: "-2px",
              textAlign: "center",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              color: colors.mutedForeground,
              margin: "16px 0 0 0",
              textAlign: "center",
            }}
          >
            {subtitle}
          </p>

          {/* Tagline badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: colors.card,
                borderRadius: "9999px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ fontSize: "20px" }}>🎮</span>
              <span style={{ color: colors.foreground, fontSize: "18px", fontWeight: 500 }}>
                Game Hosting
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: colors.card,
                borderRadius: "9999px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ fontSize: "20px" }}>⚡</span>
              <span style={{ color: colors.foreground, fontSize: "18px", fontWeight: 500 }}>
                Fast & Reliable
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: colors.card,
                borderRadius: "9999px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <span style={{ fontSize: "20px" }}>🔒</span>
              <span style={{ color: colors.foreground, fontSize: "18px", fontWeight: 500 }}>
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* Bottom URL bar */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: colors.card,
            borderRadius: "12px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.mutedForeground, fontSize: "18px" }}>
            🔗
          </span>
          <span style={{ color: colors.foreground, fontSize: "18px", fontWeight: 500 }}>
            links.nodebyte.host
          </span>
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  )
}
