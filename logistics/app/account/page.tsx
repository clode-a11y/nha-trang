'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

// Demo data
const recentOrders = [
  {
    id: '1',
    trackingNumber: 'VC2024001',
    service: 'Авиаперевозки',
    status: 'in_transit',
    statusText: 'В пути',
    date: '2024-01-15',
  },
  {
    id: '2',
    trackingNumber: 'VC2024002',
    service: 'Морские перевозки',
    status: 'customs',
    statusText: 'На таможне',
    date: '2024-01-10',
  },
]

const stats = [
  { label: 'Всего заказов', value: '12', icon: '📦' },
  { label: 'В доставке', value: '2', icon: '🚚' },
  { label: 'Доставлено', value: '10', icon: '✅' },
  { label: 'Документов', value: '8', icon: '📄' },
]

const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-yellow-100 text-yellow-700',
  customs: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AccountDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Быстрые действия
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/request"
            className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl">📝</span>
            <span className="font-medium text-blue-700">Новая заявка</span>
          </Link>
          <Link
            href="/tracking"
            className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl">🔍</span>
            <span className="font-medium text-green-700">Отследить груз</span>
          </Link>
          <Link
            href="/calculator"
            className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            <span className="text-2xl">🧮</span>
            <span className="font-medium text-orange-700">Калькулятор</span>
          </Link>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Последние заказы
          </h2>
          <Link
            href="/account/orders"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Все заказы →
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                  📦
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {order.trackingNumber}
                  </div>
                  <div className="text-sm text-gray-500">{order.service}</div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.statusText}
                </span>
                <div className="text-sm text-gray-500 mt-1">{order.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Profile summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Данные профиля
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Имя</div>
            <div className="font-medium text-gray-900">
              {session?.user?.name || 'Не указано'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium text-gray-900">
              {session?.user?.email}
            </div>
          </div>
        </div>
        <Link
          href="/account/settings"
          className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
        >
          Редактировать профиль →
        </Link>
      </div>
    </div>
  )
}
