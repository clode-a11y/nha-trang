'use client'

import { useState } from 'react'

// Demo data
const clients = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    company: '',
    ordersCount: 5,
    totalSpent: '$1,250',
    lastOrder: '20 января 2024',
    createdAt: '10 декабря 2023',
  },
  {
    id: '2',
    name: 'ООО "ТехноИмпорт"',
    email: 'info@technoimport.ru',
    phone: '+7 (495) 555-12-34',
    company: 'ООО "ТехноИмпорт"',
    ordersCount: 12,
    totalSpent: '$15,800',
    lastOrder: '20 января 2024',
    createdAt: '5 октября 2023',
  },
  {
    id: '3',
    name: 'Анна Сидорова',
    email: 'anna@example.com',
    phone: '+7 (916) 222-33-44',
    company: '',
    ordersCount: 3,
    totalSpent: '$420',
    lastOrder: '19 января 2024',
    createdAt: '1 января 2024',
  },
  {
    id: '4',
    name: 'Пётр Козлов',
    email: 'peter@example.com',
    phone: '+7 (903) 111-22-33',
    company: 'ИП Козлов',
    ordersCount: 8,
    totalSpent: '$3,200',
    lastOrder: '18 января 2024',
    createdAt: '15 ноября 2023',
  },
  {
    id: '5',
    name: 'Мария Новикова',
    email: 'maria@example.com',
    phone: '+7 (926) 444-55-66',
    company: '',
    ordersCount: 2,
    totalSpent: '$180',
    lastOrder: '10 января 2024',
    createdAt: '20 декабря 2023',
  },
]

export default function AdminClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Клиенты</h2>
        <div className="text-gray-500">Всего: {clients.length}</div>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Поиск по имени, email, телефону..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
        />
      </div>

      {/* Clients table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Клиент</th>
                <th className="text-left p-4 font-medium text-gray-600">Контакты</th>
                <th className="text-left p-4 font-medium text-gray-600">Заказов</th>
                <th className="text-left p-4 font-medium text-gray-600">Сумма</th>
                <th className="text-left p-4 font-medium text-gray-600">Последний заказ</th>
                <th className="text-left p-4 font-medium text-gray-600">Регистрация</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        {client.company && (
                          <div className="text-sm text-gray-500">{client.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {client.ordersCount}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{client.totalSpent}</td>
                  <td className="p-4 text-gray-500">{client.lastOrder}</td>
                  <td className="p-4 text-gray-500">{client.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Клиентов не найдено
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить поисковый запрос
          </p>
        </div>
      )}
    </div>
  )
}
