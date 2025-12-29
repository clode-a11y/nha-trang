'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

const typeIcons = {
  airport: '✈️',
  land: '🚗',
  sea: '🚢'
}

export function BorderMap() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<typeof borderCrossings[0] | null>(null)
  const [filter, setFilter] = useState<'all' | 'airport' | 'land'>('all')

  const typeNames = {
    airport: t('borderMap.airport'),
    land: t('borderMap.landBorder'),
    sea: t('borderMap.seaport')
  }

  const borderCrossings = [
    {
      id: 1,
      name: t('borderMap.noiBai'),
      nameEn: 'Noi Bai Airport',
      type: 'airport',
      city: 'Hanoi',
      coords: { x: 155, y: 75 },
      evisa: true,
      voa: true,
      hours: '24/7',
      notes: t('borderMap.noteNoiBai')
    },
    {
      id: 2,
      name: t('borderMap.daNang'),
      nameEn: 'Da Nang Airport',
      type: 'airport',
      city: 'Da Nang',
      coords: { x: 175, y: 200 },
      evisa: true,
      voa: true,
      hours: '24/7',
      notes: t('borderMap.noteDaNang')
    },
    {
      id: 3,
      name: t('borderMap.camRanh'),
      nameEn: 'Cam Ranh Airport',
      type: 'airport',
      city: 'Nha Trang',
      coords: { x: 165, y: 310 },
      evisa: true,
      voa: true,
      hours: '24/7',
      notes: t('borderMap.noteCamRanh')
    },
    {
      id: 4,
      name: t('borderMap.tanSonNhat'),
      nameEn: 'Tan Son Nhat Airport',
      type: 'airport',
      city: 'Ho Chi Minh',
      coords: { x: 100, y: 400 },
      evisa: true,
      voa: true,
      hours: '24/7',
      notes: t('borderMap.noteTanSonNhat')
    },
    {
      id: 5,
      name: t('borderMap.phuQuoc'),
      nameEn: 'Phu Quoc Airport',
      type: 'airport',
      city: 'Phu Quoc',
      coords: { x: 55, y: 445 },
      evisa: true,
      voa: true,
      hours: '24/7',
      notes: t('borderMap.notePhuQuoc')
    },
    {
      id: 6,
      name: t('borderMap.mocBai'),
      nameEn: 'Moc Bai Border',
      type: 'land',
      city: 'Tay Ninh',
      coords: { x: 85, y: 385 },
      evisa: true,
      voa: false,
      hours: '7:00-22:00',
      notes: t('borderMap.noteMocBai')
    },
    {
      id: 7,
      name: t('borderMap.laoBao'),
      nameEn: 'Lao Bao Border',
      type: 'land',
      city: 'Quang Tri',
      coords: { x: 155, y: 175 },
      evisa: true,
      voa: false,
      hours: '7:00-19:00',
      notes: t('borderMap.noteLaoBao')
    }
  ]

  const filteredCrossings = borderCrossings.filter(
    c => filter === 'all' || c.type === filter
  )

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>🗺️</span> {t('borderMap.title')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {t('borderMap.subtitle')}
      </p>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'all'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('borderMap.all')} ({borderCrossings.length})
        </button>
        <button
          onClick={() => setFilter('airport')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'airport'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          ✈️ {t('borderMap.airports')}
        </button>
        <button
          onClick={() => setFilter('land')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            filter === 'land'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          🚗 {t('borderMap.land')}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Map */}
        <div className="relative bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-4">
          <svg className="w-full" viewBox="0 0 300 500" fill="none">
            {/* Vietnam outline */}
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
            " fill="#22C55E" fillOpacity="0.3" stroke="#22C55E" strokeWidth="2"/>

            {/* Border crossing markers */}
            {filteredCrossings.map(crossing => (
              <g key={crossing.id} onClick={() => setSelected(crossing)} className="cursor-pointer">
                <circle
                  cx={crossing.coords.x}
                  cy={crossing.coords.y}
                  r={selected?.id === crossing.id ? 12 : 8}
                  fill={crossing.type === 'airport' ? '#3B82F6' : '#F97316'}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all hover:r-12"
                />
                <text
                  x={crossing.coords.x}
                  y={crossing.coords.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                >
                  {crossing.type === 'airport' ? '✈' : '🚗'}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute bottom-4 left-4 flex gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span> {t('borderMap.airport')}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span> {t('borderMap.land')}
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div>
          {selected ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{typeIcons[selected.type as keyof typeof typeIcons]}</span>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{selected.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selected.nameEn}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('borderMap.city')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selected.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('borderMap.type')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {typeNames[selected.type as keyof typeof typeNames]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('borderMap.hours')}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{selected.hours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('borderMap.evisa')}</span>
                  <span className={selected.evisa ? 'text-green-600' : 'text-red-600'}>
                    {selected.evisa ? `✓ ${t('borderMap.accepted')}` : `✗ ${t('borderMap.notAccepted')}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">{t('borderMap.voa')}</span>
                  <span className={selected.voa ? 'text-green-600' : 'text-red-600'}>
                    {selected.voa ? `✓ ${t('borderMap.available')}` : `✗ ${t('borderMap.notAvailable')}`}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-600 p-3 rounded-lg">
                {selected.notes}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                👆 {t('borderMap.clickToView')}
              </p>
            </div>
          )}

          {/* Quick list */}
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {filteredCrossings.map(crossing => (
              <button
                key={crossing.id}
                onClick={() => setSelected(crossing)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  selected?.id === crossing.id
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                } border`}
              >
                <span className="mr-2">{typeIcons[crossing.type as keyof typeof typeIcons]}</span>
                <span className="font-medium text-gray-900 dark:text-white">{crossing.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
