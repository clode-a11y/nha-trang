'use client'

import Link from 'next/link'
import { useTranslation } from './TranslationProvider'

export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-950 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🇻🇳</span>
              VietVisa
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><a href="#calculator" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('nav.calculator')}</a></li>
              <li><a href="#visas" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('nav.visas')}</a></li>
              <li><a href="#faq" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('nav.faq')}</a></li>
              <li><a href="#contacts" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('nav.contacts')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">{t('footer.links')}</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('links.evisaOfficial')}</a></li>
              <li><a href="https://vietnamembassy.ru" target="_blank" rel="noopener noreferrer" className="block py-1 hover:text-green-400 active:text-green-300 transition">{t('links.embassy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base mb-3 sm:mb-4">{t('footer.contacts')}</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
              <li className="py-1">📱 Telegram: @vietvisa</li>
              <li className="py-1">✉️ info@vietvisa.ru</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-gray-500 text-xs sm:text-sm">
          <p>© 2025 VietVisa. {t('footer.rights')}</p>
          <Link href="/admin" className="text-green-500 hover:text-green-400 active:text-green-300 font-medium py-1">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
