'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const navigation = [
  { name: 'Обзор', href: '/account', icon: '📊' },
  { name: 'Мои заказы', href: '/account/orders', icon: '📦' },
  { name: 'Документы', href: '/account/documents', icon: '📄' },
  { name: 'Настройки', href: '/account/settings', icon: '⚙️' },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="lg:col-span-3 h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Личный кабинет
          </h1>
          <p className="text-gray-600 mt-1">
            Добро пожаловать, {session.user?.name || session.user?.email}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
