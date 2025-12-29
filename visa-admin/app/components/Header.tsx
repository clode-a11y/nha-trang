'use client'

import { useTranslation } from './TranslationProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-gray-900 dark:text-white">
          <span className="text-2xl">🇻🇳</span>
          VietVisa
        </a>
        <nav className="hidden md:flex gap-8">
          <a href="#calculator" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">
            {t('nav.calculator')}
          </a>
          <a href="#visas" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">
            {t('nav.visas')}
          </a>
          <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">
            {t('nav.faq')}
          </a>
          <a href="#contacts" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">
            {t('nav.contacts')}
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a href="#contacts" className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition shadow-lg">
            {t('nav.applyVisa')}
          </a>
        </div>
      </div>
    </header>
  )
}
