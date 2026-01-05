'use client'

import Link from 'next/link'

// Demo data
const stats = [
  { label: 'Новых заказов', value: '8', change: '+3 за неделю', icon: '📦', color: 'blue' },
  { label: 'В доставке', value: '24', change: '12 авиа, 12 море', icon: '🚚', color: 'yellow' },
  { label: 'Доставлено (месяц)', value: '156', change: '+12% к пред. месяцу', icon: '✅', color: 'green' },
  { label: 'Выручка (месяц)', value: '$45,200', change: '+8% к пред. месяцу', icon: '💰', color: 'purple' },
]

const recentOrders = [
  {
    id: '1',
    trackingNumber: 'VC2024008',
    client: 'Иван Петров',
    service: 'Авиаперевозки',
    status: 'new',
    statusText: 'Новый',
    date: 'Сегодня, 14:30',
  },
  {
    id: '2',
    trackingNumber: 'VC2024007',
    client: 'ООО "ТехноИмпорт"',
    service: 'Морские перевозки',
    status: 'new',
    statusText: 'Новый',
    date: 'Сегодня, 11:15',
  },
  {
    id: '3',
    trackingNumber: 'VC2024006',
    client: 'Анна Сидорова',
    service: 'Авиаперевозки',
    status: 'confirmed',
    statusText: 'Подтверждён',
    date: 'Вчера, 18:45',
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

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${colorClasses[stat.color]}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Быстрые действия
        </h2>
        <div className="grid sm:grid-cols-4 gap-4">
          <Link
            href="/admin/orders?status=new"
            className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl">📥</span>
            <span className="font-medium text-blue-700">Новые заказы</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <span className="font-medium text-green-700">Все заказы</span>
          </Link>
          <Link
            href="/admin/clients"
            className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <span className="text-2xl">👥</span>
            <span className="font-medium text-purple-700">Клиенты</span>
          </Link>
          <Link
            href="/admin/tariffs"
            className="flex items-center gap-3 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
          >
            <span className="text-2xl">💰</span>
            <span className="font-medium text-orange-700">Тарифы</span>
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
            href="/admin/orders"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Все заказы →
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
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
                  <div className="text-sm text-gray-500">
                    {order.client} • {order.service}
                  </div>
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

      {/* Charts placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Заказы по услугам
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            График будет добавлен
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Динамика выручки
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            График будет добавлен
          </div>
        </div>
      </div>
    </div>
  )
}
