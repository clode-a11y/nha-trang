'use client'

import { useState } from 'react'
import { useTranslation } from './TranslationProvider'

export function Testimonials() {
  const { t, locale } = useTranslation()
  const [current, setCurrent] = useState(0)

  const testimonials = locale === 'ru' ? [
    {
      id: 1,
      name: 'Алексей К.',
      location: 'Москва',
      date: 'Декабрь 2024',
      rating: 5,
      text: 'Отличный сайт! Благодаря калькулятору сразу понял, что мне виза не нужна. Сэкономил время и нервы. Спасибо!',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Мария С.',
      location: 'Санкт-Петербург',
      date: 'Ноябрь 2024',
      rating: 5,
      text: 'Оформила E-Visa по инструкции с сайта за 20 минут. Всё чётко и понятно описано. Виза пришла через 3 дня.',
      avatar: '👩‍🦰'
    },
    {
      id: 3,
      name: 'Дмитрий П.',
      location: 'Казань',
      date: 'Октябрь 2024',
      rating: 5,
      text: 'Чек-лист документов очень помог собраться перед поездкой. Ничего не забыл, на границе прошёл за 5 минут.',
      avatar: '👨‍🔧'
    }
  ] : locale === 'vi' ? [
    {
      id: 1,
      name: 'Nguyễn V.',
      location: 'TP.HCM',
      date: 'Tháng 12 2024',
      rating: 5,
      text: 'Trang web tuyệt vời! Máy tính thị thực giúp tôi hiểu ngay tôi cần gì. Tiết kiệm thời gian!',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Trần L.',
      location: 'Hà Nội',
      date: 'Tháng 11 2024',
      rating: 5,
      text: 'Hướng dẫn chi tiết và dễ hiểu. Tôi đã xin E-Visa trong 20 phút!',
      avatar: '👩‍🦰'
    },
    {
      id: 3,
      name: 'Lê H.',
      location: 'Đà Nẵng',
      date: 'Tháng 10 2024',
      rating: 5,
      text: 'Danh sách kiểm tra tài liệu rất hữu ích. Qua biên giới chỉ trong 5 phút.',
      avatar: '👨‍🔧'
    }
  ] : [
    {
      id: 1,
      name: 'Alex K.',
      location: 'New York',
      date: 'December 2024',
      rating: 5,
      text: 'Great website! The calculator helped me understand I don\'t need a visa. Saved time and stress!',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Maria S.',
      location: 'London',
      date: 'November 2024',
      rating: 5,
      text: 'Applied for E-Visa following the guide in 20 minutes. Everything was clear. Visa came in 3 days.',
      avatar: '👩‍🦰'
    },
    {
      id: 3,
      name: 'James P.',
      location: 'Sydney',
      date: 'October 2024',
      rating: 5,
      text: 'The document checklist was super helpful. Got through border in 5 minutes.',
      avatar: '👨‍🔧'
    }
  ]

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const testimonial = testimonials[current]

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>💬</span> {t('testimonials.title')}
      </h3>

      <div className="relative">
        {/* Main testimonial */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 min-h-[180px] sm:min-h-[200px]">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <span className="text-3xl sm:text-4xl">{testimonial.avatar}</span>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location} • {testimonial.date}</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition flex items-center justify-center text-gray-700 dark:text-gray-300"
          >
            ←
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current ? 'bg-green-500 w-6' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition flex items-center justify-center text-gray-700 dark:text-gray-300"
          >
            →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t dark:border-gray-700 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">4.9</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('testimonials.avgRating')}</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">500+</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('testimonials.reviews')}</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t('testimonials.satisfied')}</div>
        </div>
      </div>
    </div>
  )
}
