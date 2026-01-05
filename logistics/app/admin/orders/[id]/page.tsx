'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Demo data
const orderData = {
  id: '1',
  trackingNumber: 'VC2024008',
  service: 'Авиаперевозки',
  serviceIcon: '✈️',
  status: 'new',
  route: {
    from: 'Москва, Россия',
    to: 'Хошимин, Вьетнам',
  },
  cargo: {
    type: 'Обычный груз',
    description: 'Электроника, запчасти для компьютеров',
    weight: '15',
    volume: '0.05',
    quantity: '2',
  },
  cost: {
    estimated: '180',
    final: '',
  },
  dates: {
    created: '20 января 2024, 14:30',
    estimated: '25 января 2024',
  },
  client: {
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    company: '',
  },
  addresses: {
    pickup: 'г. Москва, ул. Ленина, д. 15, офис 301',
    delivery: 'Ho Chi Minh City, District 1, Le Loi Street 45',
  },
  comment: 'Прошу упаковать максимально надёжно, хрупкий груз.',
  adminComment: '',
}

const statuses = [
  { id: 'new', name: 'Новый' },
  { id: 'confirmed', name: 'Подтверждён' },
  { id: 'in_transit', name: 'В пути' },
  { id: 'customs', name: 'На таможне' },
  { id: 'delivered', name: 'Доставлен' },
  { id: 'cancelled', name: 'Отменён' },
]

const statusColors: Record<string, string> = {
  new: 'bg-gray-100 text-gray-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-yellow-100 text-yellow-700',
  customs: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState(orderData)
  const [saving, setSaving] = useState(false)
  const [newEvent, setNewEvent] = useState({ status: '', location: '', description: '' })

  const handleStatusChange = (newStatus: string) => {
    setOrder({ ...order, status: newStatus })
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
    alert('Изменения сохранены')
  }

  const handleAddEvent = async () => {
    if (!newEvent.status || !newEvent.description) {
      alert('Заполните статус и описание')
      return
    }
    // In real app, send to API
    alert('Событие добавлено')
    setNewEvent({ status: '', location: '', description: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/orders"
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
                {statuses.find((s) => s.id === order.status)?.name}
              </span>
            </div>
            <div className="text-gray-600">{order.service}</div>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status management */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Статус заказа</h2>
          <div className="grid grid-cols-2 gap-2">
            {statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => handleStatusChange(status.id)}
                className={`p-3 rounded-xl text-sm font-medium transition-colors ${
                  order.status === status.id
                    ? statusColors[status.id]
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cost management */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Стоимость</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Расчётная стоимость ($)
              </label>
              <input
                type="text"
                value={order.cost.estimated}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    cost: { ...order.cost, estimated: e.target.value },
                  })
                }
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Итоговая стоимость ($)
              </label>
              <input
                type="text"
                value={order.cost.final}
                onChange={(e) =>
                  setOrder({
                    ...order,
                    cost: { ...order.cost, final: e.target.value },
                  })
                }
                placeholder="После доставки"
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Клиент</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Имя</span>
              <span className="font-medium text-gray-900">{order.client.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <a href={`mailto:${order.client.email}`} className="font-medium text-blue-600">
                {order.client.email}
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Телефон</span>
              <a href={`tel:${order.client.phone}`} className="font-medium text-blue-600">
                {order.client.phone}
              </a>
            </div>
            {order.client.company && (
              <div className="flex justify-between">
                <span className="text-gray-500">Компания</span>
                <span className="font-medium text-gray-900">{order.client.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cargo info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Груз</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Тип</span>
              <span className="font-medium text-gray-900">{order.cargo.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Описание</span>
              <span className="font-medium text-gray-900 text-right max-w-[200px]">
                {order.cargo.description}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Вес</span>
              <span className="font-medium text-gray-900">{order.cargo.weight} кг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Объём</span>
              <span className="font-medium text-gray-900">{order.cargo.volume} м³</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Кол-во мест</span>
              <span className="font-medium text-gray-900">{order.cargo.quantity}</span>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Адреса</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Откуда</div>
              <div className="font-medium text-gray-900">{order.addresses.pickup}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Куда</div>
              <div className="font-medium text-gray-900">{order.addresses.delivery}</div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Комментарии</h2>
          <div className="space-y-4">
            {order.comment && (
              <div>
                <div className="text-sm text-gray-500 mb-1">От клиента</div>
                <div className="p-3 bg-gray-50 rounded-xl text-gray-700">{order.comment}</div>
              </div>
            )}
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Комментарий администратора
              </label>
              <textarea
                value={order.adminComment}
                onChange={(e) => setOrder({ ...order, adminComment: e.target.value })}
                placeholder="Внутренние заметки по заказу..."
                rows={3}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add tracking event */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Добавить событие трекинга
        </h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            >
              <option value="">Выберите...</option>
              <option value="received">Принят</option>
              <option value="processing">Обработка</option>
              <option value="shipped">Отправлен</option>
              <option value="in_transit">В пути</option>
              <option value="customs">Таможня</option>
              <option value="out_for_delivery">Доставка</option>
              <option value="delivered">Доставлен</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Локация
            </label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="Город, страна"
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Что произошло..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddEvent}
              className="w-full p-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
