'use client'

import { useState } from 'react'
import { trackEvent } from './Analytics'
import { useTranslation } from './TranslationProvider'

export function EmailSubscription() {
  const { t } = useTranslation()
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

      // Send Telegram notification
      await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'subscription',
          data: { email }
        })
      }).catch(console.error)

      // Track event
      trackEvent('subscribe', 'email', email)

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
    <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl text-white">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">📬</span>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">{t('subscription.title')}</h3>
        <p className="text-green-100 mb-4 sm:mb-6">
          {t('subscription.description')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('subscription.placeholder')}
            required
            className="flex-1 px-4 sm:px-5 py-3 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 sm:px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 active:scale-95 transition disabled:opacity-50"
          >
            {status === 'loading' ? t('subscription.subscribing') : t('subscription.subscribe')}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-100 flex items-center justify-center gap-2">
            <span>✅</span> {t('subscription.success')}
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-200 flex items-center justify-center gap-2">
            <span>❌</span> {t('subscription.error')}
          </p>
        )}

        <p className="mt-4 text-xs text-green-200">
          {t('subscription.note')}
        </p>
      </div>
    </div>
  )
}
