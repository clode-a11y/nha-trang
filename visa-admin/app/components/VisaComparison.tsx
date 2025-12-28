'use client'

import { useState } from 'react'

const visaTypes = [
  {
    type: 'Безвизовый',
    duration: 'до 45 дней',
    price: 'Бесплатно',
    processing: 'Мгновенно',
    entry: 'Однократный',
    extension: 'Нет',
    documents: 'Паспорт',
    recommended: true
  },
  {
    type: 'E-Visa',
    duration: 'до 90 дней',
    price: '$25',
    processing: '3-5 дней',
    entry: 'Однократный',
    extension: 'Да',
    documents: 'Паспорт, фото, анкета',
    recommended: false
  },
  {
    type: 'VOA',
    duration: 'до 30 дней',
    price: '$25-50',
    processing: '2-3 дня',
    entry: 'Одно/Мульти',
    extension: 'Да',
    documents: 'Паспорт, письмо, фото',
    recommended: false
  },
  {
    type: 'Консульская',
    duration: 'до 3 мес.',
    price: 'от $50',
    processing: '5-10 дней',
    entry: 'Мультивъезд',
    extension: 'Да',
    documents: 'Полный пакет',
    recommended: false
  }
]

const criteria = [
  { key: 'duration', label: 'Срок пребывания' },
  { key: 'price', label: 'Стоимость' },
  { key: 'processing', label: 'Оформление' },
  { key: 'entry', label: 'Въезд' },
  { key: 'extension', label: 'Продление' },
  { key: 'documents', label: 'Документы' }
]

export function VisaComparison() {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 overflow-hidden">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>📊</span> Сравнение типов виз
      </h3>

      <div className="overflow-x-auto -mx-8 px-8">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-3 text-gray-500 font-medium">Критерий</th>
              {visaTypes.map(visa => (
                <th
                  key={visa.type}
                  className={`p-3 text-center cursor-pointer transition-all ${
                    highlighted === visa.type
                      ? 'bg-gradient-to-b from-green-100 to-transparent'
                      : ''
                  } ${visa.recommended ? 'relative' : ''}`}
                  onMouseEnter={() => setHighlighted(visa.type)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  <div className={`font-bold ${visa.recommended ? 'text-green-600' : 'text-gray-900'}`}>
                    {visa.type}
                  </div>
                  {visa.recommended && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Рекомендуем
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, idx) => (
              <tr key={c.key} className={idx % 2 === 0 ? 'bg-gray-50/50' : ''}>
                <td className="p-3 text-gray-600 font-medium">{c.label}</td>
                {visaTypes.map(visa => (
                  <td
                    key={visa.type}
                    className={`p-3 text-center transition-all ${
                      highlighted === visa.type
                        ? 'bg-green-50'
                        : ''
                    }`}
                  >
                    <span className={`${
                      c.key === 'price' && visa.price === 'Бесплатно'
                        ? 'text-green-600 font-bold'
                        : 'text-gray-700'
                    }`}>
                      {visa[c.key as keyof typeof visa]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-500">Подходит для:</span>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Туризм до 45 дней = Безвизовый</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Долгий отдых = E-Visa</span>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Бизнес = Консульская</span>
      </div>
    </div>
  )
}
