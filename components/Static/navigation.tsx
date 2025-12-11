"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${id}`
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="NodeByte"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl"
            />
            <span className="text-xl sm:text-2xl font-bold text-foreground">NodeByte Hosting</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="https://billing.nodebyte.host/login" className="text-muted-foreground hover:text-foreground transition-colors">
              Client Area
            </Link>
            <Link href="https://panel.nodebyte.host/" className="text-muted-foreground hover:text-foreground transition-colors">
              Games Panel
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="https://billing.nodebyte.host/store/minecraft-server-hosting" className="text-muted-foreground hover:text-foreground transition-colors">
              Minecraft Servers
            </Link>
            <Link href="https://billing.nodebyte.host/store/rust-hosting" className="text-muted-foreground hover:text-foreground transition-colors">
              Rust Servers
            </Link>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="https://discord.gg/wN58bTzzpW" target="_blank">
                Discord
              </Link>
            </Button>
            <ThemeToggle />
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="https://billing.nodebyte.host/login"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Area
            </Link>
            <Link
              href="https://panel.nodebyte.host/"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
             Games Panel
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="https://billing.nodebyte.host/store/minecraft-server-hosting"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Minecraft Servers
            </Link>
            <Link
              href="https://billing.nodebyte.host/store/rust-hosting"
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rust Servers
            </Link>
            <Button size="lg" className="bg-primary hover:bg-primary/90 w-full" asChild>
              <Link href="https://discord.gg/wN58bTzzpW" target="_blank">
                Discord
              </Link>
            </Button>
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}