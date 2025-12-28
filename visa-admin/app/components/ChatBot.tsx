'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  isBot: boolean
}

const quickQuestions = [
  'Нужна ли виза на 30 дней?',
  'Как оформить E-Visa?',
  'Какие документы нужны?',
  'Сколько стоит виза?'
]

const botResponses: Record<string, string> = {
  'нужна ли виза на 30 дней': 'Нет! Граждане РФ могут находиться во Вьетнаме до 45 дней без визы. Вам нужен только загранпаспорт со сроком действия минимум 6 месяцев.',
  'как оформить e-visa': 'E-Visa оформляется на официальном сайте evisa.xuatnhapcanh.gov.vn. Заполните анкету, загрузите фото и оплатите $25. Срок оформления 3-5 рабочих дней.',
  'какие документы нужны': 'Для безвизового въезда: загранпаспорт (действителен 6+ месяцев). Для E-Visa: загранпаспорт, фото 4x6 см, данные о проживании.',
  'сколько стоит виза': 'Безвизовый въезд (до 45 дней) — бесплатно. E-Visa — $25. Виза по прилёту — $25-50. Консульская виза — от $50.',
  'default': 'Спасибо за вопрос! К сожалению, я пока не могу ответить на него автоматически. Напишите нам в Telegram @vietvisa_support для консультации.'
}

function getResponse(question: string): string {
  const q = question.toLowerCase()
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && q.includes(key)) {
      return response
    }
  }
  // Check for keywords
  if (q.includes('виза') && (q.includes('30') || q.includes('45') || q.includes('нужн'))) {
    return botResponses['нужна ли виза на 30 дней']
  }
  if (q.includes('e-visa') || q.includes('электронн') || q.includes('оформ')) {
    return botResponses['как оформить e-visa']
  }
  if (q.includes('документ') || q.includes('паспорт') || q.includes('фото')) {
    return botResponses['какие документы нужны']
  }
  if (q.includes('стоит') || q.includes('цена') || q.includes('сколько') || q.includes('$')) {
    return botResponses['сколько стоит виза']
  }
  return botResponses['default']
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Я помогу разобраться с визой во Вьетнам. Задайте вопрос или выберите из списка ниже.', isBot: true }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = { id: Date.now(), text, isBot: false }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getResponse(text),
        isBot: true
      }
      setMessages(prev => [...prev, botMessage])
    }, 800)
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:scale-110 transition-all z-50 flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4">
            <h4 className="font-bold text-lg">Визовый помощник</h4>
            <p className="text-sm text-green-100">Онлайн • Отвечу мгновенно</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                      : 'bg-green-500 text-white rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Введите вопрос..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
