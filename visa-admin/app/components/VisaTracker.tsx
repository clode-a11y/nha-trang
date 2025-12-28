'use client'

import { useState } from 'react'

type VisaStatus = {
  applicationId: string
  status: 'pending' | 'processing' | 'approved' | 'rejected' | 'not_found'
  statusText: string
  submittedAt?: string
  updatedAt?: string
  steps: { name: string; completed: boolean; date?: string }[]
}

const mockStatuses: Record<string, VisaStatus> = {
  'VN2024001': {
    applicationId: 'VN2024001',
    status: 'approved',
    statusText: 'Виза одобрена',
    submittedAt: '2024-12-20',
    updatedAt: '2024-12-23',
    steps: [
      { name: 'Заявка подана', completed: true, date: '20.12.2024' },
      { name: 'Документы проверены', completed: true, date: '21.12.2024' },
      { name: 'На рассмотрении', completed: true, date: '22.12.2024' },
      { name: 'Виза выдана', completed: true, date: '23.12.2024' }
    ]
  },
  'VN2024002': {
    applicationId: 'VN2024002',
    status: 'processing',
    statusText: 'На рассмотрении',
    submittedAt: '2024-12-25',
    updatedAt: '2024-12-27',
    steps: [
      { name: 'Заявка подана', completed: true, date: '25.12.2024' },
      { name: 'Документы проверены', completed: true, date: '26.12.2024' },
      { name: 'На рассмотрении', completed: false },
      { name: 'Виза выдана', completed: false }
    ]
  }
}

export function VisaTracker() {
  const [applicationId, setApplicationId] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<VisaStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkStatus = async () => {
    if (!applicationId.trim()) {
      setError('Введите номер заявки')
      return
    }

    setLoading(true)
    setError('')
    setStatus(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check mock data
    const foundStatus = mockStatuses[applicationId.toUpperCase()]

    if (foundStatus) {
      setStatus(foundStatus)
      // Send notification
      if (email) {
        fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'visa_status',
            data: { applicationId, email }
          })
        }).catch(console.error)
      }
    } else {
      setStatus({
        applicationId,
        status: 'not_found',
        statusText: 'Заявка не найдена',
        steps: []
      })
    }

    setLoading(false)
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    processing: 'bg-blue-100 text-blue-700 border-blue-300',
    approved: 'bg-green-100 text-green-700 border-green-300',
    rejected: 'bg-red-100 text-red-700 border-red-300',
    not_found: 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const statusIcons = {
    pending: '⏳',
    processing: '🔄',
    approved: '✅',
    rejected: '❌',
    not_found: '❓'
  }

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        <span>🔍</span> Трекер статуса визы
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Введите номер заявки для проверки статуса
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Номер заявки *
          </label>
          <input
            type="text"
            value={applicationId}
            onChange={e => setApplicationId(e.target.value.toUpperCase())}
            placeholder="Например: VN2024001"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email (для уведомлений)
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={checkStatus}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Проверяем...
            </span>
          ) : (
            'Проверить статус'
          )}
        </button>
      </div>

      {status && (
        <div className="mt-6 space-y-4">
          {/* Status badge */}
          <div className={`p-4 rounded-xl border-2 ${statusColors[status.status]}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{statusIcons[status.status]}</span>
              <div>
                <p className="font-bold text-lg">{status.statusText}</p>
                <p className="text-sm opacity-75">Заявка: {status.applicationId}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          {status.steps.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">Этапы обработки:</h4>
              <div className="space-y-2">
                {status.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
                    }`}>
                      {step.completed ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                        {step.name}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-500">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {status.status === 'not_found' && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Проверьте правильность номера заявки. Если вы уверены, что номер верный,
              свяжитесь с нами через форму обратной связи.
            </p>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400 text-center">
        Демо-номера для теста: VN2024001, VN2024002
      </p>
    </div>
  )
}
