export const locales = ['ru', 'en', 'vi'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ru'

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  vi: 'Tiếng Việt'
}

export const localeFlags: Record<Locale, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  vi: '🇻🇳'
}

// Translation files are available in /messages folder
// For full i18n support, configure next-intl middleware
