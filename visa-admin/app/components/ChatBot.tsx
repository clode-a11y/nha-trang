'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from './TranslationProvider'

interface Message {
  id: number
  text: string
  isBot: boolean
}

export function ChatBot() {
  const { t, locale } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    t('chatbot.q1'),
    t('chatbot.q2'),
    t('chatbot.q3'),
    t('chatbot.q4')
  ]

  const botResponses: Record<string, Record<string, string>> = {
    ru: {
      'виза': 'Нет! Граждане РФ могут находиться во Вьетнаме до 45 дней без визы. Вам нужен только загранпаспорт со сроком действия минимум 6 месяцев.',
      'e-visa': 'E-Visa оформляется на официальном сайте evisa.xuatnhapcanh.gov.vn. Заполните анкету, загрузите фото и оплатите $25. Срок оформления 3-5 рабочих дней.',
      'документ': 'Для безвизового въезда: загранпаспорт (действителен 6+ месяцев). Для E-Visa: загранпаспорт, фото 4x6 см, данные о проживании.',
      'стоит': 'Безвизовый въезд (до 45 дней) — бесплатно. E-Visa — $25. Виза по прилёту — $25-50. Консульская виза — от $50.',
      'default': 'Спасибо за вопрос! К сожалению, я пока не могу ответить на него автоматически. Напишите нам в Telegram @vietvisa_support для консультации.'
    },
    en: {
      'visa': 'No! You can stay in Vietnam up to 45 days without a visa. You only need a passport valid for at least 6 months.',
      'e-visa': 'E-Visa is processed on the official website evisa.xuatnhapcanh.gov.vn. Fill out the form, upload photo and pay $25. Processing time is 3-5 business days.',
      'document': 'For visa-free entry: passport (valid 6+ months). For E-Visa: passport, 4x6 cm photo, accommodation details.',
      'cost': 'Visa-free entry (up to 45 days) — free. E-Visa — $25. Visa on arrival — $25-50. Consular visa — from $50.',
      'default': 'Thank you for your question! Unfortunately, I cannot answer it automatically. Contact us on Telegram @vietvisa_support for consultation.'
    },
    vi: {
      'visa': 'Không! Bạn có thể ở Việt Nam đến 45 ngày mà không cần thị thực. Bạn chỉ cần hộ chiếu có hiệu lực ít nhất 6 tháng.',
      'e-visa': 'E-Visa được xử lý trên trang web chính thức evisa.xuatnhapcanh.gov.vn. Điền đơn, tải ảnh lên và thanh toán $25. Thời gian xử lý 3-5 ngày làm việc.',
      'document': 'Để nhập cảnh miễn thị thực: hộ chiếu (có hiệu lực 6+ tháng). Để có E-Visa: hộ chiếu, ảnh 4x6 cm, chi tiết chỗ ở.',
      'cost': 'Nhập cảnh miễn thị thực (đến 45 ngày) — miễn phí. E-Visa — $25. Thị thực khi đến — $25-50. Thị thực lãnh sự — từ $50.',
      'default': 'Cảm ơn câu hỏi của bạn! Rất tiếc, tôi không thể trả lời tự động. Liên hệ với chúng tôi qua Telegram @vietvisa_support để được tư vấn.'
    }
  }

  useEffect(() => {
    setMessages([{ id: 1, text: t('chatbot.greeting'), isBot: true }])
  }, [locale, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getResponse = (question: string): string => {
    const q = question.toLowerCase()
    const responses = botResponses[locale] || botResponses['en']

    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && q.includes(key)) {
        return response
      }
    }
    return responses['default']
  }

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
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-50 flex items-center justify-center"
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
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto w-auto sm:w-[350px] h-[70vh] sm:h-[500px] max-h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 sm:p-4">
            <h4 className="font-bold text-lg">{t('chatbot.title')}</h4>
            <p className="text-sm text-green-100">{t('chatbot.online')} • {t('chatbot.responseTime')}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isBot
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
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
            <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-2">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs sm:text-sm px-3 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 active:scale-95 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 px-4 py-3 text-base border dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-11 h-11 sm:w-10 sm:h-10 bg-green-500 text-white rounded-full hover:bg-green-600 active:scale-90 transition flex-shrink-0 flex items-center justify-center"
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
