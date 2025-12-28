"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SiDiscord, SiTrustpilot, SiX, SiGithub } from "react-icons/si"
import { Mail } from "lucide-react"

interface SocialLink {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  color?: string
}

const socialLinks: SocialLink[] = [
  {
    href: "https://discord.gg/wN58bTzzpW",
    icon: SiDiscord,
    label: "Discord",
    color: "hover:bg-[#5865F2] hover:border-[#5865F2]",
  },
  {
    href: "https://x.com/NodeByteHosting",
    icon: SiX,
    label: "X (Twitter)",
    color: "hover:bg-foreground hover:text-background hover:border-foreground",
  },
  {
    href: "https://github.com/NodeByteHosting",
    icon: SiGithub,
    label: "GitHub",
    color: "hover:bg-[#333] hover:border-[#333]",
  },
  {
    href: "https://uk.trustpilot.com/review/nodebyte.host",
    icon: SiTrustpilot,
    label: "Trustpilot",
    color: "hover:bg-[#00b67a] hover:border-[#00b67a]",
  },
  {
    href: "mailto:info@nodebyte.co.uk",
    icon: Mail,
    label: "Email",
    color: "hover:bg-primary hover:border-primary",
  },
]

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={cn(
            "group flex items-center justify-center w-12 h-12 rounded-xl",
            "bg-card/50 backdrop-blur-sm border border-border/50",
            "transition-all duration-300 hover:scale-110 hover:shadow-lg hover:text-white",
            social.color
          )}
        >
          <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        </a>
      ))}
    </div>
  )
}
