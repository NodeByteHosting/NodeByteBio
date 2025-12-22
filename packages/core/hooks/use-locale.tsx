"use client"

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react"
import { locales, localeNames, localeFlags, defaultLocale, LOCALE_COOKIE, type Locale } from "@/packages/i18n/config"

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  locales: typeof locales
  localeNames: typeof localeNames
  localeFlags: typeof localeFlags
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale)

  useEffect(() => {
    // Read from cookie on mount
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${LOCALE_COOKIE}=`))
      ?.split('=')[1] as Locale | undefined

    if (cookieLocale && locales.includes(cookieLocale)) {
      setLocaleState(cookieLocale)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    // Set cookie with 1 year expiry
    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    setLocaleState(newLocale)
    // Hard reload to clear server-side translation cache and load new translations
    window.location.reload()
  }, [])

  const value: LocaleContextValue = {
    locale,
    setLocale,
    locales,
    localeNames,
    localeFlags,
  }

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

// Re-export types and constants for convenience
export { locales, localeNames, localeFlags, defaultLocale, type Locale }
