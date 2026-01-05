'use client'

import { useState } from 'react'
import Link from 'next/link'

const services = [
  { id: 'air', name: 'Авиаперевозки', pricePerKg: 8, days: '3-5' },
  { id: 'sea', name: 'Морские', pricePerKg: 2, days: '25-35' },
  { id: 'rail', name: 'Ж/Д', pricePerKg: 4, days: '15-20' },
  { id: 'road', name: 'Авто', pricePerKg: 5, days: '10-15' },
]

const routes = [
  { id: 'msk-hcm', from: 'Москва', to: 'Хошимин', multiplier: 1 },
  { id: 'msk-hn', from: 'Москва', to: 'Ханой', multiplier: 1.1 },
  { id: 'spb-hcm', from: 'Санкт-Петербург', to: 'Хошимин', multiplier: 1.05 },
  { id: 'vlv-hcm', from: 'Владивосток', to: 'Хошимин', multiplier: 0.9 },
]

export default function CalculatorPage() {
  const [serviceId, setServiceId] = useState('air')
  const [routeId, setRouteId] = useState('msk-hcm')
  const [weight, setWeight] = useState('')
  const [volume, setVolume] = useState('')
  const [result, setResult] = useState<{
    price: number
    days: string
  } | null>(null)

  const selectedService = services.find((s) => s.id === serviceId)
  const selectedRoute = routes.find((r) => r.id === routeId)

  const calculate = () => {
    if (!weight || !selectedService || !selectedRoute) return

    const weightNum = parseFloat(weight)
    const volumeNum = volume ? parseFloat(volume) : 0

    const volumetricWeight = volumeNum * 167
    const chargeableWeight = Math.max(weightNum, volumetricWeight)

    const basePrice = chargeableWeight * selectedService.pricePerKg
    const totalPrice = basePrice * selectedRoute.multiplier

    const finalPrice = Math.max(totalPrice, 50)

    setResult({
      price: Math.round(finalPrice),
      days: selectedService.days,
    })
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Калькулятор доставки
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Рассчитайте примерную стоимость и сроки доставки вашего груза
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-[#f5f7fa]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8 md:p-12">
            {/* Service selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-4">
                Тип перевозки
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setServiceId(service.id)}
                    className={`p-4 border-2 text-center transition-all ${
                      serviceId === service.id
                        ? 'border-[#E5A835] bg-[#E5A835]/10'
                        : 'border-gray-200 hover:border-[#1B3B6F]'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#1B3B6F]">
                      {service.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{service.days} дней</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Route selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-4">
                Маршрут
              </label>
              <select
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.from} → {route.to}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight and volume */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-4">
                  Вес (кг) *
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="напр. 50"
                  min="0"
                  step="0.1"
                  className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-4">
                  Объём (м³)
                </label>
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Опционально"
                  min="0"
                  step="0.01"
                  className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Calculate button */}
            <button
              onClick={calculate}
              disabled={!weight}
              className="w-full py-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Рассчитать стоимость
            </button>

            {/* Result */}
            {result && (
              <div className="mt-8 p-8 bg-[#E5A835]">
                <div className="text-center">
                  <div className="text-sm text-[#1B3B6F]/80 uppercase tracking-wide mb-2">
                    Примерная стоимость
                  </div>
                  <div className="text-5xl font-bold text-[#1B3B6F] mb-2">
                    ${result.price}
                  </div>
                  <div className="text-[#1B3B6F]/80">
                    Срок доставки: <strong>{result.days} дней</strong>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/request?service=${serviceId}&route=${routeId}&weight=${weight}`}
                    className="flex-1 py-4 btn-secondary text-center"
                  >
                    Оставить заявку
                  </Link>
                  <a
                    href="tel:+84xxxxxxxxx"
                    className="flex-1 py-4 bg-white text-[#1B3B6F] font-semibold text-center uppercase tracking-wide hover:bg-gray-100 transition-colors"
                  >
                    Связаться с нами
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-gray-200">
              <div className="w-16 h-16 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B3B6F] mb-2">Точный расчёт</h3>
              <p className="text-gray-600">
                Для точной цены свяжитесь с нами — мы учтём все особенности груза
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200">
              <div className="w-16 h-16 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B3B6F] mb-2">Объёмный вес</h3>
              <p className="text-gray-600">
                Для лёгких объёмных грузов применяется объёмный вес (1м³ = 167кг)
              </p>
            </div>
            <div className="text-center p-8 border border-gray-200">
              <div className="w-16 h-16 bg-[#1B3B6F] mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1B3B6F] mb-2">Страховка включена</h3>
              <p className="text-gray-600">
                Все грузы застрахованы. Стоимость страховки включена в цену
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1B3B6F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужен индивидуальный расчёт?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Наши эксперты подготовят детальный расчёт с учётом ваших требований
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request" className="btn-primary">
              Оставить заявку
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
