import { prisma } from '@/lib/prisma'
import { cache, CACHE_KEYS, CACHE_TTL } from '@/lib/cache'
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
import { VisaTracker } from './components/VisaTracker'
import { InsuranceWidget } from './components/InsuranceWidget'
import { BorderMap } from './components/BorderMap'
import { VietnamMap } from './components/VietnamMap'
import { PaymentWidget } from './components/PaymentWidget'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { StatsSection } from './components/StatsSection'
import { FooterSection } from './components/FooterSection'

async function getVisaTypes() {
  return cache.getOrSet(
    CACHE_KEYS.VISA_TYPES,
    () => prisma.visaType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    CACHE_TTL.MEDIUM
  )
}

async function getFAQs() {
  return cache.getOrSet(
    CACHE_KEYS.FAQS,
    () => prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    }),
    CACHE_TTL.MEDIUM
  )
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
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

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

      {/* Visa Tracker & Payment */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Сервисы</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Отслеживание и оплата</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <VisaTracker />
            <PaymentWidget />
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

      {/* Vietnam Map */}
      <section id="vietnam-map" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <VietnamMap />
        </div>
      </section>

      {/* Border Map */}
      <section id="border-map" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Пункты въезда</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Карта погранпереходов</h2>
          </div>
          <BorderMap />
        </div>
      </section>

      {/* Insurance */}
      <section id="insurance" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 dark:text-green-400 font-bold mb-2">Подготовка к поездке</p>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">Страхование путешественников</h2>
          </div>
          <InsuranceWidget />
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
      <FooterSection />

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}
