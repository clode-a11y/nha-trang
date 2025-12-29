'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

export function VisaComparison() {
  const { t } = useTranslation()
  const [highlighted, setHighlighted] = useState<string | null>(null)

  const visaTypes = [
    {
      type: t('visaData.visaFree'),
      duration: t('visaData.upTo45Days'),
      price: t('visaData.free'),
      processing: t('visaData.instantly'),
      entry: t('visaData.single'),
      extension: t('common.no'),
      documents: t('visaData.passport'),
      recommended: true
    },
    {
      type: t('visaData.evisa'),
      duration: t('visaData.upTo90Days'),
      price: '$25',
      processing: t('visaData.3to5Days'),
      entry: t('visaData.single'),
      extension: t('common.yes'),
      documents: t('visaData.passportPhotoForm'),
      recommended: false
    },
    {
      type: t('visaData.voa'),
      duration: t('visaData.upTo30Days'),
      price: '$25-50',
      processing: t('visaData.2to3Days'),
      entry: t('visaData.singleMulti'),
      extension: t('common.yes'),
      documents: t('visaData.passportLetterPhoto'),
      recommended: false
    },
    {
      type: t('visaData.consular'),
      duration: t('visaData.upTo3Months'),
      price: t('common.from') + ' $50',
      processing: t('visaData.5to10Days'),
      entry: t('visaData.multi'),
      extension: t('common.yes'),
      documents: t('visaData.fullPackage'),
      recommended: false
    }
  ]

  const criteria = [
    { key: 'duration', label: t('comparison.duration') },
    { key: 'price', label: t('comparison.price') },
    { key: 'processing', label: t('comparison.processing') },
    { key: 'entry', label: t('comparison.entry') },
    { key: 'extension', label: t('comparison.extension') },
    { key: 'documents', label: t('comparison.documents') }
  ]

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-4 md:p-8 shadow-xl border border-white/50 dark:border-gray-700 overflow-hidden">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📊</span> {t('comparison.title')}
      </h3>

      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-2 md:p-3 text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">{t('comparison.criteria')}</th>
              {visaTypes.map(visa => (
                <th
                  key={visa.type}
                  className={`p-2 md:p-3 text-center cursor-pointer transition-all ${
                    highlighted === visa.type
                      ? 'bg-gradient-to-b from-green-100 dark:from-green-900/30 to-transparent'
                      : ''
                  } ${visa.recommended ? 'relative' : ''}`}
                  onMouseEnter={() => setHighlighted(visa.type)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  <div className={`font-bold text-sm md:text-base ${visa.recommended ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {visa.type}
                  </div>
                  {visa.recommended && (
                    <span className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap">
                      {t('comparison.recommended')}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, idx) => (
              <tr key={c.key} className={idx % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-700/30' : ''}>
                <td className="p-2 md:p-3 text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">{c.label}</td>
                {visaTypes.map(visa => (
                  <td
                    key={visa.type}
                    className={`p-2 md:p-3 text-center transition-all text-sm md:text-base ${
                      highlighted === visa.type
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : ''
                    }`}
                  >
                    <span className={`${
                      c.key === 'price' && visa.price === t('visaData.free')
                        ? 'text-green-600 dark:text-green-400 font-bold'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {visa[c.key as keyof typeof visa]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">{t('comparison.suitableFor')}</span>
        <span className="px-2 md:px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm">{t('comparison.tourism')}</span>
        <span className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm">{t('comparison.longVacation')}</span>
        <span className="px-2 md:px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-xs md:text-sm">{t('comparison.business')}</span>
      </div>
    </div>
  )
}
