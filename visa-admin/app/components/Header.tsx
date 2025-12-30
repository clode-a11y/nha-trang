'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from './TranslationProvider'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '#calculator', label: t('nav.calculator'), icon: '🧮' },
    { href: '#visas', label: t('nav.visas'), icon: '🛂' },
    { href: '#faq', label: t('nav.faq'), icon: '❓' },
    { href: '/blog', label: t('nav.blog'), icon: '📚' },
    { href: '#contacts', label: t('nav.contacts'), icon: '📞' },
  ]

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white active:scale-95 transition">
            <span className="text-xl sm:text-2xl">🇻🇳</span>
            VietVisa
          </a>

          <nav className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            <a
              href="#contacts"
              className="hidden sm:block bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition shadow-lg"
            >
              {t('nav.applyVisa')}
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 active:scale-90 transition"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white dark:bg-gray-900 z-50 md:hidden transform transition-transform duration-300 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🇻🇳</span> VietVisa
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-90 transition"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 active:bg-green-100 dark:active:bg-green-900/50 hover:text-green-600 dark:hover:text-green-400 font-semibold transition"
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <a
            href="#contacts"
            onClick={handleLinkClick}
            className="block w-full text-center bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-5 py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg"
          >
            {t('nav.applyVisa')}
          </a>
        </div>
      </div>
    </>
  )
}
