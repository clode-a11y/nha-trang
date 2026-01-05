import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            О компании VietCargo
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ваш надёжный логистический партнёр по перевозке грузов между Россией и Вьетнамом
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#E5A835] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5+', label: 'Лет опыта' },
              { value: '1000+', label: 'Грузов доставлено' },
              { value: '50+', label: 'Постоянных клиентов' },
              { value: '99%', label: 'Довольных клиентов' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1B3B6F]">{stat.value}</div>
                <div className="text-[#1B3B6F]/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1B3B6F] mb-6">Наша история</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                VietCargo была основана в 2020 году командой опытных профессионалов в сфере логистики, которые увидели растущую потребность в качественных услугах грузоперевозок между Россией и Вьетнамом.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                За эти годы мы выстроили прочные партнёрские отношения с ведущими перевозчиками и таможенными брокерами, что позволяет предлагать клиентам оптимальные маршруты и конкурентные цены.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Сегодня мы с гордостью обслуживаем бизнесы любого размера — от малых предприятий до крупных корпораций, предоставляя надёжные и эффективные логистические решения.
              </p>
            </div>
            <div className="bg-[#f5f7fa] p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 text-center">
                  <div className="w-12 h-12 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div className="font-bold text-[#1B3B6F]">Авиаперевозки</div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="w-12 h-12 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                  </div>
                  <div className="font-bold text-[#1B3B6F]">Морские</div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="w-12 h-12 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="font-bold text-[#1B3B6F]">Ж/Д</div>
                </div>
                <div className="bg-white p-6 text-center">
                  <div className="w-12 h-12 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0" />
                    </svg>
                  </div>
                  <div className="font-bold text-[#1B3B6F]">Авто</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1B3B6F] p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Наша миссия</h3>
              <p className="text-gray-300 leading-relaxed">
                Обеспечивать надёжную и прозрачную доставку грузов, делая международную торговлю доступной для бизнеса любого размера. Мы стремимся быть мостом, соединяющим рынки и способствующим росту.
              </p>
            </div>
            <div className="bg-[#E5A835] p-8">
              <h3 className="text-2xl font-bold text-[#1B3B6F] mb-4">Наши ценности</h3>
              <p className="text-[#1B3B6F]/80 leading-relaxed">
                Честность, надёжность и ориентация на клиента — основа нашей работы. Мы ценим время и деньги клиентов, относясь к каждой отправке как к собственной.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1B3B6F] mb-4">Почему выбирают VietCargo</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы выделяемся благодаря нашей приверженности качеству и удовлетворённости клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Профессиональная команда',
                description: 'Опытные эксперты по логистике, готовые решить любую задачу',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'Конкурентные цены',
                description: 'Лучшие цены на рынке без ущерба качеству',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Глобальная сеть',
                description: 'Прочные партнёрства с перевозчиками по всему миру',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Поддержка 24/7',
                description: 'Всегда готовы помочь с вашими логистическими задачами',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 border border-gray-200 hover:border-[#E5A835] transition-colors">
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

      {/* CTA */}
      <section className="py-20 bg-[#1B3B6F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы работать с нами?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Давайте обсудим, как мы можем помочь с вашими логистическими задачами
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request" className="btn-primary">
              Начать
            </Link>
            <Link href="/contacts" className="btn-outline border-white text-white hover:bg-white hover:text-[#1B3B6F]">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
