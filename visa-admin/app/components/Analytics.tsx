'use client'

import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const YM_ID = process.env.NEXT_PUBLIC_YM_ID

export function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Yandex Metrika */}
      {YM_ID && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      )}
    </>
  )
}

// Helper functions for tracking events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (GA_ID && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      })
    }

    // Yandex Metrika
    if (YM_ID && (window as unknown as { ym: (...args: unknown[]) => void }).ym) {
      (window as unknown as { ym: (...args: unknown[]) => void }).ym(Number(YM_ID), 'reachGoal', action, {
        category,
        label,
        value
      })
    }
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined') {
    if (GA_ID && (window as unknown as { gtag: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', GA_ID, {
        page_path: url
      })
    }

    if (YM_ID && (window as unknown as { ym: (...args: unknown[]) => void }).ym) {
      (window as unknown as { ym: (...args: unknown[]) => void }).ym(Number(YM_ID), 'hit', url)
    }
  }
}
