"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor, Cloud, Star } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <Button size="sm" className="opacity-0 pointer-events-none">...</Button>

  // Determine selected theme string (what user explicitly chose)
  const selected = theme ?? "system"

  // For display icon use resolvedTheme when user chose 'system'
  const display = selected === "system" ? resolvedTheme : selected

  const Icon = display === "light" ? Sun : display === "dark" ? Moon : display === "slate" ? Cloud : display === "midnight" ? Star : display === "rose" ? Sun : display === "crimson" ? Moon : display === "forest" ? Cloud : display === "emerald" ? Cloud : display === "desert" ? Monitor : display === "amber" ? Sun : display === "ocean" ? Star : display === "teal" ? Star : display === "lavender" ? Star : display === "violet" ? Moon : Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Open theme menu">
          <Icon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selected} onValueChange={(v: string) => {
          try {
            const known = ["light","dark","slate","midnight","rose","crimson","forest","emerald","desert","amber","ocean","teal","lavender","violet"]
            const html = typeof document !== 'undefined' ? document.documentElement : null
            if (html) known.forEach(c => html.classList.remove(c))
            // persist to cookie and localStorage for SSR and later loads
            document.cookie = `theme=${encodeURIComponent(v)};path=/;max-age=${60*60*24*365}`
            localStorage.setItem('theme', v)
          } catch (e) {}
          setTheme(v)
        }}>
          <DropdownMenuRadioItem value="light">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-gray-300" style={{ background: "#ffffff" }} />
              <span>Light</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-gray-600" style={{ background: "#1a1a1a" }} />
              <span>Dark</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="slate">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-slate-500" style={{ background: "#475569" }} />
              <span>Slate</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="midnight">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-indigo-600" style={{ background: "#1e1b4b" }} />
              <span>Midnight</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rose">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-rose-400" style={{ background: "#fb7185" }} />
              <span>Rose</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="crimson">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-red-600" style={{ background: "#dc2626" }} />
              <span>Crimson</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="forest">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-green-700" style={{ background: "#15803d" }} />
              <span>Forest</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="emerald">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-emerald-500" style={{ background: "#10b981" }} />
              <span>Emerald</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desert">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-amber-600" style={{ background: "#d97706" }} />
              <span>Desert</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amber">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-amber-500" style={{ background: "#f59e0b" }} />
              <span>Amber</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ocean">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-blue-500" style={{ background: "#0ea5e9" }} />
              <span>Ocean</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="teal">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-teal-500" style={{ background: "#14b8a6" }} />
              <span>Teal</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="lavender">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-purple-600" style={{ background: "#7c3aed" }} />
              <span>Lavender</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="violet">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-violet-600" style={{ background: "#8b5cf6" }} />
              <span>Violet</span>
            </div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <div className="flex items-center">
              <span className="inline-block w-5 h-3 rounded mr-3 border border-gray-400" style={{ background: "linear-gradient(to right, #ffffff 50%, #1a1a1a 50%)" }} />
              <span>System</span>
            </div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
