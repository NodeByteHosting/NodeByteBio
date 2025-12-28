"use client"

interface LayoutChromeProps {
  children: React.ReactNode
}

/**
 * Simplified layout chrome for links site - no navigation or footer needed
 */
export function LayoutChrome({ children }: LayoutChromeProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {children}
    </main>
  )
}

