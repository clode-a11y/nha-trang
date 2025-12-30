'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

interface City {
  id: string
  nameKey: string
  x: number
  y: number
  isCapital?: boolean
  isHighlighted?: boolean
}

const cities: City[] = [
  { id: 'hanoi', nameKey: 'map.hanoi', x: 152, y: 95, isCapital: true },
  { id: 'haiphong', nameKey: 'map.haiphong', x: 168, y: 108 },
  { id: 'halong', nameKey: 'map.halong', x: 175, y: 98 },
  { id: 'danang', nameKey: 'map.danang', x: 170, y: 205 },
  { id: 'hue', nameKey: 'map.hue', x: 162, y: 188 },
  { id: 'nhatrang', nameKey: 'map.nhatrang', x: 185, y: 280, isHighlighted: true },
  { id: 'dalat', nameKey: 'map.dalat', x: 168, y: 295 },
  { id: 'hochiminh', nameKey: 'map.hochiminh', x: 150, y: 340 },
  { id: 'cantho', nameKey: 'map.cantho', x: 135, y: 360 },
  { id: 'phuquoc', nameKey: 'map.phuquoc', x: 100, y: 375 },
]

export function VietnamMap() {
  const { t } = useTranslation()
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>('nhatrang')

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>🗺️</span> {t('map.title')}
      </h3>

      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Map SVG */}
        <div className="relative flex-shrink-0">
          <svg
            viewBox="0 0 280 420"
            className="w-48 md:w-64 h-auto"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
          >
            {/* Vietnam outline - simplified path */}
            <path
              d="M155 45 L175 55 L185 70 L180 85 L175 95 L185 105 L180 115
                 L172 125 L168 140 L170 155 L175 170 L178 185 L175 195
                 L180 210 L185 225 L190 245 L195 265 L192 280 L188 295
                 L180 310 L170 325 L160 340 L150 355 L135 365 L120 375
                 L105 380 L95 375 L100 365 L110 355 L120 345 L130 335
                 L138 320 L145 305 L155 290 L165 275 L170 260 L168 245
                 L165 230 L160 215 L155 200 L150 185 L148 170 L150 155
                 L155 140 L158 125 L155 110 L150 95 L145 80 L148 65 L155 45 Z"
              className="fill-gradient-to-b from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40"
              stroke="url(#mapGradient)"
              strokeWidth="2"
              fill="url(#fillGradient)"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1fae5" className="dark:stop-color-green-900" />
                <stop offset="100%" stopColor="#a7f3d0" className="dark:stop-color-green-800" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Cities */}
            {cities.map((city) => {
              const isActive = hoveredCity === city.id || selectedCity === city.id
              const baseSize = city.isCapital ? 6 : city.isHighlighted ? 5 : 4
              const size = isActive ? baseSize + 2 : baseSize

              return (
                <g key={city.id}>
                  {/* Glow effect for highlighted/active cities */}
                  {(city.isHighlighted || isActive) && (
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={size + 4}
                      className={`${city.isHighlighted ? 'fill-orange-400/30' : 'fill-green-400/30'}`}
                      filter="url(#glow)"
                    />
                  )}

                  {/* City dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={size}
                    className={`cursor-pointer transition-all duration-200 ${
                      city.isHighlighted
                        ? 'fill-orange-500 stroke-orange-600'
                        : city.isCapital
                          ? 'fill-red-500 stroke-red-600'
                          : isActive
                            ? 'fill-green-500 stroke-green-600'
                            : 'fill-green-400 stroke-green-500'
                    }`}
                    strokeWidth="1.5"
                    onMouseEnter={() => setHoveredCity(city.id)}
                    onMouseLeave={() => setHoveredCity(null)}
                    onClick={() => setSelectedCity(city.id)}
                  />

                  {/* Capital star */}
                  {city.isCapital && (
                    <text
                      x={city.x}
                      y={city.y + 1}
                      textAnchor="middle"
                      className="fill-white text-[6px] font-bold pointer-events-none"
                    >
                      ★
                    </text>
                  )}
                </g>
              )
            })}

            {/* Tooltip */}
            {hoveredCity && (
              <g>
                {(() => {
                  const city = cities.find(c => c.id === hoveredCity)
                  if (!city) return null
                  const tooltipX = city.x + 15
                  const tooltipY = city.y - 10
                  return (
                    <>
                      <rect
                        x={tooltipX - 2}
                        y={tooltipY - 12}
                        width="70"
                        height="18"
                        rx="4"
                        className="fill-gray-900/90 dark:fill-white/90"
                      />
                      <text
                        x={tooltipX + 33}
                        y={tooltipY}
                        textAnchor="middle"
                        className="fill-white dark:fill-gray-900 text-[10px] font-medium"
                      >
                        {t(city.nameKey)}
                      </text>
                    </>
                  )
                })()}
              </g>
            )}
          </svg>
        </div>

        {/* Legend & Info */}
        <div className="flex-1 space-y-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">★</span>
              <span className="text-gray-600 dark:text-gray-400">{t('map.capital')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-gray-600 dark:text-gray-400">{t('map.recommended')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="text-gray-600 dark:text-gray-400">{t('map.cities')}</span>
            </div>
          </div>

          {/* Selected city info */}
          {selectedCity && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-200 dark:border-green-800">
              {(() => {
                const city = cities.find(c => c.id === selectedCity)
                if (!city) return null
                return (
                  <>
                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {city.isHighlighted && <span className="text-orange-500">⭐</span>}
                      {t(city.nameKey)}
                      {city.isCapital && <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">{t('map.capitalBadge')}</span>}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t(`map.${selectedCity}Desc`)}
                    </p>
                  </>
                )
              })()}
            </div>
          )}

          {/* Airports with international flights */}
          <div className="text-sm">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span>✈️</span> {t('map.airports')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {['hanoi', 'hochiminh', 'danang', 'nhatrang', 'phuquoc'].map(cityId => (
                <button
                  key={cityId}
                  onClick={() => setSelectedCity(cityId)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium active:scale-95 transition ${
                    selectedCity === cityId
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/40'
                  }`}
                >
                  {t(`map.${cityId}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
