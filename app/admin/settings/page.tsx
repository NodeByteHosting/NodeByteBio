"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import {
  Settings,
  Save,
  RefreshCw,
  Server,
  Link,
  Shield,
  Bell,
  Database,
  Globe,
  Key,
  Mail,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Construction,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/packages/ui/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/packages/ui/components/ui/card"
import { Button } from "@/packages/ui/components/ui/button"
import { Badge } from "@/packages/ui/components/ui/badge"
import { Input } from "@/packages/ui/components/ui/input"
import { Label } from "@/packages/ui/components/ui/label"
import { Switch } from "@/packages/ui/components/ui/switch"
import { Separator } from "@/packages/ui/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/packages/ui/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui/components/ui/select"
import { useToast } from "@/packages/ui/components/ui/use-toast"
import { cn } from "@/packages/core/lib/utils"

interface ConnectionStatus {
  connected: boolean
  latency?: number
  version?: string
  error?: string
}

interface SystemSettings {
  pterodactyl: {
    url: string
    connected: boolean
    version?: string
  }
  database: {
    connected: boolean
    provider: string
  }
  features: {
    registration: boolean
    maintenance: boolean
    syncEnabled: boolean
  }
}

export default function SettingsPage() {
  const t = useTranslations("admin")
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testingConnection, setTestingConnection] = useState<string | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  
  // Connection statuses
  const [pterodactylStatus, setPterodactylStatus] = useState<ConnectionStatus>({ connected: false })
  const [databaseStatus, setDatabaseStatus] = useState<ConnectionStatus>({ connected: false })
  
  // Settings state
  const [settings, setSettings] = useState<SystemSettings>({
    pterodactyl: {
      url: "",
      connected: false,
    },
    database: {
      connected: false,
      provider: "postgresql",
    },
    features: {
      registration: true,
      maintenance: false,
      syncEnabled: true,
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      // Fetch connection status
      const response = await fetch("/api/admin/settings")
      const data = await response.json()
      
      if (data.success) {
        setSettings(data.settings)
        setPterodactylStatus({
          connected: data.settings.pterodactyl.connected,
          version: data.settings.pterodactyl.version,
        })
        setDatabaseStatus({
          connected: data.settings.database.connected,
        })
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async (type: "pterodactyl" | "database") => {
    setTestingConnection(type)
    try {
      const response = await fetch(`/api/admin/settings/test?type=${type}`)
      const data = await response.json()
      
      if (type === "pterodactyl") {
        setPterodactylStatus({
          connected: data.success,
          latency: data.latency,
          version: data.version,
          error: data.error,
        })
      } else {
        setDatabaseStatus({
          connected: data.success,
          latency: data.latency,
          error: data.error,
        })
      }

      toast({
        title: data.success ? t("settings.connection.success") : t("settings.connection.failed"),
        description: data.success 
          ? t("settings.connection.successDesc", { type }) 
          : data.error,
        variant: data.success ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: t("settings.connection.failed"),
        description: t("settings.connection.error"),
        variant: "destructive",
      })
    } finally {
      setTestingConnection(null)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      const data = await response.json()

      if (data.success) {
        toast({
          title: t("settings.saved"),
          description: t("settings.savedDesc"),
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: t("error.title"),
        description: t("settings.saveError"),
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      toast({
        title: t("settings.copyFailed"),
        variant: "destructive",
      })
    }
  }

  const ConnectionBadge = ({ status }: { status: ConnectionStatus }) => (
    <Badge
      variant={status.connected ? "default" : "destructive"}
      className={cn(
        "gap-1",
        status.connected && "bg-green-500/10 text-green-500 border-green-500/20"
      )}
    >
      {status.connected ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}
      {status.connected ? t("settings.status.connected") : t("settings.status.disconnected")}
      {status.latency && (
        <span className="ml-1 text-xs opacity-70">({status.latency}ms)</span>
      )}
    </Badge>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-6 w-6 sm:h-8 sm:w-8" />
            {t("settings.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("settings.description")}
          </p>
        </div>
      </div>

      {/* Work in Progress Alert */}
      <Alert variant="default" className="border-amber-500/50 bg-amber-500/10">
        <Construction className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">{t("settings.wip.title")}</AlertTitle>
        <AlertDescription className="text-amber-500/80">
          {t("settings.wip.description")}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="connections" className="gap-2">
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.tabs.connections")}</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.tabs.features")}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.tabs.notifications")}</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">{t("settings.tabs.advanced")}</span>
          </TabsTrigger>
        </TabsList>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6">
          {/* Pterodactyl Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  <CardTitle>{t("settings.pterodactyl.title")}</CardTitle>
                </div>
                <ConnectionBadge status={pterodactylStatus} />
              </div>
              <CardDescription>{t("settings.pterodactyl.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="panel-url">{t("settings.pterodactyl.url")}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="panel-url"
                      placeholder="https://panel.example.com"
                      value={settings.pterodactyl.url}
                      onChange={(e) => setSettings({
                        ...settings,
                        pterodactyl: { ...settings.pterodactyl, url: e.target.value }
                      })}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(settings.pterodactyl.url, "_blank")}
                      disabled={!settings.pterodactyl.url}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panel-key">{t("settings.pterodactyl.apiKey")}</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="panel-key"
                        type={showApiKey ? "text" : "password"}
                        placeholder="ptla_xxxxxxxxxx"
                        className="pr-20"
                        disabled
                        value="••••••••••••••••••••"
                      />
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.pterodactyl.apiKeyNote")}
                  </p>
                </div>
              </div>
              {pterodactylStatus.version && (
                <div className="text-sm text-muted-foreground">
                  {t("settings.pterodactyl.version")}: <span className="font-medium">{pterodactylStatus.version}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => testConnection("pterodactyl")}
                disabled={testingConnection === "pterodactyl"}
              >
                {testingConnection === "pterodactyl" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {t("settings.testConnection")}
              </Button>
            </CardFooter>
          </Card>

          {/* Database */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <CardTitle>{t("settings.database.title")}</CardTitle>
                </div>
                <ConnectionBadge status={databaseStatus} />
              </div>
              <CardDescription>{t("settings.database.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t("settings.database.provider")}</Label>
                  <Select value={settings.database.provider} disabled>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("settings.database.connectionString")}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="DATABASE_URL"
                      disabled
                      value="••••••••••••••••••••"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(process.env.DATABASE_URL || "", "db")}
                    >
                      {copied === "db" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.database.connectionStringNote")}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => testConnection("database")}
                disabled={testingConnection === "database"}
              >
                {testingConnection === "database" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {t("settings.testConnection")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.features.title")}</CardTitle>
              <CardDescription>{t("settings.features.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.features.registration")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.features.registrationDesc")}
                  </p>
                </div>
                <Switch
                  checked={settings.features.registration}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    features: { ...settings.features, registration: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.features.maintenance")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.features.maintenanceDesc")}
                  </p>
                </div>
                <Switch
                  checked={settings.features.maintenance}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    features: { ...settings.features, maintenance: checked }
                  })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.features.autoSync")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.features.autoSyncDesc")}
                  </p>
                </div>
                <Switch
                  checked={settings.features.syncEnabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    features: { ...settings.features, syncEnabled: checked }
                  })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notifications.title")}</CardTitle>
              <CardDescription>{t("settings.notifications.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.notifications.email")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.emailDesc")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.notifications.discord")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.notifications.discordDesc")}
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="webhook">{t("settings.notifications.webhook")}</Label>
                <Input
                  id="webhook"
                  placeholder="https://discord.com/api/webhooks/..."
                />
                <p className="text-xs text-muted-foreground">
                  {t("settings.notifications.webhookDesc")}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.advanced.title")}</CardTitle>
              <CardDescription>{t("settings.advanced.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t("settings.advanced.cacheTimeout")}</Label>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 {t("settings.advanced.seconds")}</SelectItem>
                    <SelectItem value="60">1 {t("settings.advanced.minute")}</SelectItem>
                    <SelectItem value="300">5 {t("settings.advanced.minutes")}</SelectItem>
                    <SelectItem value="600">10 {t("settings.advanced.minutes")}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {t("settings.advanced.cacheTimeoutDesc")}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>{t("settings.advanced.syncInterval")}</Label>
                <Select defaultValue="3600">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1800">30 {t("settings.advanced.minutes")}</SelectItem>
                    <SelectItem value="3600">1 {t("settings.advanced.hour")}</SelectItem>
                    <SelectItem value="7200">2 {t("settings.advanced.hours")}</SelectItem>
                    <SelectItem value="86400">24 {t("settings.advanced.hours")}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {t("settings.advanced.syncIntervalDesc")}
                </p>
              </div>
              <Separator />
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <h4 className="font-medium text-destructive mb-2">
                  {t("settings.advanced.dangerZone")}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("settings.advanced.dangerZoneDesc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive" size="sm">
                    {t("settings.advanced.clearCache")}
                  </Button>
                  <Button variant="destructive" size="sm">
                    {t("settings.advanced.resetSync")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
