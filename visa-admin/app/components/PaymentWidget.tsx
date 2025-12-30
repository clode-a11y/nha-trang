'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'
import { useTranslation } from './TranslationProvider'

export function PaymentWidget() {
  const { t } = useTranslation()
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const services = [
    {
      id: 'evisa-standard',
      name: t('payment.evisaStandard'),
      description: t('payment.evisaStandardDesc'),
      price: 35,
      currency: 'USD',
      features: [t('payment.docCheck'), t('payment.formFill'), t('payment.emailSupport')]
    },
    {
      id: 'evisa-express',
      name: t('payment.evisaExpress'),
      description: t('payment.evisaExpressDesc'),
      price: 55,
      currency: 'USD',
      popular: true,
      features: [t('payment.urgentProcessing'), t('payment.docCheck'), t('payment.formFill'), t('payment.prioritySupport')]
    },
    {
      id: 'full-package',
      name: t('payment.fullPackage'),
      description: t('payment.fullPackageDesc'),
      price: 85,
      currency: 'USD',
      features: [t('payment.evisaExpress'), t('payment.insurance50k'), t('payment.personalManager'), t('payment.support247')]
    }
  ]

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
    alert('Demo: In production this would redirect to payment gateway (YooKassa/Stripe)')

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
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>💳</span> {t('payment.title')}
      </h3>
      <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
        {t('payment.subtitle')}
      </p>

      {!showForm ? (
        <div className="space-y-4">
          {services.map(service => (
            <div
              key={service.id}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                selectedService === service.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
              }`}
              onClick={() => handleSelect(service.id)}
            >
              {service.popular && (
                <span className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                  {t('payment.popular')}
                </span>
              )}

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{service.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
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
              {t('payment.selected')} <strong>{services.find(s => s.id === selectedService)?.name}</strong>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('payment.name')} *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 text-base border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={t('payment.namePlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('payment.email')} *</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 text-base border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={t('payment.emailPlaceholder')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('payment.phone')}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 text-base border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={t('payment.phonePlaceholder')}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition"
            >
              {t('payment.back')}
            </button>
            <button
              onClick={handlePayment}
              disabled={loading || !formData.name || !formData.email}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('payment.processing') : `${t('payment.pay')} $${services.find(s => s.id === selectedService)?.price}`}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-400 text-xs sm:text-sm">
        <span>🔒 {t('payment.securePayment')}</span>
        <span>💳 {t('payment.cards')}</span>
        <span>🏦 {t('payment.sbp')}</span>
      </div>
    </div>
  )
}
