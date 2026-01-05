import Link from 'next/link'

const services = [
  {
    id: 'air',
    title: 'Авиаперевозки',
    description: 'Самый быстрый способ доставки. Идеально для срочных и ценных грузов, требующих доставки в сжатые сроки.',
    features: ['3-5 дней', 'Температурный контроль', 'Полная страховка', 'Онлайн-трекинг'],
    price: 'от $8/кг',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    id: 'sea',
    title: 'Морские перевозки',
    description: 'Экономичное решение для крупных партий и контейнеров. Идеально для массовых грузов и коммерческих товаров.',
    features: ['Контейнерные перевозки', 'Сборные грузы (LCL)', 'Низкая стоимость', 'Большие объёмы'],
    price: 'от $2/кг',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'rail',
    title: 'Ж/Д перевозки',
    description: 'Оптимальный баланс между скоростью и стоимостью. Регулярные отправки по фиксированному расписанию.',
    features: ['15-20 дней', 'Регулярные отправки', 'Фиксированное расписание', 'Все типы грузов'],
    price: 'от $4/кг',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10 M21 16V8a1 1 0 00-1-1h-4l-3 3v5" />
      </svg>
    ),
  },
  {
    id: 'road',
    title: 'Автоперевозки',
    description: 'Гибкая доставка от двери до двери с возможностью выбора маршрута. Идеально для региональных перевозок.',
    features: ['От двери до двери', 'Гибкое расписание', 'Частичная загрузка', 'Экспресс-доставка'],
    price: 'от $5/кг',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zm-8 0H5a2 2 0 01-2-2V6a2 2 0 012-2h8l4 4v7a2 2 0 01-2 2h-1" />
      </svg>
    ),
  },
  {
    id: 'project',
    title: 'Проектная логистика',
    description: 'Специализированная доставка негабаритных и сложных грузов. Индивидуальные решения для уникальных задач.',
    features: ['Негабаритные грузы', 'Тяжёлое оборудование', 'Индивидуальные решения', 'Полное сопровождение'],
    price: 'по запросу',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Наши услуги
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Полный спектр логистических решений для доставки грузов из России во Вьетнам и по всему миру
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group bg-white p-8 border border-gray-200 hover:border-[#E5A835] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-[#1B3B6F] flex items-center justify-center text-white flex-shrink-0 group-hover:bg-[#E5A835] transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-bold text-[#1B3B6F] group-hover:text-[#E5A835] transition-colors">
                        {service.title}
                      </h2>
                      <span className="text-[#E5A835] font-bold text-lg">{service.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#f5f7fa] text-[#1B3B6F] text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-[#E5A835] font-semibold text-sm uppercase tracking-wide">
                      Подробнее
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1B3B6F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Не знаете, какую услугу выбрать?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Наши эксперты помогут подобрать оптимальное решение для доставки вашего груза
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="btn-primary"
            >
              Рассчитать стоимость
            </Link>
            <Link
              href="/request"
              className="btn-outline border-white text-white hover:bg-white hover:text-[#1B3B6F]"
            >
              Получить консультацию
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B3B6F] mb-4">
              Почему VietCargo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы предоставляем надёжные и профессиональные логистические услуги с фокусом на удовлетворённость клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Глобальная сеть',
                description: 'Обширная партнёрская сеть в России, Вьетнаме и по всему миру',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Таможенное оформление',
                description: 'Полный комплекс услуг по таможенному оформлению и документации',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: 'Страхование грузов',
                description: 'Полное страховое покрытие для всех отправлений',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Поддержка 24/7',
                description: 'Круглосуточная поддержка клиентов и отслеживание грузов',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#1B3B6F] text-white mx-auto mb-4 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B3B6F] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
