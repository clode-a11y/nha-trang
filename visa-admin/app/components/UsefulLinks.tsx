'use client'

import { useTranslation } from './TranslationProvider'

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border-blue-200 dark:border-blue-800',
  red: 'bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 border-red-200 dark:border-red-800',
  green: 'bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border-green-200 dark:border-green-800',
  purple: 'bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border-purple-200 dark:border-purple-800',
  gray: 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600',
  teal: 'bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 border-teal-200 dark:border-teal-800'
}

export function UsefulLinks() {
  const { t } = useTranslation()

  const links = [
    {
      title: t('links.evisaOfficial'),
      url: 'https://evisa.xuatnhapcanh.gov.vn',
      description: t('links.evisaDesc'),
      icon: '🌐',
      color: 'blue'
    },
    {
      title: t('links.embassy'),
      url: 'http://www.vietnamembassy.ru',
      description: t('links.embassyDesc'),
      icon: '🏛️',
      color: 'red'
    },
    {
      title: t('links.immigration'),
      url: 'https://xuatnhapcanh.gov.vn',
      description: t('links.immigrationDesc'),
      icon: '📋',
      color: 'green'
    },
    {
      title: t('links.checkStatus'),
      url: 'https://evisa.xuatnhapcanh.gov.vn/tra-cuu-thi-thuc',
      description: t('links.checkStatusDesc'),
      icon: '🔍',
      color: 'purple'
    },
    {
      title: t('links.midRu'),
      url: 'https://www.mid.ru',
      description: t('links.midRuDesc'),
      icon: '🇷🇺',
      color: 'gray'
    },
    {
      title: t('links.airlines'),
      url: 'https://www.vietnamairlines.com',
      description: t('links.airlinesDesc'),
      icon: '✈️',
      color: 'teal'
    }
  ]

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>🔗</span> {t('links.title')}
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {links.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg ${colorClasses[link.color as keyof typeof colorClasses]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl sm:text-2xl">{link.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
                  {link.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{link.description}</p>
                <span className="text-xs text-blue-500 dark:text-blue-400 mt-2 inline-block">
                  {link.url.replace(/https?:\/\//, '').split('/')[0]} ↗
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        {t('links.official')}
      </p>
    </div>
  )
}
