'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'
import { Analytics } from './components/Analytics'
import { ABTestProvider } from './components/ABTest'

function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration.scope)
        })
        .catch(error => {
          console.log('SW registration failed:', error)
        })
    }
  }, [])

  return null
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ABTestProvider>
        {children}
        <Analytics />
        <ServiceWorkerRegistration />
      </ABTestProvider>
    </SessionProvider>
  )
}
