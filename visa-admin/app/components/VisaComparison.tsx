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
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-4 md:p-8 shadow-xl border border-white/50 dark:border-gray-700 overflow-hidden">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span>📊</span> Сравнение типов виз
      </h3>

      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left p-2 md:p-3 text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">Критерий</th>
              {visaTypes.map(visa => (
                <th
                  key={visa.type}
                  className={`p-2 md:p-3 text-center cursor-pointer transition-all ${
                    highlighted === visa.type
                      ? 'bg-gradient-to-b from-green-100 dark:from-green-900/30 to-transparent'
                      : ''
                  } ${visa.recommended ? 'relative' : ''}`}
                  onMouseEnter={() => setHighlighted(visa.type)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  <div className={`font-bold text-sm md:text-base ${visa.recommended ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                    {visa.type}
                  </div>
                  {visa.recommended && (
                    <span className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap">
                      Рекомендуем
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((c, idx) => (
              <tr key={c.key} className={idx % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-700/30' : ''}>
                <td className="p-2 md:p-3 text-gray-600 dark:text-gray-400 font-medium text-sm md:text-base">{c.label}</td>
                {visaTypes.map(visa => (
                  <td
                    key={visa.type}
                    className={`p-2 md:p-3 text-center transition-all text-sm md:text-base ${
                      highlighted === visa.type
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : ''
                    }`}
                  >
                    <span className={`${
                      c.key === 'price' && visa.price === 'Бесплатно'
                        ? 'text-green-600 dark:text-green-400 font-bold'
                        : 'text-gray-700 dark:text-gray-300'
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
        <span className="text-sm text-gray-500 dark:text-gray-400">Подходит для:</span>
        <span className="px-2 md:px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs md:text-sm">Туризм до 45 дней = Безвизовый</span>
        <span className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs md:text-sm">Долгий отдых = E-Visa</span>
        <span className="px-2 md:px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-xs md:text-sm">Бизнес = Консульская</span>
      </div>
    </div>
  )
}
