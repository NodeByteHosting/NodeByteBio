"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/packages/ui/components/ui/dropdown-menu"
import { Button } from "@/packages/ui/components/ui/button"
import { Sun, Moon, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const themes = {
  base: [
    { value: "light", label: "Light", color: "#ffffff", border: "border-gray-300" },
    { value: "dark", label: "Dark", color: "#0a0a0a", border: "border-gray-600" },
    { value: "system", label: "System", color: "linear-gradient(135deg, #ffffff 50%, #0a0a0a 50%)", border: "border-gray-400" },
  ],
  cool: [
    { value: "slate", label: "Slate", color: "#1e293b", border: "border-slate-500" },
    { value: "midnight", label: "Midnight", color: "#0f172a", border: "border-indigo-600" },
    { value: "ocean", label: "Ocean", color: "#0c4a6e", border: "border-sky-500" },
    { value: "teal", label: "Teal", color: "#134e4a", border: "border-teal-500" },
  ],
  warm: [
    { value: "rose", label: "Rose", color: "#4c0519", border: "border-rose-500" },
    { value: "crimson", label: "Crimson", color: "#450a0a", border: "border-red-600" },
    { value: "desert", label: "Desert", color: "#451a03", border: "border-amber-600" },
    { value: "amber", label: "Amber", color: "#78350f", border: "border-amber-500" },
  ],
  nature: [
    { value: "forest", label: "Forest", color: "#14532d", border: "border-green-700" },
    { value: "emerald", label: "Emerald", color: "#064e3b", border: "border-emerald-500" },
    { value: "lavender", label: "Lavender", color: "#2e1065", border: "border-purple-600" },
    { value: "violet", label: "Violet", color: "#4c1d95", border: "border-violet-600" },
  ],
}

function ThemeColorSwatch({ color, isSelected }: { color: string; isSelected: boolean }) {
  return (
    <span
      className={cn(
        "inline-block w-4 h-4 rounded-full ring-2 ring-offset-1 ring-offset-background transition-all",
        isSelected ? "ring-primary scale-110" : "ring-transparent"
      )}
      style={{ background: color }}
    />
  )
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const t = useTranslations()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0">
        <Palette className="h-4 w-4" />
      </Button>
    )
  }

  const selected = theme ?? "system"
  const display = selected === "system" ? resolvedTheme : selected

  const Icon = display === "light" ? Sun : display === "dark" ? Moon : Palette

  const handleThemeChange = (v: string) => {
    try {
      const known = Object.values(themes).flat().map(t => t.value)
      const html = typeof document !== "undefined" ? document.documentElement : null
      if (html) known.forEach(c => html.classList.remove(c))
      document.cookie = `theme=${encodeURIComponent(v)};path=/;max-age=${60 * 60 * 24 * 365}`
      localStorage.setItem("theme", v)
    } catch (e) {}
    setTheme(v)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-full hover:bg-accent/80 transition-colors"
          aria-label={t("theme.toggle")}
        >
          <Icon className="h-[1.2rem] w-[1.2rem] transition-transform hover:rotate-12" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-48 p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
          {t("theme.appearance")}
        </DropdownMenuLabel>
        
        {/* Base Themes */}
        <div className="grid grid-cols-3 gap-1 p-2">
          {themes.base.map((t) => (
            <button
              key={t.value}
              onClick={() => handleThemeChange(t.value)}
              className={cn(
                "flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all hover:bg-accent/50",
                selected === t.value && "bg-accent"
              )}
            >
              <ThemeColorSwatch color={t.color} isSelected={selected === t.value} />
              <span className="text-[10px] font-medium">{t.label}</span>
            </button>
          ))}
        </div>

        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 pb-1">
          {t("theme.coolTones")}
        </DropdownMenuLabel>
        <div className="grid grid-cols-4 gap-1 px-2 pb-2">
          {themes.cool.map((t) => (
            <button
              key={t.value}
              onClick={() => handleThemeChange(t.value)}
              className={cn(
                "flex flex-col items-center gap-1 p-1.5 rounded-md transition-all hover:bg-accent/50",
                selected === t.value && "bg-accent"
              )}
              title={t.label}
            >
              <ThemeColorSwatch color={t.color} isSelected={selected === t.value} />
            </button>
          ))}
        </div>

        <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 pb-1">
          {t("theme.warmTones")}
        </DropdownMenuLabel>
        <div className="grid grid-cols-4 gap-1 px-2 pb-2">
          {themes.warm.map((t) => (
            <button
              key={t.value}
              onClick={() => handleThemeChange(t.value)}
              className={cn(
                "flex flex-col items-center gap-1 p-1.5 rounded-md transition-all hover:bg-accent/50",
                selected === t.value && "bg-accent"
              )}
              title={t.label}
            >
              <ThemeColorSwatch color={t.color} isSelected={selected === t.value} />
            </button>
          ))}
        </div>

        <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 pb-1">
          {t("theme.nature")}
        </DropdownMenuLabel>
        <div className="grid grid-cols-4 gap-1 px-2 pb-1">
          {themes.nature.map((t) => (
            <button
              key={t.value}
              onClick={() => handleThemeChange(t.value)}
              className={cn(
                "flex flex-col items-center gap-1 p-1.5 rounded-md transition-all hover:bg-accent/50",
                selected === t.value && "bg-accent"
              )}
              title={t.label}
            >
              <ThemeColorSwatch color={t.color} isSelected={selected === t.value} />
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
