'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalVisas: number
  totalFaqs: number
  totalPosts: number
  totalSubscribers: number
  totalMessages: number
  todayViews: number
  weekViews: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data.stats)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Типы виз', value: stats?.totalVisas ?? 0, icon: '🛂', color: 'bg-blue-500' },
    { label: 'FAQ', value: stats?.totalFaqs ?? 0, icon: '❓', color: 'bg-purple-500' },
    { label: 'Статьи', value: stats?.totalPosts ?? 0, icon: '📰', color: 'bg-orange-500' },
    { label: 'Подписчики', value: stats?.totalSubscribers ?? 0, icon: '📧', color: 'bg-pink-500' },
    { label: 'Сообщения', value: stats?.totalMessages ?? 0, icon: '💬', color: 'bg-teal-500' },
    { label: 'Просмотры сегодня', value: stats?.todayViews ?? 0, icon: '👁️', color: 'bg-emerald-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cards.map((card) => (
              <div key={card.label} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Быстрые действия</h2>
              <div className="space-y-3">
                <a href="/admin/visas" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="text-xl">➕</span>
                  <span>Добавить тип визы</span>
                </a>
                <a href="/admin/faq" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="text-xl">❓</span>
                  <span>Добавить FAQ</span>
                </a>
                <a href="/admin/blog" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="text-xl">📝</span>
                  <span>Написать статью</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Статистика за неделю</h2>
              <div className="flex items-center justify-center h-32 text-gray-400">
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-500">{stats?.weekViews ?? 0}</p>
                  <p className="text-sm mt-2">просмотров</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
