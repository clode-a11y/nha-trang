'use client'

import { useState } from 'react'

export function EmailSubscription() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-8 shadow-xl text-white">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-4xl mb-4 block">📬</span>
        <h3 className="text-2xl font-bold mb-2">Подпишитесь на обновления</h3>
        <p className="text-green-100 mb-6">
          Получайте актуальную информацию об изменениях визовых правил и полезные советы
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ваш email"
            required
            className="flex-1 px-5 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Подписываем...' : 'Подписаться'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-100 flex items-center justify-center gap-2">
            <span>✅</span> Вы успешно подписались!
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-200 flex items-center justify-center gap-2">
            <span>❌</span> Ошибка. Попробуйте позже.
          </p>
        )}

        <p className="mt-4 text-xs text-green-200">
          Не более 2 писем в месяц. Отписаться можно в любой момент.
        </p>
      </div>
    </div>
  )
}
