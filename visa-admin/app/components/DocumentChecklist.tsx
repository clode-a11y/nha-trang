'use client'

import { useState } from 'react'

const documents = [
  {
    id: 1,
    name: 'Загранпаспорт',
    description: 'Срок действия минимум 6 месяцев с даты въезда',
    required: true
  },
  {
    id: 2,
    name: 'Фото 4x6 см',
    description: 'На белом фоне, без очков, сделанное недавно',
    required: true
  },
  {
    id: 3,
    name: 'Обратный билет',
    description: 'Или билет в третью страну (для безвизового въезда)',
    required: true
  },
  {
    id: 4,
    name: 'Бронь отеля',
    description: 'Подтверждение проживания на весь срок пребывания',
    required: false
  },
  {
    id: 5,
    name: 'Медицинская страховка',
    description: 'Рекомендуется с покрытием от $30,000',
    required: false
  },
  {
    id: 6,
    name: 'Финансовые гарантии',
    description: 'Выписка с банковского счёта или наличные',
    required: false
  }
]

export function DocumentChecklist() {
  const [checked, setChecked] = useState<number[]>([])

  const toggle = (id: number) => {
    setChecked(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  const requiredDocs = documents.filter(d => d.required)
  const optionalDocs = documents.filter(d => !d.required)
  const requiredChecked = requiredDocs.filter(d => checked.includes(d.id)).length
  const progress = Math.round((requiredChecked / requiredDocs.length) * 100)

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span>📋</span> Чек-лист документов
      </h3>
      <p className="text-gray-500 mb-6">Отметьте документы, которые у вас уже есть</p>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Обязательные документы</span>
          <span className="font-bold text-green-600">{requiredChecked}/{requiredDocs.length}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Required documents */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-red-500">*</span> Обязательные
        </h4>
        {requiredDocs.map(doc => (
          <label
            key={doc.id}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.includes(doc.id)
                ? 'bg-green-50 border-2 border-green-300'
                : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checked.includes(doc.id)}
              onChange={() => toggle(doc.id)}
              className="w-5 h-5 mt-0.5 accent-green-500"
            />
            <div>
              <div className={`font-medium ${checked.includes(doc.id) ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                {doc.name}
              </div>
              <div className="text-sm text-gray-500">{doc.description}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Optional documents */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700">Рекомендуемые</h4>
        {optionalDocs.map(doc => (
          <label
            key={doc.id}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.includes(doc.id)
                ? 'bg-blue-50 border-2 border-blue-300'
                : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={checked.includes(doc.id)}
              onChange={() => toggle(doc.id)}
              className="w-5 h-5 mt-0.5 accent-blue-500"
            />
            <div>
              <div className={`font-medium ${checked.includes(doc.id) ? 'text-blue-700 line-through' : 'text-gray-900'}`}>
                {doc.name}
              </div>
              <div className="text-sm text-gray-500">{doc.description}</div>
            </div>
          </label>
        ))}
      </div>

      {progress === 100 && (
        <div className="mt-6 p-4 bg-green-100 rounded-xl text-center">
          <span className="text-2xl">🎉</span>
          <p className="font-bold text-green-700 mt-2">Все обязательные документы готовы!</p>
        </div>
      )}
    </div>
  )
}
