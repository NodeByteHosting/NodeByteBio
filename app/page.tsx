"use client"

import {
  ProfileHeader,
  LinkButton,
  SocialLinks,
  LinksFAQ,
  SettingsModal,
  ConfigProvider,
} from "@/packages/ui/components/Layouts/Links"
import {
  Server,
  Gamepad2,
  Blocks,
  ShoppingCart,
  LayoutDashboard,
  Headphones,
  FileText,
  Sparkles,
} from "lucide-react"

// Quick links data
const quickLinks = [
  {
    href: "https://nodebyte.host",
    title: "Main Website",
    description: "Explore our full range of hosting services",
    icon: Server,
    featured: true,
    external: true,
  },
  {
    href: "https://billing.nodebyte.host/store/minecraft-server-hosting",
    title: "Minecraft Hosting",
    description: "Premium Minecraft server hosting",
    icon: Blocks,
    external: true,
  },
  {
    href: "https://billing.nodebyte.host/store/rust-hosting",
    title: "Rust Hosting",
    description: "High-performance Rust servers",
    icon: Gamepad2,
    external: true,
  },
  {
    href: "https://billing.nodebyte.host/login",
    title: "Client Area",
    description: "Manage your services & billing",
    icon: ShoppingCart,
    external: true,
  },
  {
    href: "https://panel.nodebyte.host",
    title: "Game Panel",
    description: "Control your game servers",
    icon: LayoutDashboard,
    external: true,
  },
]

const resourceLinks = [
  {
    href: "https://nodebyte.host/kb",
    title: "Knowledge Base",
    description: "Guides, tutorials & documentation",
    icon: FileText,
    external: true,
  },
  {
    href: "https://nodebyte.host/contact",
    title: "Contact Support",
    description: "Get help from our team",
    icon: Headphones,
    external: true,
  },
  {
    href: "https://nodebyte.host/changelog",
    title: "Changelog",
    description: "See what's new at NodeByte",
    icon: Sparkles,
    external: true,
  },
]

export default function Home() {
  return (
    <ConfigProvider>
      <div className="relative min-h-screen">
        {/* Background effects */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='currentColor'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />
        </div>

        {/* Settings button - fixed position */}
        <div className="fixed top-4 right-4 z-50">
          <SettingsModal />
        </div>

      {/* Main content */}
      <div className="relative container max-w-lg mx-auto px-4 py-12 sm:py-16">
        {/* Profile Header */}
        <ProfileHeader className="mb-10" />

        {/* Social Links */}
        <SocialLinks className="mb-10" />

        {/* Quick Links Section */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">
            Quick Links
          </h2>
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <LinkButton key={link.href} {...link} />
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center mb-4">
            Resources
          </h2>
          <div className="space-y-3">
            {resourceLinks.map((link) => (
              <LinkButton key={link.href} {...link} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <LinksFAQ className="mb-10" />

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NodeByte Hosting. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Fast, reliable, and secure game server hosting.
          </p>
        </footer>
        </div>
      </div>
    </ConfigProvider>
  )
}