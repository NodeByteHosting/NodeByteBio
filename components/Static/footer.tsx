"use client"

import React, { useEffect, useState } from "react"
import { SiDiscord, SiTrustpilot } from "react-icons/si"
import { Github, Twitter, Instagram, Send, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function Footer() {
  const pathname = usePathname()

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }
    
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="NodeByte Hosting"
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-xl font-bold">NodeByte Hosting</span>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Built for Humans. Powered by Bytes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="https://discord.gg/wN58bTzzpW" className="text-muted-foreground hover:text-foreground transition-colors">
                  Discord Server
                </Link>
              </li>
              <li>
                <Link href="https://nodebytestat.us/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Service Status
                </Link>
              </li>
              <li>
              <Link href="https://panel.nodebyte.host/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Game Panel
                </Link>
              </li>
              <li>
                <Link href="https://billing.nodebyte.host/store/minecraft-server-hosting" className="text-muted-foreground hover:text-foreground transition-colors">
                  Minecraft Servers
                </Link>
              </li>
              <li>
                <Link href="https://billing.nodebyte.host/store/rust-hosting" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rust Servers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Docs</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <Link href="#" className="hover:text-foreground transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <Link href="https://nodebyte.co.uk/legal/terms" className="hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li className="text-muted-foreground">
                <Link href="https://nodebyte.co.uk/legal/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="text-muted-foreground">
                <Link href="https://nodebyte.co.uk/legal/payment-policy" className="hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li className="text-muted-foreground">
                <Link href="https://nodebyte.co.uk/legal" className="hover:text-foreground transition-colors">
                  Legal Hub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://twitter.com/NodeByteHosting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Twitter size={20} className="text-primary" />
              </a>
              <a
                href="https://github.com/NodeByteHosting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Github size={20} className="text-primary" />
              </a>
              <a
                href="https://discord.gg/wN58bTzzpW"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiDiscord size={20} className="text-primary" />
              </a>
              <a
                href="https://uk.trustpilot.com/review/nodebyte.host"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <SiTrustpilot size={20} className="text-primary" />
              </a>
            </div>
            <a
              href="mailto:info@nodebyte.co.uk"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={16} />
              <span className="text-sm">info@nodebyte.co.uk</span>
            </a>
            <div className="mt-3">
              <TrustpilotWidget />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>
            <Link href="https://nodebyte.co.uk" className="hover:text-foreground transition-colors">© 2025 NodeByte LTD</Link>
            {" "}| All Rights Reserved | {" "} 
            <Link href="https://find-and-update.company-information.service.gov.uk/company/15432941" className="hover:text-foreground transition-colors">
              Registered Number: 15432941
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

function TrustpilotWidget() {
  const [rating, setRating] = useState<number | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/trustpilot')
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()
        if (!mounted) return
        setRating(typeof data.rating === 'number' ? data.rating : null)
        setCount(typeof data.reviewCount === 'number' ? data.reviewCount : null)
      } catch (err) {
        if (!mounted) return
        setError(String(err))
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const displayRating = rating ?? 4.1
  const displayCount = count ?? 5

  return (
    <div>
      <div className="flex items-center gap-2" role="group" aria-label="Trustpilot rating">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = Math.round(displayRating) >= i
          return (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className={filled ? 'text-yellow-400' : 'text-muted-foreground'}
            >
              <path d="M12 .587l3.668 7.431L24 9.753l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.601 0 9.753l8.332-1.735z" />
            </svg>
          )
        })}

        <span className="text-sm font-medium text-foreground">
          {loading ? '—' : displayRating.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">• {loading ? '...' : displayCount + ' reviews'}</span>
      </div>

      <a
        href="https://uk.trustpilot.com/review/nodebyte.host"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline text-sm mt-1 inline-block"
      >
        Read reviews on Trustpilot
      </a>

      {error ? <div className="text-xs text-destructive mt-1">Failed to load reviews</div> : null}
    </div>
  )
}