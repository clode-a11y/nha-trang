'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'О нас', href: '/about' },
  { name: 'Услуги', href: '/services' },
  { name: 'Калькулятор', href: '/calculator' },
  { name: 'Трекинг', href: '/tracking' },
  { name: 'Контакты', href: '/contacts' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - like mcc.am */}
      <div className="bg-[#1B3B6F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+84xxxxxxxxx" className="flex items-center gap-2 hover:text-[#E5A835] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +84 xxx xxx xxx
              </a>
              <a href="mailto:contact@example.com" className="hidden sm:flex items-center gap-2 hover:text-[#E5A835] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@example.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-gray-300">Пн-Сб 8:00-18:00</span>
              <div className="flex items-center gap-2 text-xs">
                <button className="hover:text-[#E5A835] font-medium">RU</button>
                <span className="text-gray-400">|</span>
                <button className="text-gray-400 hover:text-[#E5A835]">EN</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - like mcc.am */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1B3B6F] rounded flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#1B3B6F]">VIET</span>
                <span className="text-2xl font-bold text-[#E5A835]">CARGO</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#1B3B6F] hover:text-[#E5A835] font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={session.user?.role === 'admin' ? '/admin' : '/account'}
                    className="text-[#1B3B6F] hover:text-[#E5A835] font-medium text-sm uppercase tracking-wide"
                  >
                    {session.user?.role === 'admin' ? 'Админ' : 'Кабинет'}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-500 hover:text-red-500 text-sm"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[#1B3B6F] hover:text-[#E5A835] font-medium text-sm uppercase tracking-wide"
                >
                  Войти
                </Link>
              )}
              <Link
                href="/request"
                className="bg-[#E5A835] hover:bg-[#C4901F] text-[#1B3B6F] px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors"
              >
                Заявка
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-[#1B3B6F]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-[#1B3B6F] hover:bg-gray-50 font-medium uppercase text-sm tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-2" />
                {session ? (
                  <>
                    <Link
                      href={session.user?.role === 'admin' ? '/admin' : '/account'}
                      className="px-4 py-3 text-[#1B3B6F] hover:bg-gray-50 font-medium uppercase text-sm tracking-wide"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {session.user?.role === 'admin' ? 'Админ-панель' : 'Мой кабинет'}
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="px-4 py-3 text-left text-red-500 hover:bg-red-50 font-medium uppercase text-sm tracking-wide"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-3 text-[#1B3B6F] hover:bg-gray-50 font-medium uppercase text-sm tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти
                  </Link>
                )}
                <Link
                  href="/request"
                  className="mx-4 mt-2 bg-[#E5A835] text-[#1B3B6F] px-6 py-3 font-semibold text-sm uppercase tracking-wide text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Заявка
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
