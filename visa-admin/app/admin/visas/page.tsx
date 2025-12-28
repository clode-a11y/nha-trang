'use client'

import { useEffect, useState } from 'react'

interface VisaType {
  id: string
  title: string
  description: string
  duration: string
  price: string
  documents: string
  isActive: boolean
  order: number
}

export default function VisasPage() {
  const [visas, setVisas] = useState<VisaType[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVisa, setEditingVisa] = useState<VisaType | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    documents: '',
    isActive: true,
    order: 0
  })

  useEffect(() => {
    fetchVisas()
  }, [])

  const fetchVisas = async () => {
    const res = await fetch('/api/visas')
    const data = await res.json()
    setVisas(data)
    setLoading(false)
  }

  const openModal = (visa?: VisaType) => {
    if (visa) {
      setEditingVisa(visa)
      setFormData({
        title: visa.title,
        description: visa.description,
        duration: visa.duration,
        price: visa.price,
        documents: visa.documents,
        isActive: visa.isActive,
        order: visa.order
      })
    } else {
      setEditingVisa(null)
      setFormData({
        title: '',
        description: '',
        duration: '',
        price: '',
        documents: '',
        isActive: true,
        order: visas.length
      })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingVisa ? 'PUT' : 'POST'
    const body = editingVisa
      ? { ...formData, id: editingVisa.id }
      : formData

    await fetch('/api/visas', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    setShowModal(false)
    fetchVisas()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот тип визы?')) return

    await fetch(`/api/visas?id=${id}`, { method: 'DELETE' })
    fetchVisas()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Типы виз</h1>
        <button
          onClick={() => openModal()}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
        >
          + Добавить
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Название</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Срок</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Цена</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Статус</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visas.map((visa) => (
                <tr key={visa.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{visa.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{visa.description}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{visa.duration}</td>
                  <td className="px-6 py-4 text-gray-600">{visa.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      visa.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {visa.isActive ? 'Активна' : 'Скрыта'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openModal(visa)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => handleDelete(visa.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visas.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Нет типов виз. Добавьте первый!
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingVisa ? 'Редактировать' : 'Добавить'} тип визы
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Срок действия</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="до 45 дней"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цена</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="25 USD"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Необходимые документы</label>
                <textarea
                  value={formData.documents}
                  onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  rows={2}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-emerald-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">Активна (показывать на сайте)</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
