'use client'

import Link from 'next/link'
import { useTranslation } from './TranslationProvider'

export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-extrabold text-white mb-4">
              <span className="text-2xl">🇻🇳</span>
              VietVisa
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer.navigation')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#calculator" className="hover:text-green-400 transition">{t('nav.calculator')}</a></li>
              <li><a href="#visas" className="hover:text-green-400 transition">{t('nav.visas')}</a></li>
              <li><a href="#faq" className="hover:text-green-400 transition">{t('nav.faq')}</a></li>
              <li><a href="#contacts" className="hover:text-green-400 transition">{t('nav.contacts')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">{t('links.evisaOfficial')}</a></li>
              <li><a href="https://vietnamembassy.ru" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">{t('links.embassy')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t('footer.contacts')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📱 Telegram: @vietvisa</li>
              <li>✉️ info@vietvisa.ru</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2025 VietVisa. {t('footer.rights')}</p>
          <Link href="/admin" className="text-green-500 hover:text-green-400 font-medium">
            {t('footer.admin')}
          </Link>
        </div>
      </div>
    </footer>
  )
}
