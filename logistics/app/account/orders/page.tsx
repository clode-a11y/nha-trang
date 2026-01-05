'use client'

import { useState } from 'react'
import Link from 'next/link'

// Demo data
const orders = [
  {
    id: '1',
    trackingNumber: 'VC2024001',
    service: 'Авиаперевозки',
    route: 'Москва → Хошимин',
    status: 'in_transit',
    statusText: 'В пути',
    weight: '15 кг',
    cost: '$180',
    createdAt: '15 января 2024',
    estimatedDelivery: '20 января 2024',
  },
  {
    id: '2',
    trackingNumber: 'VC2024002',
    service: 'Морские перевозки',
    route: 'Владивосток → Хайфон',
    status: 'customs',
    statusText: 'На таможне',
    weight: '500 кг',
    cost: '$850',
    createdAt: '10 января 2024',
    estimatedDelivery: '25 января 2024',
  },
  {
    id: '3',
    trackingNumber: 'VC2023050',
    service: 'Авиаперевозки',
    route: 'Санкт-Петербург → Дананг',
    status: 'delivered',
    statusText: 'Доставлен',
    weight: '8 кг',
    cost: '$95',
    createdAt: '20 декабря 2023',
    estimatedDelivery: '27 декабря 2023',
  },
  {
    id: '4',
    trackingNumber: 'VC2023045',
    service: 'Ж/Д перевозки',
    route: 'Новосибирск → Ханой',
    status: 'delivered',
    statusText: 'Доставлен',
    weight: '200 кг',
    cost: '$450',
    createdAt: '5 декабря 2023',
    estimatedDelivery: '25 декабря 2023',
  },
]

const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-yellow-100 text-yellow-700',
  customs: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const filters = [
  { id: 'all', name: 'Все' },
  { id: 'active', name: 'Активные' },
  { id: 'delivered', name: 'Доставленные' },
]

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'active') return order.status !== 'delivered'
    if (activeFilter === 'delivered') return order.status === 'delivered'
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Мои заказы</h2>
        <Link
          href="/request"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          + Новая заявка
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  📦
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900 text-lg">
                      {order.trackingNumber}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.statusText}
                    </span>
                  </div>
                  <div className="text-gray-600">{order.service}</div>
                  <div className="text-sm text-gray-500">{order.route}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <div className="text-gray-500">Вес</div>
                  <div className="font-medium text-gray-900">{order.weight}</div>
                </div>
                <div>
                  <div className="text-gray-500">Стоимость</div>
                  <div className="font-medium text-gray-900">{order.cost}</div>
                </div>
                <div>
                  <div className="text-gray-500">Создан</div>
                  <div className="font-medium text-gray-900">{order.createdAt}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Заказов не найдено
          </h3>
          <p className="text-gray-600 mb-6">
            У вас пока нет заказов в этой категории
          </p>
          <Link
            href="/request"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Создать заявку
          </Link>
        </div>
      )}
    </div>
  )
}
