'use client'

import { useTranslation } from './TranslationProvider'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen flex items-center pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center w-full">
        {/* Content */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-green-700 dark:text-green-400 mb-4 sm:mb-6 shadow-lg border border-white/50 dark:border-gray-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {t('hero.badge')}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-4 sm:mb-6">
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
            <a href="#calculator" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition shadow-xl">
              {t('hero.calculatorBtn')}
              <span>🧮</span>
            </a>
            <a href="#visas" className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition shadow-xl border border-gray-200 dark:border-gray-700">
              {t('hero.learnMore')}
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="relative flex justify-center items-center">
          <svg className="w-full max-w-sm animate-float-slow drop-shadow-2xl" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E"/>
                <stop offset="50%" stopColor="#FB7185"/>
                <stop offset="100%" stopColor="#F97316"/>
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#22C55E" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Vietnam Shape */}
            <path d="
              M 145 25
              C 160 28, 175 35, 185 45
              C 195 55, 200 70, 195 85
              C 190 100, 175 110, 170 125
              C 165 140, 170 155, 180 170
              C 190 185, 200 195, 195 215
              C 190 235, 175 250, 170 270
              C 165 290, 170 310, 175 330
              C 180 350, 175 370, 165 390
              C 155 410, 140 425, 125 440
              C 110 455, 90 465, 75 470
              C 60 475, 45 470, 40 455
              C 35 440, 45 420, 55 400
              C 65 380, 75 360, 80 340
              C 85 320, 80 300, 85 280
              C 90 260, 100 245, 105 225
              C 110 205, 105 185, 100 165
              C 95 145, 90 125, 95 105
              C 100 85, 115 70, 125 55
              C 135 40, 140 30, 145 25
              Z
            " fill="url(#mapGradient)" filter="url(#shadow)"/>

            {/* City Markers */}
            <g>
              <circle cx="155" cy="75" r="8" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
              <circle cx="155" cy="75" r="4" fill="url(#mapGradient)"/>
              <circle cx="175" cy="200" r="7" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
              <circle cx="175" cy="200" r="3" fill="url(#mapGradient)"/>
              <circle cx="160" cy="300" r="7" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
              <circle cx="160" cy="300" r="3" fill="url(#mapGradient)"/>
              <circle cx="100" cy="400" r="8" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
              <circle cx="100" cy="400" r="4" fill="url(#mapGradient)"/>
              <circle cx="55" cy="445" r="6" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
              <circle cx="55" cy="445" r="2.5" fill="url(#mapGradient)"/>
            </g>

            {/* City Labels */}
            <g fill="currentColor" className="text-gray-900 dark:text-white" fontFamily="system-ui" fontWeight="700" fontSize="12">
              <text x="175" y="80">Hanoi</text>
              <text x="195" y="205">Da Nang</text>
              <text x="180" y="305">Nha Trang</text>
              <text x="120" y="405">Ho Chi Minh</text>
              <text x="70" y="455">Phu Quoc</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
