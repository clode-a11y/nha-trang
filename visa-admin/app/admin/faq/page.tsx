'use client'

import { useEffect, useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string | null
  isActive: boolean
  order: number
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    isActive: true,
    order: 0
  })

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    const res = await fetch('/api/faq')
    const data = await res.json()
    setFaqs(data)
    setLoading(false)
  }

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq)
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || '',
        isActive: faq.isActive,
        order: faq.order
      })
    } else {
      setEditingFaq(null)
      setFormData({
        question: '',
        answer: '',
        category: '',
        isActive: true,
        order: faqs.length
      })
    }
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const method = editingFaq ? 'PUT' : 'POST'
    const body = editingFaq
      ? { ...formData, id: editingFaq.id }
      : formData

    await fetch('/api/faq', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    setShowModal(false)
    fetchFaqs()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот вопрос?')) return

    await fetch(`/api/faq?id=${id}`, { method: 'DELETE' })
    fetchFaqs()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">FAQ</h1>
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
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {faq.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {faq.category}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      faq.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {faq.isActive ? 'Активен' : 'Скрыт'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => openModal(faq)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
              Нет вопросов. Добавьте первый!
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingFaq ? 'Редактировать' : 'Добавить'} вопрос
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Вопрос</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ответ</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Общие вопросы"
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
                <label htmlFor="isActive" className="text-sm text-gray-700">Активен</label>
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
