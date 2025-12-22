// Currency conversion utilities
// Base currency is GBP (£)

export type CurrencyCode = "GBP" | "USD" | "EUR" | "CAD" | "AUD"

export interface Currency {
  code: CurrencyCode
  symbol: string
  name: string
  rate: number // Rate relative to GBP (GBP = 1)
}

// Exchange rates relative to GBP (approximate, update as needed)
export const currencies: Record<CurrencyCode, Currency> = {
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 1 },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1.27 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 1.20 },
  CAD: { code: "CAD", symbol: "$", name: "Canadian Dollar", rate: 1.78 },
  AUD: { code: "AUD", symbol: "$", name: "Australian Dollar", rate: 1.97 },
}

export const currencyList = Object.values(currencies)

/**
 * Convert a GBP amount to another currency
 */
export function convertFromGBP(amountGBP: number, toCurrency: CurrencyCode): number {
  const rate = currencies[toCurrency].rate
  return Math.round(amountGBP * rate * 100) / 100
}

/**
 * Format a price with the correct currency symbol
 */
export function formatPrice(amount: number, currencyCode: CurrencyCode): string {
  const currency = currencies[currencyCode]
  
  // Format with 2 decimal places, but show whole numbers without decimals
  const formatted = amount % 1 === 0 
    ? amount.toFixed(0) 
    : amount.toFixed(2)
  
  return `${currency.symbol}${formatted}`
}

/**
 * Convert and format a GBP price to another currency
 */
export function convertAndFormat(amountGBP: number, toCurrency: CurrencyCode): string {
  const converted = convertFromGBP(amountGBP, toCurrency)
  return formatPrice(converted, toCurrency)
}

/**
 * Parse a price string (e.g., "£4.00") to extract the numeric value
 */
export function parsePrice(priceString: string): number {
  const numericValue = priceString.replace(/[^0-9.]/g, "")
  return parseFloat(numericValue) || 0
}

/**
 * Get browser/system locale currency (best guess)
 */
export function getDefaultCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "GBP"
  
  const locale = navigator.language || "en-GB"
  
  // Map common locales to currencies
  if (locale.includes("US")) return "USD"
  if (locale.includes("CA")) return "CAD"
  if (locale.includes("AU")) return "AUD"
  if (locale.includes("DE") || locale.includes("FR") || locale.includes("ES") || locale.includes("IT")) return "EUR"
  
  return "GBP"
}

// Storage key for persisting currency preference
export const CURRENCY_STORAGE_KEY = "nodebyte-currency"
