import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Виза во Вьетнам 2025 — Полное руководство для граждан России | VietVisa",
  description: "Актуальная информация о визах во Вьетнам для россиян. Безвизовый въезд до 45 дней, E-Visa за $25, виза по прилёту. Пошаговые инструкции, калькулятор визы, чек-лист документов.",
  keywords: ["виза вьетнам", "виза во вьетнам", "e-visa вьетнам", "вьетнам без визы", "виза вьетнам для россиян", "электронная виза вьетнам", "нужна ли виза во вьетнам"],
  authors: [{ name: "VietVisa" }],
  creator: "VietVisa",
  publisher: "VietVisa",
  robots: "index, follow",
  manifest: "/manifest.json",
  themeColor: "#22C55E",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "VietVisa"
  },
  formatDetection: {
    telephone: true
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://vietnam-visa-guide.vercel.app",
    siteName: "VietVisa",
    title: "Виза во Вьетнам 2025 — Полное руководство",
    description: "Актуальная информация о визах во Вьетнам. Безвизовый въезд до 45 дней, E-Visa, калькулятор визы.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VietVisa - Визы во Вьетнам"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Виза во Вьетнам 2025",
    description: "Полное руководство по визам во Вьетнам для граждан России",
  },
  alternates: {
    canonical: "https://vietnam-visa-guide.vercel.app"
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "VietVisa",
              "url": "https://vietnam-visa-guide.vercel.app",
              "description": "Информация о визах во Вьетнам для граждан России",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vietnam-visa-guide.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Нужна ли виза гражданам России для въезда во Вьетнам?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Граждане РФ могут въезжать во Вьетнам без визы на срок до 45 дней. Для более длительного пребывания потребуется виза."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Сколько стоит электронная виза во Вьетнам?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Стоимость E-Visa во Вьетнам составляет $25 USD. Оформление занимает 3-5 рабочих дней."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-white transition-colors`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
