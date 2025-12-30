'use client'

import { useTranslation } from './TranslationProvider'

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 hover:border-blue-400',
  green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 hover:border-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 hover:border-purple-400'
}

export function InsuranceWidget() {
  const { t } = useTranslation()

  const insurancePartners = [
    {
      name: 'Cherehapa',
      logo: '🛡️',
      description: t('insurance.cherehapa'),
      coverage: '$30,000',
      price: `$1${t('insurance.perDay')}`,
      url: 'https://cherehapa.ru/?partnerId=vietvisa',
      color: 'blue',
      features: [t('insurance.covid'), t('insurance.evacuation'), t('insurance.baggage')]
    },
    {
      name: 'Tripinsurance',
      logo: '✈️',
      description: t('insurance.tripinsurance'),
      coverage: '$50,000',
      price: `$2${t('insurance.perDay')}`,
      url: 'https://tripinsurance.ru/?ref=vietvisa',
      color: 'green',
      features: [t('insurance.active'), t('insurance.telemedicine'), t('insurance.legal')]
    },
    {
      name: 'Sravni',
      logo: '📊',
      description: t('insurance.sravni'),
      coverage: '$35,000',
      price: `$1.5${t('insurance.perDay')}`,
      url: 'https://sravni.ru/strahovanie-turistov/?partner=vietvisa',
      color: 'purple',
      features: [t('insurance.online'), t('insurance.instant'), t('insurance.cashback')]
    }
  ]

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>🏥</span> {t('insurance.title')}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
        {t('insurance.subtitle')}
      </p>

      <div className="space-y-4">
        {insurancePartners.map(partner => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${colorClasses[partner.color as keyof typeof colorClasses]}`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl">{partner.logo}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">{partner.name}</h4>
                  <span className="text-green-600 dark:text-green-400 font-bold">{partner.price}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map(feature => (
                    <span key={feature} className="text-xs px-2 py-1 bg-white/50 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t('insurance.coverage')}: {partner.coverage}
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
          <span>⚠️</span>
          <span>{t('insurance.warning')}</span>
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        {t('insurance.affiliate')}
      </p>
    </div>
  )
}
