'use client'

import { useState } from 'react'

const testimonials = [
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
  },
  {
    id: 4,
    name: 'Елена В.',
    location: 'Новосибирск',
    date: 'Сентябрь 2024',
    rating: 4,
    text: 'Полезный ресурс для тех, кто едет во Вьетнам впервые. Сравнение виз помогло выбрать оптимальный вариант.',
    avatar: '👩‍💼'
  },
  {
    id: 5,
    name: 'Игорь Л.',
    location: 'Екатеринбург',
    date: 'Август 2024',
    rating: 5,
    text: 'Чат-бот ответил на все мои вопросы мгновенно. Не пришлось ждать ответа от менеджера. Супер!',
    avatar: '👨‍💻'
  }
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const testimonial = testimonials[current]

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>💬</span> Отзывы клиентов
      </h3>

      <div className="relative">
        {/* Main testimonial */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 min-h-[200px]">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{testimonial.avatar}</span>
            <div>
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.date}</p>
            </div>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            ←
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current ? 'bg-green-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">4.9</div>
          <div className="text-sm text-gray-500">Средняя оценка</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">500+</div>
          <div className="text-sm text-gray-500">Отзывов</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">98%</div>
          <div className="text-sm text-gray-500">Довольных</div>
        </div>
      </div>
    </div>
  )
}
