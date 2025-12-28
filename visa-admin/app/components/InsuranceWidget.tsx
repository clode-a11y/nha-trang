'use client'

const insurancePartners = [
  {
    name: 'Cherehapa',
    logo: '🛡️',
    description: 'Сравнение страховок от 20+ компаний',
    coverage: 'от $30,000',
    price: 'от 1$/день',
    url: 'https://cherehapa.ru/?partnerId=vietvisa',
    color: 'blue',
    features: ['COVID-19', 'Экстренная эвакуация', 'Потеря багажа']
  },
  {
    name: 'Tripinsurance',
    logo: '✈️',
    description: 'Премиум страхование для путешественников',
    coverage: 'от $50,000',
    price: 'от 2$/день',
    url: 'https://tripinsurance.ru/?ref=vietvisa',
    color: 'green',
    features: ['Активный отдых', 'Телемедицина', 'Юридическая помощь']
  },
  {
    name: 'Sravni',
    logo: '📊',
    description: 'Быстрое сравнение всех страховок',
    coverage: 'от $35,000',
    price: 'от 1.5$/день',
    url: 'https://sravni.ru/strahovanie-turistov/?partner=vietvisa',
    color: 'purple',
    features: ['Онлайн оформление', 'Мгновенный полис', 'Кэшбэк']
  }
]

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 hover:border-blue-400',
  green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 hover:border-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 hover:border-purple-400'
}

export function InsuranceWidget() {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>🏥</span> Страховка для поездки
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Рекомендуем оформить страховку с покрытием от $30,000
      </p>

      <div className="space-y-4">
        {insurancePartners.map(partner => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 rounded-xl border-2 transition-all hover:scale-[1.02] hover:shadow-lg ${colorClasses[partner.color as keyof typeof colorClasses]}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{partner.logo}</span>
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
                  Покрытие: {partner.coverage}
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start gap-2">
          <span>⚠️</span>
          <span>
            Страховка не является обязательной для въезда во Вьетнам, но настоятельно рекомендуется.
            Медицинские услуги для иностранцев платные.
          </span>
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-400 text-center">
        * Партнёрские ссылки. Мы можем получать комиссию.
      </p>
    </div>
  )
}
