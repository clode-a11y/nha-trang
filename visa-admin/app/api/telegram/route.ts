import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('Telegram not configured, skipping notification')
      return NextResponse.json({ success: true, message: 'Telegram not configured' })
    }

    let message = ''

    switch (type) {
      case 'contact':
        message = `🆕 *Новая заявка на визу*\n\n` +
          `👤 Имя: ${data.name}\n` +
          `📧 Email: ${data.email}\n` +
          `📱 Телефон: ${data.phone || 'не указан'}\n` +
          `📅 Дата прибытия: ${data.arrivalDate || 'не указана'}\n` +
          `🛂 Тип визы: ${data.visaType}\n` +
          `💬 Сообщение: ${data.message || 'нет'}`
        break

      case 'subscription':
        message = `📬 *Новый подписчик*\n\n📧 Email: ${data.email}`
        break

      case 'visa_status':
        message = `🔍 *Запрос статуса визы*\n\n` +
          `📋 Номер заявки: ${data.applicationId}\n` +
          `📧 Email: ${data.email}`
        break

      default:
        message = `📩 *Новое уведомление*\n\n${JSON.stringify(data, null, 2)}`
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    )

    const result = await response.json()

    if (!result.ok) {
      console.error('Telegram API error:', result)
      return NextResponse.json({ success: false, error: result.description }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Telegram notification error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send notification' }, { status: 500 })
  }
}
