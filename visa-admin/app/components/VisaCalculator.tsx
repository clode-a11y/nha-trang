'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

export function VisaCalculator() {
  const { t } = useTranslation()
  const [days, setDays] = useState(30)
  const [result, setResult] = useState<{
    type: string
    description: string
    price: string
    color: string
  } | null>(null)

  const calculate = () => {
    if (days <= 45) {
      setResult({
        type: t('calculator.visaFree'),
        description: t('calculator.visaFreeDesc'),
        price: t('calculator.free'),
        color: 'green'
      })
    } else if (days <= 90) {
      setResult({
        type: t('calculator.evisa'),
        description: t('calculator.evisaDesc'),
        price: '$25',
        color: 'blue'
      })
    } else {
      setResult({
        type: t('calculator.longTerm'),
        description: t('calculator.longTermDesc'),
        price: t('calculator.from') + ' $50',
        color: 'orange'
      })
    }
  }

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
        <span>🧮</span> {t('calculator.title')}
      </h3>

      <div className="mb-4 sm:mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          {t('calculator.question')}
        </label>
        <div className="flex items-center gap-3 sm:gap-4">
          <input
            type="range"
            min="1"
            max="180"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="flex-1 h-3 sm:h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-4 py-2 rounded-xl font-bold text-sm sm:text-base min-w-[70px] sm:min-w-[80px] text-center">
            {days} {t('calculator.days')}
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg"
      >
        {t('calculator.calculate')}
      </button>

      {result && (
        <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl ${
          result.color === 'green' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' :
          result.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' :
          'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700'
        } border-2`}>
          <div className="flex justify-between items-start mb-2">
            <h4 className={`font-bold text-base sm:text-lg ${
              result.color === 'green' ? 'text-green-700 dark:text-green-400' :
              result.color === 'blue' ? 'text-blue-700 dark:text-blue-400' :
              'text-orange-700 dark:text-orange-400'
            }`}>
              {result.type}
            </h4>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              result.color === 'green' ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300' :
              result.color === 'blue' ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300' :
              'bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300'
            }`}>
              {result.price}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{result.description}</p>
        </div>
      )}
    </div>
  )
}
