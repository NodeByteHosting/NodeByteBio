"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Logo } from "@/packages/ui/components/logo"
import { Badge } from "@/packages/ui/components/ui/badge"
import { CheckCircle2, AlertTriangle, Wrench } from "lucide-react"

interface StatusData {
  page: {
    name: string
    url: string
    status: "UP" | "HASISSUES" | "UNDERMAINTENANCE"
  }
  activeIncidents: Array<{
    id: string
    name: string
    status: string
    impact: string
  }>
  activeMaintenances: Array<{
    id: string
    name: string
    status: string
  }>
}

interface ProfileHeaderProps {
  className?: string
}

function StatusIndicator({ status }: { status: StatusData | null }) {
  const pageStatus = status?.page?.status
  const hasIncidents = (status?.activeIncidents?.length ?? 0) > 0
  const hasMaintenance = (status?.activeMaintenances?.length ?? 0) > 0

  // Loading state
  if (!status || !status.page) {
    return (
      <a
        href="https://nodebytestat.us"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-muted flex items-center justify-center border-4 border-background animate-pulse cursor-pointer"
        title="Checking status..."
      >
        <span className="w-3 h-3 rounded-full bg-muted-foreground/50" />
      </a>
    )
  }

  // Maintenance
  if (pageStatus === "UNDERMAINTENANCE" || hasMaintenance) {
    const maintenanceName = status.activeMaintenances?.[0]?.name || "Scheduled Maintenance"
    return (
      <a
        href="https://nodebytestat.us"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-4 border-background cursor-pointer transition-transform hover:scale-110"
        title={maintenanceName}
      >
        <Wrench className="w-4 h-4 text-white" />
      </a>
    )
  }

  // Issues/Incidents
  if (pageStatus === "HASISSUES" || hasIncidents) {
    const incidentName = status.activeIncidents?.[0]?.name || "Service Issues"
    const impact = status.activeIncidents?.[0]?.impact
    const isMinor = impact === "MINOROUTAGE" || impact === "DEGRADEDPERFORMANCE"
    
    return (
      <a
        href="https://nodebytestat.us"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-background cursor-pointer transition-transform hover:scale-110",
          isMinor ? "bg-yellow-500" : "bg-red-500"
        )}
        title={incidentName}
      >
        <AlertTriangle className="w-4 h-4 text-white" />
      </a>
    )
  }

  // All systems operational (default)
  return (
    <a
      href="https://nodebytestat.us"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center border-4 border-background cursor-pointer transition-transform hover:scale-110"
      title="All Systems Operational"
    >
      <CheckCircle2 className="w-4 h-4 text-white" />
    </a>
  )
}

export function ProfileHeader({ className }: ProfileHeaderProps) {
  const [status, setStatus] = useState<StatusData | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await fetch("/api/status")
        if (response.ok) {
          const data = await response.json()
          setStatus(data)
        }
      } catch (error) {
        console.error("Failed to fetch status:", error)
        // Set a default "UP" status on error
        setStatus({
          page: { name: "NodeByte", url: "https://nodebytestat.us", status: "UP" },
          activeIncidents: [],
          activeMaintenances: [],
        })
      }
    }

    fetchStatus()
    
    // Refresh status every 60 seconds
    const interval = setInterval(fetchStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {/* Avatar/Logo */}
      <div className="relative mb-6">
        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin-slow opacity-75 blur-md" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
        
        {/* Logo container */}
        <div className="relative w-28 h-28 rounded-full bg-background flex items-center justify-center border-4 border-background shadow-2xl">
          <Logo size={64} className="drop-shadow-lg" />
        </div>
        
        {/* Status indicator badge */}
        <StatusIndicator status={status} />
      </div>

      {/* Name & Handle */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          NodeByte Hosting
        </h1>
        <p className="text-muted-foreground font-medium">
          @NodeByteHosting
        </p>
      </div>

      {/* Tagline */}
      <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed">
        Fast, reliable, and secure game server hosting. 
        Powering your gaming experience with premium infrastructure.
      </p>

      {/* Feature badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
        <Badge variant="default" className="px-3 py-1">
          🎮 Reliable Game Hosting
        </Badge>
        <Badge variant="default" className="px-3 py-1">
          ☁️ Hosted in the Clouds
        </Badge>
      </div>
    </div>
  )
}
