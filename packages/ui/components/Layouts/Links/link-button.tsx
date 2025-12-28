"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ExternalLink, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useConfig } from "./settings-modal"

interface LinkButtonProps {
  href: string
  title: string
  description?: string
  icon?: LucideIcon
  external?: boolean
  featured?: boolean
  className?: string
}

export function LinkButton({
  href,
  title,
  description,
  icon: Icon,
  external = false,
  featured = false,
  className,
}: LinkButtonProps) {
  const { config } = useConfig()
  const Comp = external ? "a" : Link
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  // Style variants based on config
  const styleClasses = {
    default: "rounded-2xl",
    rounded: "rounded-3xl",
    pill: "rounded-full",
    minimal: "rounded-lg border-transparent hover:border-border/50",
    glassmorphism: "rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20",
  }

  const sizeClasses = {
    compact: "p-3 gap-3",
    default: "p-4 gap-4",
    large: "p-5 gap-5",
  }

  const iconSizeClasses = {
    compact: "w-10 h-10",
    default: "w-12 h-12",
    large: "w-14 h-14",
  }

  const showDescription = config.showDescriptions && description
  const showIcon = config.showIcons && Icon

  return (
    <Comp
      href={href}
      className={cn(
        "group relative flex items-center w-full border transition-all",
        config.animationsEnabled && "duration-300 hover:scale-[1.02] active:scale-[0.98]",
        !config.animationsEnabled && "hover:opacity-90",
        styleClasses[config.linkStyle],
        sizeClasses[config.linkSize],
        featured
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:shadow-primary/25"
          : config.linkStyle === "glassmorphism" 
            ? "bg-white/10 dark:bg-white/5 backdrop-blur-md border-white/20 hover:bg-white/20 dark:hover:bg-white/10"
            : "bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/30",
        config.animationsEnabled && "hover:shadow-lg",
        className
      )}
      {...externalProps}
    >
      {/* Icon */}
      {showIcon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-xl transition-all",
            config.animationsEnabled && "duration-300",
            iconSizeClasses[config.linkSize],
            featured
              ? "bg-primary-foreground/20"
              : "bg-primary/10 group-hover:bg-primary/20"
          )}
        >
          <Icon
            className={cn(
              "w-5 h-5",
              config.animationsEnabled && "transition-transform duration-300 group-hover:scale-110",
              featured ? "text-primary-foreground" : "text-primary"
            )}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-semibold truncate",
            featured ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {title}
        </p>
        {showDescription && (
          <p
            className={cn(
              "text-sm truncate mt-0.5",
              featured ? "text-primary-foreground/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Arrow/External Icon */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
          config.animationsEnabled && "duration-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-1",
          !config.animationsEnabled && "opacity-80"
        )}
      >
        {external ? (
          <ExternalLink className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </div>

      {/* Hover glow effect */}
      {config.animationsEnabled && (
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
            styleClasses[config.linkStyle],
            featured
              ? "bg-gradient-to-r from-primary/10 to-transparent"
              : "bg-gradient-to-r from-primary/5 to-transparent"
          )}
        />
      )}
    </Comp>
  )
}
