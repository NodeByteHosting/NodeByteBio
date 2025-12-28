import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "NodeByte Hosting Links"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// Dark theme colors from globals.css
// --background: oklch(0.155 0.03 235) → #1a1d2e
// --primary: oklch(0.45 0.12 235) → #4f6dd4
// --accent: oklch(0.55 0.12 200) → #4a9eba
// --foreground: oklch(0.97 0.02 230) → #f5f6fa
// --card: oklch(0.185 0.02 235) → #23273a
// --muted-foreground: oklch(0.62 0.02 235) → #9095a8

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

export default async function Image() {
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
            {/* NB Text as logo placeholder */}
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
            NodeByte Hosting
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
            Quick Links & Resources
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

        {/* Twitter handle */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 24px",
            background: colors.card,
            borderRadius: "12px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <span style={{ color: colors.foreground, fontSize: "20px" }}>
            𝕏
          </span>
          <span style={{ color: colors.foreground, fontSize: "18px", fontWeight: 500 }}>
            @NodeByteHosting
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
