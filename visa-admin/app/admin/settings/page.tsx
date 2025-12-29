'use client'

import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const res = await fetch('/api/settings')
    const data = await res.json()
    setSettings(data)
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    })
    setSaving(false)
    setMessage('Настройки сохранены!')
    setTimeout(() => setMessage(''), 3000)
  }

  const updateSetting = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  const settingsGroups = [
    {
      title: 'Основные',
      icon: '⚙️',
      fields: [
        { key: 'site_title', label: 'Название сайта', placeholder: 'VietVisa' },
        { key: 'site_description', label: 'Описание', placeholder: 'Всё о визах во Вьетнам' },
        { key: 'contact_email', label: 'Email для связи', placeholder: 'info@example.com' },
        { key: 'contact_telegram', label: 'Telegram', placeholder: '@username' },
      ]
    },
    {
      title: 'SEO',
      icon: '🔍',
      fields: [
        { key: 'meta_title', label: 'Meta Title', placeholder: 'Визы во Вьетнам 2024' },
        { key: 'meta_description', label: 'Meta Description', placeholder: 'Полная информация о визах...' },
        { key: 'meta_keywords', label: 'Meta Keywords', placeholder: 'виза, вьетнам, туризм' },
      ]
    },
    {
      title: 'Аналитика',
      icon: '📈',
      fields: [
        { key: 'google_analytics', label: 'Google Analytics ID', placeholder: 'G-XXXXXXXXXX' },
        { key: 'yandex_metrika', label: 'Яндекс.Метрика ID', placeholder: '12345678' },
      ]
    },
    {
      title: 'Чат-бот',
      icon: '🤖',
      fields: [
        { key: 'chatbot_greeting', label: 'Приветствие', placeholder: 'Здравствуйте! Чем могу помочь?' },
        { key: 'chatbot_enabled', label: 'Включен (true/false)', placeholder: 'true' },
      ]
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Настройки</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {settingsGroups.map((group) => (
            <div key={group.title} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span>{group.icon}</span>
                {group.title}
              </h2>
              <div className="grid gap-4">
                {group.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={settings[field.key] || ''}
                      onChange={(e) => updateSetting(field.key, e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
