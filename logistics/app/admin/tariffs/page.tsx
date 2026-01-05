'use client'

import { useState } from 'react'

// Demo data
const tariffs = [
  {
    id: '1',
    service: 'Авиаперевозки',
    serviceIcon: '✈️',
    route: 'Россия → Вьетнам',
    pricePerKg: 12,
    minWeight: 1,
    maxWeight: 500,
    minPrice: 50,
    currency: 'USD',
    isActive: true,
  },
  {
    id: '2',
    service: 'Авиаперевозки',
    serviceIcon: '✈️',
    route: 'Китай → Вьетнам',
    pricePerKg: 8,
    minWeight: 1,
    maxWeight: 1000,
    minPrice: 30,
    currency: 'USD',
    isActive: true,
  },
  {
    id: '3',
    service: 'Морские перевозки',
    serviceIcon: '🚢',
    route: 'Россия → Вьетнам',
    pricePerKg: 2.5,
    minWeight: 100,
    maxWeight: null,
    minPrice: 200,
    currency: 'USD',
    isActive: true,
  },
  {
    id: '4',
    service: 'Морские перевозки',
    serviceIcon: '🚢',
    route: 'Китай → Вьетнам',
    pricePerKg: 1.5,
    minWeight: 100,
    maxWeight: null,
    minPrice: 150,
    currency: 'USD',
    isActive: true,
  },
  {
    id: '5',
    service: 'Ж/Д перевозки',
    serviceIcon: '🚂',
    route: 'Россия → Вьетнам',
    pricePerKg: 4,
    minWeight: 50,
    maxWeight: 5000,
    minPrice: 150,
    currency: 'USD',
    isActive: true,
  },
  {
    id: '6',
    service: 'Автоперевозки',
    serviceIcon: '🚛',
    route: 'Китай → Вьетнам',
    pricePerKg: 3,
    minWeight: 50,
    maxWeight: 2000,
    minPrice: 100,
    currency: 'USD',
    isActive: false,
  },
]

export default function AdminTariffsPage() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tariffList, setTariffList] = useState(tariffs)

  const toggleActive = (id: string) => {
    setTariffList(
      tariffList.map((t) =>
        t.id === id ? { ...t, isActive: !t.isActive } : t
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Тарифы</h2>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
          + Добавить тариф
        </button>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 text-blue-700 text-sm">
        Тарифы используются в калькуляторе для расчёта примерной стоимости доставки.
        Итоговая стоимость может отличаться в зависимости от характеристик груза.
      </div>

      {/* Tariffs table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Услуга</th>
                <th className="text-left p-4 font-medium text-gray-600">Маршрут</th>
                <th className="text-left p-4 font-medium text-gray-600">Цена/кг</th>
                <th className="text-left p-4 font-medium text-gray-600">Мин. вес</th>
                <th className="text-left p-4 font-medium text-gray-600">Макс. вес</th>
                <th className="text-left p-4 font-medium text-gray-600">Мин. цена</th>
                <th className="text-left p-4 font-medium text-gray-600">Статус</th>
                <th className="text-left p-4 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tariffList.map((tariff) => (
                <tr key={tariff.id} className={`hover:bg-gray-50 ${!tariff.isActive ? 'opacity-50' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tariff.serviceIcon}</span>
                      <span className="font-medium text-gray-900">{tariff.service}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{tariff.route}</td>
                  <td className="p-4 font-medium text-gray-900">
                    ${tariff.pricePerKg}
                  </td>
                  <td className="p-4 text-gray-600">{tariff.minWeight} кг</td>
                  <td className="p-4 text-gray-600">
                    {tariff.maxWeight ? `${tariff.maxWeight} кг` : '∞'}
                  </td>
                  <td className="p-4 text-gray-600">${tariff.minPrice}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(tariff.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tariff.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tariff.isActive ? 'Активен' : 'Неактивен'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        ✏️
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit form placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Добавить новый тариф
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Услуга
            </label>
            <select className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none">
              <option>Авиаперевозки</option>
              <option>Морские перевозки</option>
              <option>Ж/Д перевозки</option>
              <option>Автоперевозки</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Маршрут
            </label>
            <select className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none">
              <option>Россия → Вьетнам</option>
              <option>Китай → Вьетнам</option>
              <option>Европа → Вьетнам</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена за кг ($)
            </label>
            <input
              type="number"
              placeholder="10"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Мин. вес (кг)
            </label>
            <input
              type="number"
              placeholder="1"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Макс. вес (кг)
            </label>
            <input
              type="number"
              placeholder="Без ограничений"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Мин. цена ($)
            </label>
            <input
              type="number"
              placeholder="50"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
          Добавить тариф
        </button>
      </div>
    </div>
  )
}
