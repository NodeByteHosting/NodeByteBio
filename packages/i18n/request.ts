import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { locales, defaultLocale, LOCALE_COOKIE, type Locale } from './config'
import { fetchTranslations } from '@/packages/core/lib/translations'

export default getRequestConfig(async () => {
  // Read locale from cookie, fallback to default
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(LOCALE_COOKIE)?.value
  const locale = locales.includes(localeCookie as Locale) ? localeCookie as Locale : defaultLocale

  // Fetch translations from local files (synced from Crowdin)
  const messages = await fetchTranslations(locale)

  return {
    locale,
    messages,
  }
})
