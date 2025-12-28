import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { VisaCalculator } from './components/VisaCalculator'
import { DocumentChecklist } from './components/DocumentChecklist'
import { VisaComparison } from './components/VisaComparison'
import { UsefulLinks } from './components/UsefulLinks'
import { ChatBot } from './components/ChatBot'
import { ContactForm } from './components/ContactForm'
import { EmailSubscription } from './components/EmailSubscription'
import { Testimonials } from './components/Testimonials'
import { HelpCounter } from './components/HelpCounter'
import { ThemeToggle } from './components/ThemeToggle'

async function getVisaTypes() {
  return prisma.visaType.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
}

async function getFAQs() {
  return prisma.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  })
}

export default async function HomePage() {
  const [visaTypes, faqs] = await Promise.all([getVisaTypes(), getFAQs()])

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-200 via-pink-200 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient" />

      {/* Floating Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-300/50 dark:bg-green-900/30 rounded-full blur-3xl -top-20 -left-20 animate-float" />
        <div className="absolute w-80 h-80 bg-pink-300/50 dark:bg-pink-900/30 rounded-full blur-3xl top-1/3 -right-20 animate-float-delay" />
        <div className="absolute w-72 h-72 bg-orange-300/50 dark:bg-orange-900/30 rounded-full blur-3xl -bottom-20 left-1/4 animate-float-delay-2" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-2xl">🇻🇳</span>
            VietVisa
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="#calculator" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">Калькулятор</a>
            <a href="#visas" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">Визы</a>
            <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">FAQ</a>
            <a href="#contacts" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition">Контакты</a>
          </nav>
          <a href="#contacts" className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition shadow-lg">
            Оформить визу
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-green-700 dark:text-green-400 mb-6 shadow-lg border border-white/50 dark:border-gray-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Актуально на 2025 год
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Виза во{' '}
              <span className="bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Вьетнам
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Полная информация о визовых требованиях для граждан России.
              Безвизовый въезд до 45 дней, электронная виза, виза по прилёту.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#calculator" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-xl">
                Калькулятор визы
                <span>🧮</span>
              </a>
              <a href="#visas" className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-xl border border-gray-200 dark:border-gray-700">
                Узнать о визах
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative flex justify-center items-center">
            <svg className="w-full max-w-sm animate-float-slow drop-shadow-2xl" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E"/>
                  <stop offset="50%" stopColor="#FB7185"/>
                  <stop offset="100%" stopColor="#F97316"/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#22C55E" floodOpacity="0.3"/>
                </filter>
              </defs>

              {/* Vietnam Shape */}
              <path d="
                M 145 25
                C 160 28, 175 35, 185 45
                C 195 55, 200 70, 195 85
                C 190 100, 175 110, 170 125
                C 165 140, 170 155, 180 170
                C 190 185, 200 195, 195 215
                C 190 235, 175 250, 170 270
                C 165 290, 170 310, 175 330
                C 180 350, 175 370, 165 390
                C 155 410, 140 425, 125 440
                C 110 455, 90 465, 75 470
                C 60 475, 45 470, 40 455
                C 35 440, 45 420, 55 400
                C 65 380, 75 360, 80 340
                C 85 320, 80 300, 85 280
                C 90 260, 100 245, 105 225
                C 110 205, 105 185, 100 165
                C 95 145, 90 125, 95 105
                C 100 85, 115 70, 125 55
                C 135 40, 140 30, 145 25
                Z
              " fill="url(#mapGradient)" filter="url(#shadow)"/>

              {/* City Markers */}
              <g>
                {/* Hanoi */}
                <circle cx="155" cy="75" r="8" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
                <circle cx="155" cy="75" r="4" fill="url(#mapGradient)"/>

                {/* Da Nang */}
                <circle cx="175" cy="200" r="7" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
                <circle cx="175" cy="200" r="3" fill="url(#mapGradient)"/>

                {/* Nha Trang */}
                <circle cx="160" cy="300" r="7" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
                <circle cx="160" cy="300" r="3" fill="url(#mapGradient)"/>

                {/* Ho Chi Minh */}
                <circle cx="100" cy="400" r="8" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
                <circle cx="100" cy="400" r="4" fill="url(#mapGradient)"/>

                {/* Phu Quoc */}
                <circle cx="55" cy="445" r="6" fill="white" stroke="url(#mapGradient)" strokeWidth="3"/>
                <circle cx="55" cy="445" r="2.5" fill="url(#mapGradient)"/>
              </g>

              {/* City Labels */}
              <g fill="currentColor" className="text-gray-900 dark:text-white" fontFamily="system-ui" fontWeight="700" fontSize="12">
                <text x="175" y="80">Ханой</text>
                <text x="195" y="205">Дананг</text>
                <text x="180" y="305">Нячанг</text>
                <text x="120" y="405">Хошимин</text>
                <text x="70" y="455">Фукуок</text>
              </g>
            </svg>

            {/* Map Badges */}
            <div className="absolute top-10 -right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-gray-700 flex items-center gap-2 animate-float">
              <span>🏖️</span>
              <span className="font-bold text-sm dark:text-white">Пляжи</span>
            </div>
            <div className="absolute bottom-32 -left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-gray-700 flex items-center gap-2 animate-float-delay">
              <span>🍜</span>
              <span className="font-bold text-sm dark:text-white">Еда</span>
            </div>
            <div className="absolute bottom-10 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-white/50 dark:border-gray-700 flex items-center gap-2 animate-float-delay-2">
              <span>🏛️</span>
              <span className="font-bold text-sm dark:text-white">Храмы</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '45', label: 'дней без визы' },
            { value: '$25', label: 'стоимость e-visa' },
            { value: '3-5', label: 'дней оформление' },
            { value: '90', label: 'дней максимум' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 text-center shadow-xl border border-white/50 dark:border-gray-700">
              <p className="text-4xl font-black bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator & Checklist */}
      <section id="calculator" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Инструменты</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Подготовьтесь к поездке</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <VisaCalculator />
            <DocumentChecklist />
          </div>
        </div>
      </section>

      {/* Visa Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <VisaComparison />
        </div>
      </section>

      {/* Visa Types */}
      <section id="visas" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Типы виз</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Выберите подходящий вариант</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {visaTypes.map((visa, index) => (
              <div key={visa.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700 hover:scale-105 transition">
                <div className="text-4xl mb-4">
                  {index === 0 ? '✈️' : index === 1 ? '📱' : '🛂'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{visa.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{visa.description}</p>
                <div className="space-y-3 text-sm border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Срок:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{visa.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Стоимость:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{visa.price}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Документы:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{visa.documents}</p>
                </div>
              </div>
            ))}
          </div>
          {visaTypes.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">Информация о визах скоро появится</p>
          )}
        </div>
      </section>

      {/* E-Visa Steps */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 via-pink-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-white">
          <div className="text-center mb-12">
            <p className="text-white/80 font-bold mb-2">Инструкция</p>
            <h2 className="text-4xl font-black">Как оформить E-Visa</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Заполните анкету', desc: 'На сайте immigration.gov.vn' },
              { step: '2', title: 'Загрузите фото', desc: 'Формат 4x6 см, белый фон' },
              { step: '3', title: 'Оплатите сбор', desc: '$25 картой онлайн' },
              { step: '4', title: 'Получите визу', desc: 'На email через 3-5 дней' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://evisa.xuatnhapcanh.gov.vn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl"
            >
              Оформить E-Visa →
            </a>
          </div>
        </div>
      </section>

      {/* Useful Links */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <UsefulLinks />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* Help Counter */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <HelpCounter />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">FAQ</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Частые вопросы</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg border border-white/50 dark:border-gray-700 overflow-hidden">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-gray-900 dark:text-white">
                  {faq.question}
                  <span className="text-green-500 group-open:rotate-180 transition-transform text-xl">▼</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
          {faqs.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">FAQ скоро появится</p>
          )}
        </div>
      </section>

      {/* Contact Form & Email Subscription */}
      <section id="contacts" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Связаться с нами</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Нужна помощь?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ContactForm />
            <div className="space-y-8">
              {/* Quick contacts */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>📞</span> Быстрая связь
                </h3>
                <div className="space-y-4">
                  <a href="https://t.me/vietvisa" className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:scale-[1.02] transition">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Telegram</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">@vietvisa</p>
                    </div>
                  </a>
                  <a href="https://wa.me/84901234567" className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl hover:scale-[1.02] transition">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">WhatsApp</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">+84 901 234 567</p>
                    </div>
                  </a>
                  <a href="mailto:info@vietvisa.ru" className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:scale-[1.02] transition">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Email</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">info@vietvisa.ru</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Email subscription */}
          <EmailSubscription />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xl font-extrabold text-white mb-4">
                <span className="text-2xl">🇻🇳</span>
                VietVisa
              </div>
              <p className="text-gray-400 text-sm">
                Полная информация о визах во Вьетнам для граждан России
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#calculator" className="hover:text-green-400 transition">Калькулятор</a></li>
                <li><a href="#visas" className="hover:text-green-400 transition">Типы виз</a></li>
                <li><a href="#faq" className="hover:text-green-400 transition">FAQ</a></li>
                <li><a href="#contacts" className="hover:text-green-400 transition">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Ссылки</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="https://evisa.xuatnhapcanh.gov.vn" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">E-Visa официальный</a></li>
                <li><a href="https://vietnamembassy.ru" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">Посольство Вьетнама</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📱 Telegram: @vietvisa</li>
                <li>✉️ info@vietvisa.ru</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© 2025 VietVisa. Все права защищены.</p>
            <Link href="/admin" className="text-green-500 hover:text-green-400 font-medium">
              Админ-панель
            </Link>
          </div>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}
