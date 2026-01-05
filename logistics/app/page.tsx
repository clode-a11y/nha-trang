import Link from 'next/link'

const services = [
  {
    id: 'air',
    title: 'Авиаперевозки',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    description: 'Быстрая и надёжная доставка грузов авиатранспортом. Идеально для срочных отправлений с гарантией доставки в срок.',
  },
  {
    id: 'sea',
    title: 'Морские перевозки',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15l2-2 4 4 4-4 4 4 4-4 2 2M3 9l2-2 4 4 4-4 4 4 4-4 2 2" />
      </svg>
    ),
    description: 'Экономичные морские перевозки для крупных партий. Контейнерные (FCL) и сборные (LCL) грузы по выгодным тарифам.',
  },
  {
    id: 'rail',
    title: 'Ж/Д перевозки',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h8M8 17v4h8v-4M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2M12 3v4" />
      </svg>
    ),
    description: 'Железнодорожные перевозки между Россией, Китаем и Вьетнамом. Оптимальный баланс скорости и стоимости.',
  },
  {
    id: 'road',
    title: 'Автоперевозки',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M17 16V8a1 1 0 011-1h2l3 4v5" />
      </svg>
    ),
    description: 'Гибкие решения для доставки от двери до двери. Современный автопарк с отслеживанием в реальном времени.',
  },
  {
    id: 'project',
    title: 'Проектная логистика',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    description: 'Комплексные решения для негабаритных и тяжёлых грузов. Планирование и реализация сложных логистических проектов.',
  },
]

const stats = [
  { value: '15+', label: 'Лет опыта' },
  { value: '50+', label: 'Стран доставки' },
  { value: '10K+', label: 'Доставлено грузов' },
  { value: '99%', label: 'Довольных клиентов' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-[120px] bg-gradient-to-br from-[#1B3B6F] to-[#122850] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Надёжная логистика<br />
              <span className="text-[#E5A835]">из России во Вьетнам!</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              VietCargo — ваш надёжный партнёр в международных грузоперевозках.
              Доставляем грузы безопасно и в срок во Вьетнам и по всему миру.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/request"
                className="inline-block bg-[#E5A835] hover:bg-[#C4901F] text-[#122850] px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
              >
                Оставить заявку
              </Link>
              <Link
                href="/services"
                className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-[#1B3B6F] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
              >
                Наши услуги
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-8">
              <a href="tel:+84xxxxxxxxx" className="flex items-center gap-3 text-white hover:text-[#E5A835] transition-colors">
                <div className="w-12 h-12 border-2 border-[#E5A835] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Звоните нам</div>
                  <div className="font-bold">+84 xxx xxx xxx</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#E5A835]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#1B3B6F]">{stat.value}</div>
                <div className="text-sm text-[#1B3B6F]/70 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B3B6F] mb-4">
              Наши услуги
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Комплексные решения по грузоперевозкам и логистике для вашего бизнеса
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group bg-white border border-gray-200 p-8 hover:shadow-xl hover:border-[#E5A835] transition-all duration-300"
              >
                <div className="text-[#1B3B6F] group-hover:text-[#E5A835] transition-colors mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1B3B6F] mb-4 uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-[#E5A835] font-semibold text-sm uppercase tracking-wide">
                  Подробнее
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1B3B6F] mb-6">
                VietCargo — эксперт в международной логистике
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                За годы работы мы заработали репутацию надёжного, эффективного и клиентоориентированного
                партнёра. Наша команда экспертов обеспечивает безопасную и своевременную доставку грузов.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Специализируемся на грузоперевозках между Россией, Китаем и Вьетнамом. Предлагаем полный
                комплекс услуг: таможенное оформление, складирование и доставку от двери до двери.
              </p>
              <Link
                href="/about"
                className="inline-block bg-[#1B3B6F] hover:bg-[#122850] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
              >
                О компании
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B3B6F] p-8 text-white">
                <div className="text-5xl font-bold text-[#E5A835] mb-2">15+</div>
                <div className="text-sm uppercase tracking-wide">Лет опыта</div>
              </div>
              <div className="bg-[#E5A835] p-8">
                <div className="text-5xl font-bold text-[#1B3B6F] mb-2">50+</div>
                <div className="text-sm uppercase tracking-wide text-[#1B3B6F]/70">Стран доставки</div>
              </div>
              <div className="bg-[#E5A835] p-8">
                <div className="text-5xl font-bold text-[#1B3B6F] mb-2">24/7</div>
                <div className="text-sm uppercase tracking-wide text-[#1B3B6F]/70">Поддержка клиентов</div>
              </div>
              <div className="bg-[#1B3B6F] p-8 text-white">
                <div className="text-5xl font-bold text-[#E5A835] mb-2">99%</div>
                <div className="text-sm uppercase tracking-wide">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1B3B6F] mb-4">
              Почему выбирают VietCargo?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🌍', title: 'Глобальная сеть', desc: 'Доставка по всему миру через надёжных партнёров' },
              { icon: '📦', title: 'Отслеживание груза', desc: 'Мониторинг отправления в реальном времени' },
              { icon: '💰', title: 'Лучшие цены', desc: 'Конкурентные тарифы на все виды услуг' },
              { icon: '🔒', title: 'Безопасная доставка', desc: 'Полное страхование и бережное обращение' },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#1B3B6F] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-16 bg-[#1B3B6F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                Рассчитайте стоимость доставки
              </h2>
              <p className="text-gray-300">
                Получите мгновенный расчёт стоимости с помощью онлайн-калькулятора
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/calculator"
                className="bg-[#E5A835] hover:bg-[#C4901F] text-[#122850] px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
              >
                Калькулятор
              </Link>
              <Link
                href="/tracking"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-[#1B3B6F] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all"
              >
                Отследить груз
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1B3B6F] mb-6">
                Свяжитесь с нами
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Есть вопросы о наших услугах? Свяжитесь с нами, и наша команда с радостью
                поможет решить все ваши логистические задачи.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1B3B6F] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Адрес</div>
                    <div className="font-semibold text-[#1B3B6F]">Нячанг, Вьетнам</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1B3B6F] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Телефон</div>
                    <a href="tel:+84xxxxxxxxx" className="font-semibold text-[#1B3B6F] hover:text-[#E5A835]">+84 xxx xxx xxx</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1B3B6F] flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#E5A835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">Email</div>
                    <a href="mailto:info@vietcargo.vn" className="font-semibold text-[#1B3B6F] hover:text-[#E5A835]">info@vietcargo.vn</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-xl font-bold text-[#1B3B6F] mb-6">Отправить сообщение</h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full p-4 border border-gray-200 focus:border-[#1B3B6F] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full p-4 border border-gray-200 focus:border-[#1B3B6F] outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Тема"
                  className="w-full p-4 border border-gray-200 focus:border-[#1B3B6F] outline-none"
                />
                <textarea
                  placeholder="Ваше сообщение"
                  rows={5}
                  className="w-full p-4 border border-gray-200 focus:border-[#1B3B6F] outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#E5A835] hover:bg-[#C4901F] text-[#122850] py-4 font-bold text-sm uppercase tracking-wider transition-all"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
