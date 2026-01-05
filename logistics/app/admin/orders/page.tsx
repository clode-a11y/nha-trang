'use client'

import { useState } from 'react'
import Link from 'next/link'

// Demo data
const orders = [
  {
    id: '1',
    trackingNumber: 'VC2024008',
    client: 'Иван Петров',
    email: 'ivan@example.com',
    service: 'Авиаперевозки',
    route: 'Москва → Хошимин',
    status: 'new',
    statusText: 'Новый',
    weight: '15 кг',
    cost: '$180',
    createdAt: '20 января 2024',
  },
  {
    id: '2',
    trackingNumber: 'VC2024007',
    client: 'ООО "ТехноИмпорт"',
    email: 'info@technoimport.ru',
    service: 'Морские перевозки',
    route: 'Владивосток → Хайфон',
    status: 'new',
    statusText: 'Новый',
    weight: '2500 кг',
    cost: '$3,200',
    createdAt: '20 января 2024',
  },
  {
    id: '3',
    trackingNumber: 'VC2024006',
    client: 'Анна Сидорова',
    email: 'anna@example.com',
    service: 'Авиаперевозки',
    route: 'СПб → Дананг',
    status: 'confirmed',
    statusText: 'Подтверждён',
    weight: '8 кг',
    cost: '$95',
    createdAt: '19 января 2024',
  },
  {
    id: '4',
    trackingNumber: 'VC2024005',
    client: 'Пётр Козлов',
    email: 'peter@example.com',
    service: 'Ж/Д перевозки',
    route: 'Новосибирск → Ханой',
    status: 'in_transit',
    statusText: 'В пути',
    weight: '200 кг',
    cost: '$650',
    createdAt: '18 января 2024',
  },
  {
    id: '5',
    trackingNumber: 'VC2024004',
    client: 'ИП Морозов',
    email: 'morozov@example.com',
    service: 'Авиаперевозки',
    route: 'Москва → Хошимин',
    status: 'customs',
    statusText: 'На таможне',
    weight: '45 кг',
    cost: '$520',
    createdAt: '15 января 2024',
  },
  {
    id: '6',
    trackingNumber: 'VC2024003',
    client: 'Мария Новикова',
    email: 'maria@example.com',
    service: 'Авиаперевозки',
    route: 'Москва → Нячанг',
    status: 'delivered',
    statusText: 'Доставлен',
    weight: '5 кг',
    cost: '$65',
    createdAt: '10 января 2024',
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
  { id: 'all', name: 'Все', count: 6 },
  { id: 'new', name: 'Новые', count: 2 },
  { id: 'in_transit', name: 'В пути', count: 1 },
  { id: 'customs', name: 'Таможня', count: 1 },
  { id: 'delivered', name: 'Доставлено', count: 1 },
]

export default function AdminOrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter
    const matchesSearch =
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Заказы</h2>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по номеру, клиенту, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
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
            {filter.name} ({filter.count})
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Заказ</th>
                <th className="text-left p-4 font-medium text-gray-600">Клиент</th>
                <th className="text-left p-4 font-medium text-gray-600">Услуга</th>
                <th className="text-left p-4 font-medium text-gray-600">Маршрут</th>
                <th className="text-left p-4 font-medium text-gray-600">Вес</th>
                <th className="text-left p-4 font-medium text-gray-600">Стоимость</th>
                <th className="text-left p-4 font-medium text-gray-600">Статус</th>
                <th className="text-left p-4 font-medium text-gray-600">Дата</th>
                <th className="text-left p-4 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {order.trackingNumber}
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{order.client}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="p-4 text-gray-600">{order.service}</td>
                  <td className="p-4 text-gray-600">{order.route}</td>
                  <td className="p-4 text-gray-600">{order.weight}</td>
                  <td className="p-4 font-medium text-gray-900">{order.cost}</td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.statusText}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{order.createdAt}</td>
                  <td className="p-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Заказов не найдено
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
        </div>
      )}
    </div>
  )
}
