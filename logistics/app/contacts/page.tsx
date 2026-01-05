'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="bg-[#1B3B6F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Контакты
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Свяжитесь с нами по любым вопросам или для получения поддержки
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B3B6F] mb-8">Связаться с нами</h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                  <div className="w-12 h-12 bg-[#1B3B6F] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B3B6F]">Адрес</h3>
                    <p className="text-gray-600">Нячанг, Вьетнам</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                  <div className="w-12 h-12 bg-[#1B3B6F] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B3B6F]">Телефон</h3>
                    <a href="tel:+84xxxxxxxxx" className="text-[#E5A835] hover:underline">
                      +84 xxx xxx xxx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                  <div className="w-12 h-12 bg-[#1B3B6F] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B3B6F]">Email</h3>
                    <a href="mailto:contact@example.com" className="text-[#E5A835] hover:underline">
                      contact@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 hover:border-[#E5A835] transition-colors">
                  <div className="w-12 h-12 bg-[#1B3B6F] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B3B6F]">Режим работы</h3>
                    <p className="text-gray-600">Пн - Сб: 8:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#f5f7fa] h-64 flex items-center justify-center border border-gray-200">
                <span className="text-gray-400">Карта (Google Maps)</span>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#1B3B6F] mb-6">
                Отправить сообщение
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200">
                  Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1B3B6F] uppercase tracking-wide mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full p-4 border-2 border-gray-200 focus:border-[#1B3B6F] outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 btn-primary disabled:opacity-50"
                >
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E5A835]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B3B6F] mb-4">
            Нужна срочная помощь?
          </h2>
          <p className="text-[#1B3B6F]/80 text-lg mb-8">
            Наша команда готова помочь с вашими логистическими задачами
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+84xxxxxxxxx" className="btn-secondary">
              Позвонить
            </a>
            <Link href="/request" className="bg-white text-[#1B3B6F] px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors">
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
