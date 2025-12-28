const links = [
  {
    title: 'Официальный сайт E-Visa',
    url: 'https://evisa.xuatnhapcanh.gov.vn',
    description: 'Оформление электронной визы',
    icon: '🌐',
    color: 'blue'
  },
  {
    title: 'Посольство Вьетнама в РФ',
    url: 'http://www.vietnamembassy.ru',
    description: 'Консульские услуги в Москве',
    icon: '🏛️',
    color: 'red'
  },
  {
    title: 'Иммиграционная служба',
    url: 'https://xuatnhapcanh.gov.vn',
    description: 'Официальный сайт миграционной службы',
    icon: '📋',
    color: 'green'
  },
  {
    title: 'Проверка статуса E-Visa',
    url: 'https://evisa.xuatnhapcanh.gov.vn/tra-cuu-thi-thuc',
    description: 'Узнать готовность визы',
    icon: '🔍',
    color: 'purple'
  },
  {
    title: 'МИД России',
    url: 'https://www.mid.ru',
    description: 'Рекомендации для путешественников',
    icon: '🇷🇺',
    color: 'gray'
  },
  {
    title: 'Vietnam Airlines',
    url: 'https://www.vietnamairlines.com',
    description: 'Национальная авиакомпания',
    icon: '✈️',
    color: 'teal'
  }
]

const colorClasses = {
  blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
  red: 'bg-red-50 hover:bg-red-100 border-red-200',
  green: 'bg-green-50 hover:bg-green-100 border-green-200',
  purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  gray: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
  teal: 'bg-teal-50 hover:bg-teal-100 border-teal-200'
}

export function UsefulLinks() {
  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>🔗</span> Полезные ссылки
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(link => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 rounded-xl border-2 transition-all hover:scale-[1.02] hover:shadow-lg ${colorClasses[link.color as keyof typeof colorClasses]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{link.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600">
                  {link.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                <span className="text-xs text-blue-500 mt-2 inline-block">
                  {link.url.replace(/https?:\/\//, '').split('/')[0]} ↗
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Все ссылки ведут на официальные государственные ресурсы
      </p>
    </div>
  )
}
