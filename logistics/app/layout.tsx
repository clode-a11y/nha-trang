import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist-sans',
})

export const metadata: Metadata = {
  title: 'VietCargo - Логистика из России во Вьетнам',
  description:
    'Надёжная доставка грузов из России во Вьетнам. Авиа, морские, ж/д и автоперевозки. Калькулятор стоимости, отслеживание груза, личный кабинет.',
  keywords: [
    'логистика Вьетнам',
    'доставка во Вьетнам',
    'карго Вьетнам',
    'грузоперевозки Вьетнам',
    'авиаперевозки Вьетнам',
    'морские перевозки Вьетнам',
  ],
  openGraph: {
    title: 'VietCargo - Логистика из России во Вьетнам',
    description: 'Надёжная доставка грузов из России во Вьетнам',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
