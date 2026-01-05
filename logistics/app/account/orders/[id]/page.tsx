'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

// Demo data
const orderData = {
  id: '1',
  trackingNumber: 'VC2024001',
  service: 'Авиаперевозки',
  serviceIcon: '✈️',
  status: 'in_transit',
  statusText: 'В пути',
  route: {
    from: 'Москва, Россия',
    to: 'Хошимин, Вьетнам',
  },
  cargo: {
    type: 'Обычный груз',
    description: 'Электроника, бытовая техника',
    weight: '15 кг',
    volume: '0.05 м³',
    quantity: '2 места',
  },
  cost: {
    estimated: '$180',
    final: null,
  },
  dates: {
    created: '15 января 2024',
    estimated: '20 января 2024',
    delivered: null,
  },
  client: {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
  },
  events: [
    {
      status: 'В пути',
      location: 'Дубай, ОАЭ',
      description: 'Груз в транзитном аэропорту',
      timestamp: '18 января 2024, 14:30',
    },
    {
      status: 'Вылетел',
      location: 'Москва, Россия',
      description: 'Груз отправлен авиарейсом',
      timestamp: '17 января 2024, 08:15',
    },
    {
      status: 'Принят',
      location: 'Москва, Россия',
      description: 'Груз принят на склад',
      timestamp: '16 января 2024, 10:00',
    },
    {
      status: 'Заявка создана',
      location: '',
      description: 'Заявка оформлена в системе',
      timestamp: '15 января 2024, 15:22',
    },
  ],
}

const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-yellow-100 text-yellow-700',
  customs: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function OrderDetailPage() {
  const params = useParams()
  const order = orderData // In real app, fetch by params.id

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/account/orders"
          className="text-gray-500 hover:text-gray-700"
        >
          ← Назад к заказам
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
            {order.serviceIcon}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {order.trackingNumber}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[order.status]
                }`}
              >
                {order.statusText}
              </span>
            </div>
            <div className="text-gray-600">{order.service}</div>
          </div>
        </div>
        <Link
          href={`/tracking?number=${order.trackingNumber}`}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-center"
        >
          Отследить груз
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Route */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Маршрут</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-500">Откуда</div>
              <div className="font-medium text-gray-900">{order.route.from}</div>
            </div>
            <div className="text-2xl text-gray-300">→</div>
            <div className="flex-1">
              <div className="text-sm text-gray-500">Куда</div>
              <div className="font-medium text-gray-900">{order.route.to}</div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Сроки</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Создан</div>
              <div className="font-medium text-gray-900">{order.dates.created}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ожидаемая доставка</div>
              <div className="font-medium text-gray-900">{order.dates.estimated}</div>
            </div>
          </div>
        </div>

        {/* Cargo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Информация о грузе</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Тип груза</span>
              <span className="font-medium text-gray-900">{order.cargo.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Описание</span>
              <span className="font-medium text-gray-900">{order.cargo.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Вес</span>
              <span className="font-medium text-gray-900">{order.cargo.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Объём</span>
              <span className="font-medium text-gray-900">{order.cargo.volume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Количество мест</span>
              <span className="font-medium text-gray-900">{order.cargo.quantity}</span>
            </div>
          </div>
        </div>

        {/* Cost */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Стоимость</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Расчётная стоимость</span>
              <span className="font-medium text-gray-900">{order.cost.estimated}</span>
            </div>
            {order.cost.final && (
              <div className="flex justify-between">
                <span className="text-gray-500">Итоговая стоимость</span>
                <span className="font-bold text-gray-900">{order.cost.final}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">История статусов</h2>
        <div className="space-y-6">
          {order.events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full ${
                    index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
                {index < order.events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 my-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{event.status}</span>
                  {event.location && (
                    <span className="text-sm text-gray-500">• {event.location}</span>
                  )}
                </div>
                <div className="text-gray-600">{event.description}</div>
                <div className="text-sm text-gray-400 mt-1">{event.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Документы</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            + Загрузить документ
          </button>
        </div>
        <div className="text-center py-8 text-gray-500">
          Документы пока не загружены
        </div>
      </div>
    </div>
  )
}
