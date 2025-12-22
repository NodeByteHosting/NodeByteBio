"use client"

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react"
import {
  type CurrencyCode,
  currencies,
  currencyList,
  convertFromGBP,
  formatPrice,
  convertAndFormat,
  getDefaultCurrency,
  CURRENCY_STORAGE_KEY,
} from "@/lib/currency"

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  convert: (amountGBP: number) => number
  format: (amount: number) => string
  convertAndFormat: (amountGBP: number) => string
  currencies: typeof currencies
  currencyList: typeof currencyList
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("GBP")
  const [mounted, setMounted] = useState(false)

  // Initialize currency from localStorage or browser locale
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY) as CurrencyCode | null
    if (stored && currencies[stored]) {
      setCurrencyState(stored)
    } else {
      setCurrencyState(getDefaultCurrency())
    }
  }, [])

  const setCurrency = useCallback((newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency)
    localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency)
  }, [])

  const convert = useCallback(
    (amountGBP: number) => convertFromGBP(amountGBP, currency),
    [currency]
  )

  const format = useCallback(
    (amount: number) => formatPrice(amount, currency),
    [currency]
  )

  const convertAndFormatFn = useCallback(
    (amountGBP: number) => convertAndFormat(amountGBP, currency),
    [currency]
  )

  // Prevent hydration mismatch by returning GBP during SSR
  const value: CurrencyContextValue = {
    currency: mounted ? currency : "GBP",
    setCurrency,
    convert,
    format: mounted ? format : (amount) => formatPrice(amount, "GBP"),
    convertAndFormat: mounted ? convertAndFormatFn : (amount) => convertAndFormat(amount, "GBP"),
    currencies,
    currencyList,
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
