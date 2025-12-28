'use client'

import { useState } from 'react'

export function VisaCalculator() {
  const [days, setDays] = useState(30)
  const [result, setResult] = useState<{
    type: string
    description: string
    price: string
    color: string
  } | null>(null)

  const calculate = () => {
    if (days <= 45) {
      setResult({
        type: 'Безвизовый въезд',
        description: 'Вам не нужна виза! Граждане РФ могут находиться во Вьетнаме до 45 дней без визы.',
        price: 'Бесплатно',
        color: 'green'
      })
    } else if (days <= 90) {
      setResult({
        type: 'E-Visa',
        description: 'Рекомендуем оформить электронную визу на официальном сайте immigration.gov.vn',
        price: '$25',
        color: 'blue'
      })
    } else {
      setResult({
        type: 'Долгосрочная виза',
        description: 'Для пребывания более 90 дней требуется оформление визы через посольство или визовый центр.',
        price: 'от $50',
        color: 'orange'
      })
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>🧮</span> Калькулятор визы
      </h3>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          На сколько дней вы планируете поездку?
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="180"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold min-w-[80px] text-center">
            {days} дн.
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-gradient-to-r from-green-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition shadow-lg"
      >
        Рассчитать
      </button>

      {result && (
        <div className={`mt-6 p-4 rounded-xl ${
          result.color === 'green' ? 'bg-green-50 border-green-200' :
          result.color === 'blue' ? 'bg-blue-50 border-blue-200' :
          'bg-orange-50 border-orange-200'
        } border-2`}>
          <div className="flex justify-between items-start mb-2">
            <h4 className={`font-bold text-lg ${
              result.color === 'green' ? 'text-green-700' :
              result.color === 'blue' ? 'text-blue-700' :
              'text-orange-700'
            }`}>
              {result.type}
            </h4>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              result.color === 'green' ? 'bg-green-100 text-green-700' :
              result.color === 'blue' ? 'bg-blue-100 text-blue-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {result.price}
            </span>
          </div>
          <p className="text-gray-600">{result.description}</p>
        </div>
      )}
    </div>
  )
}
