'use client'

import { useState } from 'react'

// Demo data
const routes = [
  {
    id: '1',
    fromCountry: 'Россия',
    fromCity: 'Москва',
    toCountry: 'Вьетнам',
    toCity: 'Хошимин',
    transitTime: 5,
    isActive: true,
  },
  {
    id: '2',
    fromCountry: 'Россия',
    fromCity: 'Санкт-Петербург',
    toCountry: 'Вьетнам',
    toCity: 'Дананг',
    transitTime: 7,
    isActive: true,
  },
  {
    id: '3',
    fromCountry: 'Россия',
    fromCity: 'Владивосток',
    toCountry: 'Вьетнам',
    toCity: 'Хайфон',
    transitTime: 12,
    isActive: true,
  },
  {
    id: '4',
    fromCountry: 'Китай',
    fromCity: 'Шанхай',
    toCountry: 'Вьетнам',
    toCity: 'Хошимин',
    transitTime: 5,
    isActive: true,
  },
  {
    id: '5',
    fromCountry: 'Китай',
    fromCity: 'Гуанчжоу',
    toCountry: 'Вьетнам',
    toCity: 'Ханой',
    transitTime: 3,
    isActive: true,
  },
  {
    id: '6',
    fromCountry: 'Россия',
    fromCity: 'Новосибирск',
    toCountry: 'Вьетнам',
    toCity: 'Ханой',
    transitTime: 18,
    isActive: false,
  },
]

export default function AdminRoutesPage() {
  const [routeList, setRouteList] = useState(routes)
  const [newRoute, setNewRoute] = useState({
    fromCountry: '',
    fromCity: '',
    toCountry: 'Вьетнам',
    toCity: '',
    transitTime: '',
  })

  const toggleActive = (id: string) => {
    setRouteList(
      routeList.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      )
    )
  }

  const handleAddRoute = () => {
    if (!newRoute.fromCountry || !newRoute.toCity || !newRoute.transitTime) {
      alert('Заполните все обязательные поля')
      return
    }
    // In real app, send to API
    alert('Маршрут добавлен')
    setNewRoute({
      fromCountry: '',
      fromCity: '',
      toCountry: 'Вьетнам',
      toCity: '',
      transitTime: '',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Маршруты</h2>
        <div className="text-gray-500">Всего: {routeList.length}</div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 text-blue-700 text-sm">
        Маршруты определяют доступные направления доставки и время в пути.
        Тарифы привязываются к маршрутам.
      </div>

      {/* Routes table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Откуда</th>
                <th className="text-left p-4 font-medium text-gray-600">Куда</th>
                <th className="text-left p-4 font-medium text-gray-600">Время в пути</th>
                <th className="text-left p-4 font-medium text-gray-600">Статус</th>
                <th className="text-left p-4 font-medium text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {routeList.map((route) => (
                <tr key={route.id} className={`hover:bg-gray-50 ${!route.isActive ? 'opacity-50' : ''}`}>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{route.fromCountry}</div>
                    {route.fromCity && (
                      <div className="text-sm text-gray-500">{route.fromCity}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{route.toCountry}</div>
                    {route.toCity && (
                      <div className="text-sm text-gray-500">{route.toCity}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {route.transitTime} дней
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleActive(route.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        route.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {route.isActive ? 'Активен' : 'Неактивен'}
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

      {/* Add form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Добавить маршрут
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Страна отправления *
            </label>
            <select
              value={newRoute.fromCountry}
              onChange={(e) => setNewRoute({ ...newRoute, fromCountry: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="">Выберите...</option>
              <option value="Россия">Россия</option>
              <option value="Китай">Китай</option>
              <option value="Казахстан">Казахстан</option>
              <option value="Беларусь">Беларусь</option>
              <option value="Европа">Европа</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Город отправления
            </label>
            <input
              type="text"
              value={newRoute.fromCity}
              onChange={(e) => setNewRoute({ ...newRoute, fromCity: e.target.value })}
              placeholder="Москва"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Страна назначения
            </label>
            <input
              type="text"
              value={newRoute.toCountry}
              disabled
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Город назначения *
            </label>
            <select
              value={newRoute.toCity}
              onChange={(e) => setNewRoute({ ...newRoute, toCity: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="">Выберите...</option>
              <option value="Хошимин">Хошимин</option>
              <option value="Ханой">Ханой</option>
              <option value="Дананг">Дананг</option>
              <option value="Хайфон">Хайфон</option>
              <option value="Нячанг">Нячанг</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Время (дней) *
            </label>
            <input
              type="number"
              value={newRoute.transitTime}
              onChange={(e) => setNewRoute({ ...newRoute, transitTime: e.target.value })}
              placeholder="7"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
        </div>
        <button
          onClick={handleAddRoute}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          Добавить маршрут
        </button>
      </div>
    </div>
  )
}
