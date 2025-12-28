'use client'

import { useEffect, useState } from 'react'

interface ChatMessage {
  id: string
  sessionId: string
  message: string
  isBot: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [sessions, setSessions] = useState<Record<string, ChatMessage[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedSession, setSelectedSession] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const res = await fetch('/api/messages')
    const data = await res.json()
    setSessions(data.sessions || {})
    setLoading(false)
  }

  const handleDelete = async (sessionId: string) => {
    if (!confirm('Удалить всю историю этого чата?')) return

    await fetch(`/api/messages?sessionId=${sessionId}`, { method: 'DELETE' })
    fetchMessages()
    setSelectedSession(null)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const sessionIds = Object.keys(sessions)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Сообщения чата</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      ) : sessionIds.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
          Нет сообщений
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-700">Сессии ({sessionIds.length})</h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {sessionIds.map((sessionId) => {
                const messages = sessions[sessionId]
                const lastMessage = messages[0]
                const userMessages = messages.filter(m => !m.isBot)

                return (
                  <button
                    key={sessionId}
                    onClick={() => setSelectedSession(sessionId)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                      selectedSession === sessionId ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {userMessages[0]?.message || 'Новый чат'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {messages.length} сообщ. • {formatDate(lastMessage.createdAt)}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            {selectedSession ? (
              <>
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-700">История чата</h2>
                  <button
                    onClick={() => handleDelete(selectedSession)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Удалить
                  </button>
                </div>
                <div className="p-4 max-h-[550px] overflow-y-auto space-y-3">
                  {[...sessions[selectedSession]].reverse().map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-400' : 'text-emerald-100'}`}>
                          {formatDate(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                Выберите сессию для просмотра
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
