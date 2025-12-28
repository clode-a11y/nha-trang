'use client'

import { useState, useRef, useEffect } from 'react'
import { locales, localeNames, localeFlags, type Locale, defaultLocale } from '@/i18n'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load saved locale from localStorage
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && locales.includes(saved)) {
      setCurrentLocale(saved)
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    setIsOpen(false)
    // In a real app, this would trigger i18n to change language
    // For now, just store the preference
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 hover:scale-105 transition"
      >
        <span>{localeFlags[currentLocale]}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLocale.toUpperCase()}
        </span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 min-w-[150px]">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                locale === currentLocale ? 'bg-green-50 dark:bg-green-900/30' : ''
              }`}
            >
              <span className="text-xl">{localeFlags[locale]}</span>
              <span className={`text-sm ${locale === currentLocale ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                {localeNames[locale]}
              </span>
              {locale === currentLocale && (
                <span className="ml-auto text-green-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
