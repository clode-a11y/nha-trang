'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const services = [
  { id: 'air', name: 'Авиаперевозки', icon: '✈️' },
  { id: 'sea', name: 'Морские перевозки', icon: '🚢' },
  { id: 'rail', name: 'Ж/Д перевозки', icon: '🚂' },
  { id: 'road', name: 'Автоперевозки', icon: '🚛' },
  { id: 'project', name: 'Проектная логистика', icon: '📦' },
]

const cargoTypes = [
  { id: 'general', name: 'Обычный груз' },
  { id: 'fragile', name: 'Хрупкий' },
  { id: 'perishable', name: 'Скоропортящийся' },
  { id: 'hazardous', name: 'Опасный' },
]

function RequestForm() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    // Step 1: Service
    service: searchParams.get('service') || 'air',
    // Step 2: Cargo
    cargoType: 'general',
    cargoDescription: '',
    weight: searchParams.get('weight') || '',
    volume: '',
    quantity: '1',
    // Step 3: Route
    pickupAddress: '',
    deliveryAddress: '',
    // Step 4: Contact
    name: '',
    email: '',
    phone: '',
    company: '',
    comment: '',
  })

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Заявка отправлена!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Мы получили вашу заявку и свяжемся с вами в ближайшее время для уточнения деталей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              На главную
            </Link>
            <Link
              href="/tracking"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-blue-500 transition-all"
            >
              Отследить груз
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оформление заявки
          </h1>
          <p className="text-xl text-gray-600">
            Заполните форму и мы свяжемся с вами для расчёта стоимости
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-1 ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Выберите тип доставки
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => updateForm('service', service.id)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      formData.service === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <div className="font-medium text-gray-900">{service.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Cargo */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Информация о грузе
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип груза
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {cargoTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateForm('cargoType', type.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.cargoType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание груза *
                  </label>
                  <textarea
                    value={formData.cargoDescription}
                    onChange={(e) => updateForm('cargoDescription', e.target.value)}
                    placeholder="Что вы отправляете?"
                    rows={3}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Вес (кг) *
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateForm('weight', e.target.value)}
                      placeholder="50"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Объём (м³)
                    </label>
                    <input
                      type="number"
                      value={formData.volume}
                      onChange={(e) => updateForm('volume', e.target.value)}
                      placeholder="0.5"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Кол-во мест
                    </label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => updateForm('quantity', e.target.value)}
                      placeholder="1"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Route */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Адреса доставки
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Откуда забрать груз *
                  </label>
                  <textarea
                    value={formData.pickupAddress}
                    onChange={(e) => updateForm('pickupAddress', e.target.value)}
                    placeholder="Город, адрес"
                    rows={2}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Куда доставить *
                  </label>
                  <textarea
                    value={formData.deliveryAddress}
                    onChange={(e) => updateForm('deliveryAddress', e.target.value)}
                    placeholder="Город, адрес во Вьетнаме"
                    rows={2}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Контактные данные
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Ваше имя"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Компания
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateForm('company', e.target.value)}
                      placeholder="Название компании"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Комментарий
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => updateForm('comment', e.target.value)}
                    placeholder="Дополнительная информация"
                    rows={3}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-gray-600 font-medium hover:text-gray-900"
              >
                ← Назад
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RequestPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <RequestForm />
    </Suspense>
  )
}
