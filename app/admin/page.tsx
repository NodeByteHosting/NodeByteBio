"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Users,
  Server,
  HardDrive,
  Database,
  Layers,
  Egg,
  Variable,
  MapPin,
  Network,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/packages/ui/components/ui/card"
import { Button } from "@/packages/ui/components/ui/button"
import { Badge } from "@/packages/ui/components/ui/badge"
import { Skeleton } from "@/packages/ui/components/ui/skeleton"
import { Progress } from "@/packages/ui/components/ui/progress"
import { useToast } from "@/packages/ui/components/ui/use-toast"

interface SyncStats {
  success: boolean
  status: {
    lastSync: string | null
    isSyncing: boolean
  } | null
  counts: {
    users: number
    migratedUsers: number
    servers: number
    nodes: number
    locations: number
    allocations: number
    nests: number
    eggs: number
    eggVariables: number
    serverDatabases: number
  }
  availableTargets: string[]
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  description?: string
  loading?: boolean
}

function StatCard({ title, value, icon: Icon, description, loading }: StatCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4 pb-1 sm:pb-2">
          <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
          <Skeleton className="h-3 sm:h-4 w-3 sm:w-4 rounded" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 mb-1" />
          {description && <Skeleton className="h-3 w-20 sm:w-32" />}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4 pb-1 sm:pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">{title}</CardTitle>
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="text-xl sm:text-2xl font-bold">{value.toLocaleString()}</div>
        {description && (
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const t = useTranslations("admin")
  const { toast } = useToast()
  const [stats, setStats] = useState<SyncStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)
  const [currentSyncTarget, setCurrentSyncTarget] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setError(null)
      const response = await fetch("/api/admin/sync")
      const data = await response.json()
      
      if (!data.success) {
        setError(data.error || "Failed to fetch stats")
        return
      }
      
      setStats(data)
    } catch (err) {
      setError("Failed to connect to server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const runSync = async (target: string = "all") => {
    setSyncing(true)
    setSyncProgress(0)
    setCurrentSyncTarget(target)

    // Simulate progress stages for better UX
    const progressInterval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 500)

    try {
      const response = await fetch("/api/admin/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      })

      const data = await response.json()
      clearInterval(progressInterval)
      setSyncProgress(100)

      if (!data.success) {
        toast({
          title: t("sync.error"),
          description: data.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: t("sync.success"),
        description: t("sync.completed", { target }),
      })

      // Refresh stats after sync
      await fetchStats()
    } catch (err) {
      clearInterval(progressInterval)
      toast({
        title: t("sync.error"),
        description: "Failed to connect to server",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setSyncing(false)
        setSyncProgress(0)
        setCurrentSyncTarget(null)
      }, 1000)
    }
  }

  const formatLastSync = (dateString: string | null) => {
    if (!dateString) return t("sync.never")
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.description")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchStats()}
            variant="outline"
            size="sm"
            disabled={loading || syncing}
          >
            <RefreshCw className={`h-4 w-4 sm:mr-2 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">{t("actions.refresh")}</span>
          </Button>
          <Button
            onClick={() => runSync("all")}
            size="sm"
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className="h-4 w-4 sm:mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 sm:mr-2" />
            )}
            <span className="hidden sm:inline">{syncing ? t("sync.syncing") : t("sync.runFull")}</span>
            <span className="sm:hidden">{syncing ? t("sync.syncing") : "Sync"}</span>
          </Button>
        </div>
      </div>

      {/* Sync Progress */}
      {syncing && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("sync.inProgress")}
            </CardTitle>
            <CardDescription>
              {t("sync.syncingTarget", { target: currentSyncTarget })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={syncProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(syncProgress)}% {t("sync.complete")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              {t("error.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Sync Status */}
      {stats && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {stats.status?.isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              {t("sync.status")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant={stats.status?.isSyncing ? "secondary" : "default"}>
                {stats.status?.isSyncing ? t("sync.syncing") : t("sync.idle")}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {t("sync.lastSync")}: {formatLastSync(stats.status?.lastSync || null)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("stats.users")}
          value={stats?.counts.users || 0}
          icon={Users}
          description={t("stats.migratedCount", { count: stats?.counts.migratedUsers || 0 })}
          loading={loading}
        />
        <StatCard
          title={t("stats.servers")}
          value={stats?.counts.servers || 0}
          icon={Server}
          loading={loading}
        />
        <StatCard
          title={t("stats.nodes")}
          value={stats?.counts.nodes || 0}
          icon={HardDrive}
          loading={loading}
        />
        <StatCard
          title={t("stats.locations")}
          value={stats?.counts.locations || 0}
          icon={MapPin}
          loading={loading}
        />
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard
          title={t("stats.allocations")}
          value={stats?.counts.allocations || 0}
          icon={Network}
          loading={loading}
        />
        <StatCard
          title={t("stats.nests")}
          value={stats?.counts.nests || 0}
          icon={Layers}
          loading={loading}
        />
        <StatCard
          title={t("stats.eggs")}
          value={stats?.counts.eggs || 0}
          icon={Egg}
          loading={loading}
        />
        <StatCard
          title={t("stats.eggVariables")}
          value={stats?.counts.eggVariables || 0}
          icon={Variable}
          loading={loading}
        />
        <StatCard
          title={t("stats.databases")}
          value={stats?.counts.serverDatabases || 0}
          icon={Database}
          loading={loading}
        />
      </div>

      {/* Quick Sync Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t("sync.quickActions")}</CardTitle>
          <CardDescription>{t("sync.quickActionsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {stats?.availableTargets
              .filter((target) => target !== "all")
              .map((target) => (
                <Button
                  key={target}
                  variant="outline"
                  size="sm"
                  onClick={() => runSync(target)}
                  disabled={syncing}
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${syncing && currentSyncTarget === target ? "animate-spin" : ""}`} />
                  {t(`sync.targets.${target}`)}
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
