'use client'

import { useTranslation } from './TranslationProvider'

export function StatsSection() {
  const { t } = useTranslation()

  const stats = [
    { value: '45', label: t('stats.daysVisaFree') },
    { value: '$25', label: t('stats.evisaCost') },
    { value: '3-5', label: t('stats.processingDays') },
    { value: '90', label: t('stats.maxDays') },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 text-center shadow-xl border border-white/50 dark:border-gray-700">
            <p className="text-4xl font-black bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
