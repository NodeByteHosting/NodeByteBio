import type React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/packages/ui/components/ui/toaster"
import { ThemeProvider } from "@/packages/ui/components/theme-provider"
import { LayoutChrome } from "@/packages/ui/components/layout-chrome"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "NodeByte Hosting | Links",
    template: "%s | NodeByte Hosting",
  },
  description: "Quick links, resources, and FAQs for NodeByte Hosting. Fast, reliable, and secure game server hosting for Minecraft, Rust, and more.",
  metadataBase: new URL("https://links.nodebyte.host"),
  keywords: ["game server hosting", "minecraft hosting", "rust server hosting", "nodebyte links", "game hosting links", "nodebyte hosting"],
  applicationName: "NodeByte Hosting Links",
  openGraph: {
    siteName: "NodeByte Hosting Links",
    description: "Quick links, resources, and FAQs for NodeByte Hosting. Fast, reliable, and secure game server hosting.",
    locale: "en-US",
    url: "https://links.nodebyte.host",
    type: "website",
  },
  twitter: {
    title: "NodeByte Hosting | Links",
    description: "Quick links, resources, and FAQs for NodeByte Hosting. Fast, reliable, and secure game server hosting.",
    creator: "@CodeMeAPixel",
    card: "summary_large_image",
    site: "@NodeByteHosting",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "NodeByte Hosting",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
    }
  },
  other: {
    "mobile-web-app-capable": "yes",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read theme preference from cookie on the server so SSR can render the correct class
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get("theme")?.value
  const knownThemes = ["light", "dark", "midnight", "rose", "forest", "desert", "ocean", "slate", "teal", "amber", "emerald", "lavender", "violet", "stranger", "christmas", "newyear"]
  const themeClass = themeCookie && knownThemes.includes(themeCookie) ? themeCookie : undefined

  const htmlClass = [geist.variable, geistMono.variable, themeClass].filter(Boolean).join(" ")

  return (
    <html 
      lang="en" 
      className={htmlClass} 
      translate="no"
      suppressHydrationWarning 
      suppressContentEditableWarning
    >
      <head>
        {/* Prevent browser translation extensions from modifying the page */}
        <meta name="google" content="notranslate" />
      </head>
      <body className={`font-sans antialiased notranslate`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutChrome>
            {children}
          </LayoutChrome>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
