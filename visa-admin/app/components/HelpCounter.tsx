'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from './TranslationProvider'

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      if (step >= steps) {
        setCurrent(value)
        clearInterval(timer)
      } else {
        setCurrent(Math.floor(increment * step))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, duration])

  return <>{current.toLocaleString()}</>
}

export function HelpCounter() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { label: t('counter.helped'), value: 15420, suffix: '+', icon: '👥' },
    { label: t('counter.visas'), value: 3850, suffix: '+', icon: '📄' },
    { label: t('counter.experience'), value: 7, suffix: '', icon: '🏆' },
    { label: t('counter.countries'), value: 12, suffix: '', icon: '🌏' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('help-counter')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="help-counter"
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-xl text-white overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-center mb-8">
          {t('counter.title')}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                {isVisible ? <AnimatedNumber value={stat.value} /> : '0'}
                {stat.suffix}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            * {t('counter.asOf')}
          </p>
        </div>
      </div>
    </div>
  )
}
