'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TrackingEvent {
  status: string
  location: string
  description: string
  timestamp: string
  isCompleted: boolean
}

const demoTracking: Record<string, {
  trackingNumber: string
  status: string
  service: string
  from: string
  to: string
  estimatedDelivery: string
  events: TrackingEvent[]
}> = {
  'VC2024001': {
    trackingNumber: 'VC2024001',
    status: 'in_transit',
    service: 'Авиаперевозки',
    from: 'Москва, Россия',
    to: 'Хошимин, Вьетнам',
    estimatedDelivery: '15 января 2025',
    events: [
      {
        status: 'in_transit',
        location: 'Ханой, Вьетнам',
        description: 'Груз прибыл в страну назначения',
        timestamp: '10.01.2025 14:30',
        isCompleted: true,
      },
      {
        status: 'shipped',
        location: 'Москва, Россия',
        description: 'Груз отправлен авиатранспортом',
        timestamp: '08.01.2025 09:15',
        isCompleted: true,
      },
      {
        status: 'processing',
        location: 'Москва, Россия',
        description: 'Груз на складе, подготовка к отправке',
        timestamp: '07.01.2025 16:00',
        isCompleted: true,
      },
      {
        status: 'received',
        location: 'Москва, Россия',
        description: 'Груз принят на склад',
        timestamp: '06.01.2025 11:20',
        isCompleted: true,
      },
    ],
  },
}

const statusLabels: Record<string, { label: string; color: string }> = {
  received: { label: 'Принят', color: 'bg-gray-500' },
  processing: { label: 'Обработка', color: 'bg-[#E5A835]' },
  shipped: { label: 'Отправлен', color: 'bg-[#1B3B6F]' },
  in_transit: { label: 'В пути', color: 'bg-[#2A5298]' },
  customs: { label: 'Таможня', color: 'bg-orange-500' },
  out_for_delivery: { label: 'Доставляется', color: 'bg-purple-500' },
  delivered: { label: 'Доставлен', color: 'bg-green-500' },
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState<typeof demoTracking['VC2024001'] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Пожалуйста, введите номер отслеживания')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const tracking = demoTracking[trackingNumber.toUpperCase()]
    if (tracking) {
      setResult(tracking)
    } else {
      setError('Груз не найден. Проверьте номер отслеживания.')
    }

    setLoading(false)
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Отслеживание груза
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Введите номер отслеживания для проверки статуса вашего груза
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16 bg-[#f5f7fa]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Номер отслеживания (напр. VC2024001)"
                className="flex-1 p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none text-lg transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={loading}
                className="px-8 py-4 btn-primary disabled:opacity-50"
              >
                {loading ? 'Поиск...' : 'Найти'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Demo hint */}
          {!result && (
            <div className="text-center text-gray-500 mt-6">
              <p className="text-sm">
                Для демо используйте номер: <strong className="text-[#1B3B6F]">VC2024001</strong>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Result */}
      {result && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-[#1B3B6F] text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm opacity-80 uppercase tracking-wide">Номер отслеживания</div>
                    <div className="text-2xl font-bold">{result.trackingNumber}</div>
                  </div>
                  <div className={`px-4 py-2 text-sm font-bold uppercase tracking-wide ${statusLabels[result.status]?.color || 'bg-gray-500'}`}>
                    {statusLabels[result.status]?.label || result.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-80">Откуда</div>
                    <div className="font-medium">{result.from}</div>
                  </div>
                  <div>
                    <div className="opacity-80">Куда</div>
                    <div className="font-medium">{result.to}</div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-[#E5A835]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1B3B6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[#1B3B6F]/80">Ожидаемая доставка</div>
                    <div className="font-bold text-[#1B3B6F]">
                      {result.estimatedDelivery}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1B3B6F] mb-6 uppercase tracking-wide">
                  История перемещений
                </h3>
                <div className="space-y-0">
                  {result.events.map((event, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 ${
                            i === 0
                              ? 'bg-[#E5A835] ring-4 ring-[#E5A835]/20'
                              : 'bg-gray-300'
                          }`}
                        />
                        {i < result.events.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-200 my-1" />
                        )}
                      </div>
                      <div className="pb-8">
                        <div className="font-medium text-[#1B3B6F]">
                          {event.description}
                        </div>
                        <div className="text-sm text-gray-600">
                          {event.location}
                        </div>
                        <div className="text-sm text-gray-400">
                          {event.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help */}
      <section className="py-16 bg-[#1B3B6F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Не нашли свой груз?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Свяжитесь с нами для получения информации о доставке
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+84xxxxxxxxx"
              className="btn-primary"
            >
              +84 xxx xxx xxx
            </a>
            <Link
              href="/contacts"
              className="btn-outline border-white text-white hover:bg-white hover:text-[#1B3B6F]"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
