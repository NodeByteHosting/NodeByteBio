"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/packages/ui/components/ui/tabs"
import { Button } from "@/packages/ui/components/ui/button"
import { Label } from "@/packages/ui/components/ui/label"
import { Switch } from "@/packages/ui/components/ui/switch"
import { Slider } from "@/packages/ui/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Settings,
  Palette,
  Type,
  Layout,
  Sun,
  Moon,
  Check,
  RotateCcw,
} from "lucide-react"

// Theme definitions
const allThemes = {
  featured: [
    { value: "dark", label: "Dark", color: "#0a0a0a" },
    { value: "slate", label: "Slate", color: "#1e293b" },
    { value: "ocean", label: "Ocean", color: "#0c4a6e" },
  ],
  base: [
    { value: "light", label: "Light", color: "#ffffff" },
    { value: "system", label: "System", color: "linear-gradient(135deg, #ffffff 50%, #0a0a0a 50%)" },
  ],
  cool: [
    { value: "midnight", label: "Midnight", color: "#0f172a" },
    { value: "teal", label: "Teal", color: "#134e4a" },
  ],
  warm: [
    { value: "rose", label: "Rose", color: "#4c0519" },
    { value: "amber", label: "Amber", color: "#78350f" },
    { value: "desert", label: "Desert", color: "#451a03" },
  ],
  nature: [
    { value: "forest", label: "Forest", color: "#14532d" },
    { value: "emerald", label: "Emerald", color: "#064e3b" },
    { value: "lavender", label: "Lavender", color: "#2e1065" },
    { value: "violet", label: "Violet", color: "#4c1d95" },
  ],
  special: [
    { value: "stranger", label: "Stranger", color: "#ff2d55" },
    { value: "christmas", label: "Christmas", color: "#c4122e" },
    { value: "newyear", label: "NewYear", color: "#ffd166" },
  ],
}

interface SiteConfig {
  linkStyle: "default" | "rounded" | "pill" | "minimal" | "glassmorphism"
  linkSize: "compact" | "default" | "large"
  showDescriptions: boolean
  showIcons: boolean
  animationsEnabled: boolean
  fontFamily: "default" | "mono" | "serif"
  fontSize: number
  reducedMotion: boolean
}

const defaultConfig: SiteConfig = {
  linkStyle: "default",
  linkSize: "default",
  showDescriptions: true,
  showIcons: true,
  animationsEnabled: true,
  fontFamily: "default",
  fontSize: 100,
  reducedMotion: false,
}

// Config context
const ConfigContext = React.createContext<{
  config: SiteConfig
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>
} | null>(null)

export function useConfig() {
  const context = React.useContext(ConfigContext)
  if (!context) {
    return { config: defaultConfig, setConfig: () => {} }
  }
  return context
}

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("site-config")
    if (saved) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(saved) })
      } catch {
        // Ignore invalid JSON
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("site-config", JSON.stringify(config))
      
      // Apply font size to root
      document.documentElement.style.setProperty("--site-font-scale", `${config.fontSize}%`)
      
      // Apply reduced motion
      if (config.reducedMotion) {
        document.documentElement.classList.add("reduce-motion")
      } else {
        document.documentElement.classList.remove("reduce-motion")
      }
    }
  }, [config, mounted])

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

function ThemeColorSwatch({ color, isSelected }: { color: string; isSelected: boolean }) {
  return (
    <span
      className={cn(
        "inline-block w-6 h-6 rounded-lg ring-2 ring-offset-2 ring-offset-background transition-all",
        isSelected ? "ring-primary scale-110 shadow-lg" : "ring-transparent hover:ring-primary/50"
      )}
      style={{ background: color }}
    />
  )
}

function ThemeSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const renderThemeGroup = (themes: { value: string; label: string; color: string }[], title: string) => (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            title={t.label}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all",
              theme === t.value
                ? "bg-primary/10 ring-2 ring-primary"
                : "hover:bg-accent/20"
            )}
          >
            <ThemeColorSwatch color={t.color} isSelected={theme === t.value} />
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {renderThemeGroup([...allThemes.featured, ...allThemes.base], "Popular")}
      {renderThemeGroup([...allThemes.cool, ...allThemes.warm], "Colors")}
      {renderThemeGroup(allThemes.nature, "Nature")}
      {renderThemeGroup(allThemes.special, "Special")}
    </div>
  )
}

function LayoutSection() {
  const { config, setConfig } = useConfig()

  return (
    <div className="space-y-6">
      {/* Link Style */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Link Style</Label>
        <Select
          value={config.linkStyle}
          onValueChange={(value) => setConfig((c) => ({ ...c, linkStyle: value as SiteConfig["linkStyle"] }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="pill">Pill</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="glassmorphism">Glassmorphism</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Link Size */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Link Size</Label>
        <Select
          value={config.linkSize}
          onValueChange={(value) => setConfig((c) => ({ ...c, linkSize: value as SiteConfig["linkSize"] }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-descriptions" className="text-sm font-medium cursor-pointer">
            Show Descriptions
          </Label>
          <Switch
            id="show-descriptions"
            checked={config.showDescriptions}
            onCheckedChange={(checked) => setConfig((c) => ({ ...c, showDescriptions: checked }))}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-icons" className="text-sm font-medium cursor-pointer">
            Show Icons
          </Label>
          <Switch
            id="show-icons"
            checked={config.showIcons}
            onCheckedChange={(checked) => setConfig((c) => ({ ...c, showIcons: checked }))}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="animations" className="text-sm font-medium cursor-pointer">
            Enable Animations
          </Label>
          <Switch
            id="animations"
            checked={config.animationsEnabled}
            onCheckedChange={(checked) => setConfig((c) => ({ ...c, animationsEnabled: checked }))}
          />
        </div>
      </div>
    </div>
  )
}

function TypographySection() {
  const { config, setConfig } = useConfig()

  return (
    <div className="space-y-6">
      {/* Font Family */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Font Family</Label>
        <Select
          value={config.fontFamily}
          onValueChange={(value) => setConfig((c) => ({ ...c, fontFamily: value as SiteConfig["fontFamily"] }))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">System Default</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Font Size</Label>
          <span className="text-sm text-muted-foreground">{config.fontSize}%</span>
        </div>
        <Slider
          value={[config.fontSize]}
          onValueChange={([value]) => setConfig((c) => ({ ...c, fontSize: value }))}
          min={80}
          max={120}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Smaller</span>
          <span>Larger</span>
        </div>
      </div>

      {/* Accessibility */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium mb-4">Accessibility</h4>
        <div className="flex items-center justify-between">
          <Label htmlFor="reduced-motion" className="text-sm font-medium cursor-pointer">
            Reduce Motion
          </Label>
          <Switch
            id="reduced-motion"
            checked={config.reducedMotion}
            onCheckedChange={(checked) => setConfig((c) => ({ ...c, reducedMotion: checked }))}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Minimize animations for better accessibility
        </p>
      </div>
    </div>
  )
}

export function SettingsModal() {
  const { config, setConfig } = useConfig()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleReset = () => {
    setConfig(defaultConfig)
    localStorage.removeItem("site-config")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0">
        <Settings className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-accent/80 transition-all hover:scale-105"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="theme" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme" className="gap-1.5">
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="gap-1.5">
              <Layout className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="gap-1.5">
              <Type className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Type</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto py-4 pr-1">
            <TabsContent value="theme" className="mt-0">
              <ThemeSection />
            </TabsContent>

            <TabsContent value="layout" className="mt-0">
              <LayoutSection />
            </TabsContent>

            <TabsContent value="typography" className="mt-0">
              <TypographySection />
            </TabsContent>
          </div>
        </Tabs>

        <div className="pt-4 border-t flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </Button>
          <p className="text-xs text-muted-foreground">
            Changes are saved automatically
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
