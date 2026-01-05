const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function sendTelegramNotification(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram credentials not configured')
    return false
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    )

    return response.ok
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
    return false
  }
}

export async function sendOrderNotification(order: {
  trackingNumber: string
  clientName: string
  clientPhone: string
  clientEmail: string
  service: string
  weight: number
  pickupAddress: string
  deliveryAddress: string
}): Promise<boolean> {
  const timestamp = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })

  const message = `
<b>Новая заявка на доставку</b>

<b>Номер:</b> ${order.trackingNumber}
<b>Дата:</b> ${timestamp}

<b>Клиент:</b> ${order.clientName}
<b>Телефон:</b> ${order.clientPhone}
<b>Email:</b> ${order.clientEmail}

<b>Услуга:</b> ${order.service}
<b>Вес:</b> ${order.weight} кг

<b>Откуда:</b> ${order.pickupAddress}
<b>Куда:</b> ${order.deliveryAddress}
  `.trim()

  return sendTelegramNotification(message)
}
