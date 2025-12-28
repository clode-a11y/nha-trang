'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'

const services = [
  {
    id: 'evisa-standard',
    name: 'E-Visa стандарт',
    description: 'Оформление за 3-5 рабочих дней',
    price: 35,
    currency: 'USD',
    features: ['Проверка документов', 'Заполнение анкеты', 'Email поддержка']
  },
  {
    id: 'evisa-express',
    name: 'E-Visa экспресс',
    description: 'Оформление за 1-2 рабочих дня',
    price: 55,
    currency: 'USD',
    popular: true,
    features: ['Срочная обработка', 'Проверка документов', 'Заполнение анкеты', 'Приоритетная поддержка']
  },
  {
    id: 'full-package',
    name: 'Полный пакет',
    description: 'Виза + страховка + консультация',
    price: 85,
    currency: 'USD',
    features: ['E-Visa экспресс', 'Страховка $50,000', 'Персональный менеджер', 'Помощь 24/7']
  }
]

export function PaymentWidget() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setShowForm(true)
    trackEvent('service_selected', 'payment', serviceId)
  }

  const handlePayment = async () => {
    if (!selectedService) return

    setLoading(true)
    trackEvent('payment_initiated', 'payment', selectedService)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In real implementation, redirect to payment gateway
    // For demo, show success message
    alert('Демо: В реальной версии здесь будет переход к оплате через ЮKassa/Stripe')

    // Send notification
    await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'payment',
        data: {
          service: selectedService,
          ...formData
        }
      })
    }).catch(console.error)

    setLoading(false)
    setShowForm(false)
  }

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>💳</span> Оформить визу онлайн
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Выберите пакет услуг и оплатите онлайн
      </p>

      {!showForm ? (
        <div className="space-y-4">
          {services.map(service => (
            <div
              key={service.id}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                selectedService === service.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
              }`}
              onClick={() => handleSelect(service.id)}
            >
              {service.popular && (
                <span className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                  Популярный
                </span>
              )}

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{service.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${service.price}
                  </span>
                </div>
              </div>

              <ul className="mt-3 space-y-1">
                {service.features.map(feature => (
                  <li key={feature} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
            <p className="text-sm text-green-700 dark:text-green-300">
              Выбрано: <strong>{services.find(s => s.id === selectedService)?.name}</strong>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Имя *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Иван Иванов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Телефон</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="+7 999 123-45-67"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Назад
            </button>
            <button
              onClick={handlePayment}
              disabled={loading || !formData.name || !formData.email}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Обработка...' : `Оплатить $${services.find(s => s.id === selectedService)?.price}`}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-sm">
        <span>🔒 Безопасная оплата</span>
        <span>💳 Visa / MC</span>
        <span>🏦 СБП</span>
      </div>
    </div>
  )
}
