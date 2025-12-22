// Translation loading utilities
// Loads translations from local files (synced from Crowdin)

// Import all translation files statically for proper bundling
import enTemplate from '../../../translations/templates/en.json'
import afZA from '../../../translations/messages/af-ZA.json'
import arSA from '../../../translations/messages/ar-SA.json'
import caES from '../../../translations/messages/ca-ES.json'
import csCZ from '../../../translations/messages/cs-CZ.json'
import daDK from '../../../translations/messages/da-DK.json'
import deDE from '../../../translations/messages/de-DE.json'
import elGR from '../../../translations/messages/el-GR.json'
import esES from '../../../translations/messages/es-ES.json'
import fiFI from '../../../translations/messages/fi-FI.json'
import frFR from '../../../translations/messages/fr-FR.json'
import heIL from '../../../translations/messages/he-IL.json'
import huHU from '../../../translations/messages/hu-HU.json'
import itIT from '../../../translations/messages/it-IT.json'
import jaJP from '../../../translations/messages/ja-JP.json'
import koKR from '../../../translations/messages/ko-KR.json'
import nlNL from '../../../translations/messages/nl-NL.json'
import noNO from '../../../translations/messages/no-NO.json'
import plPL from '../../../translations/messages/pl-PL.json'
import ptBR from '../../../translations/messages/pt-BR.json'
import ptPT from '../../../translations/messages/pt-PT.json'
import roRO from '../../../translations/messages/ro-RO.json'
import ruRU from '../../../translations/messages/ru-RU.json'
import srSP from '../../../translations/messages/sr-SP.json'
import svSE from '../../../translations/messages/sv-SE.json'
import trTR from '../../../translations/messages/tr-TR.json'
import ukUA from '../../../translations/messages/uk-UA.json'
import viVN from '../../../translations/messages/vi-VN.json'
import zhCN from '../../../translations/messages/zh-CN.json'
import zhTW from '../../../translations/messages/zh-TW.json'

/**
 * Map locale codes to imported translation objects
 */
const translations: Record<string, Record<string, unknown>> = {
  'en': enTemplate,
  'af-ZA': afZA,
  'ar-SA': arSA,
  'ca-ES': caES,
  'cs-CZ': csCZ,
  'da-DK': daDK,
  'de-DE': deDE,
  'el-GR': elGR,
  'es-ES': esES,
  'fi-FI': fiFI,
  'fr-FR': frFR,
  'he-IL': heIL,
  'hu-HU': huHU,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'nl-NL': nlNL,
  'no-NO': noNO,
  'pl-PL': plPL,
  'pt-BR': ptBR,
  'pt-PT': ptPT,
  'ro-RO': roRO,
  'ru-RU': ruRU,
  'sr-SP': srSP,
  'sv-SE': svSE,
  'tr-TR': trTR,
  'uk-UA': ukUA,
  'vi-VN': viVN,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
}

/**
 * Get translations for a locale
 * English uses the source template, other locales use Crowdin-generated messages
 */
export async function fetchTranslations(locale: string): Promise<Record<string, unknown>> {
  // Return the translations for the locale, fallback to English
  return translations[locale] || translations['en'] || enTemplate
}

/**
 * Get available locales
 */
export async function fetchAvailableLocales(): Promise<string[]> {
  return Object.keys(translations)
}

// Export repo info for reference
export const translationsRepoUrl = 'https://github.com/NodeByteHosting/translations'
export const crowdinProjectUrl = 'https://crowdin.com/project/nodebyte'
