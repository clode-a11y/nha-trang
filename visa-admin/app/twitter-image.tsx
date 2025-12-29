import { ImageResponse } from 'next/og'

export const alt = 'VietVisa - Визы во Вьетнам'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #10b981 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '80px' }}>🇻🇳</span>
            <span
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              VietVisa
            </span>
          </div>
          
          <div
            style={{
              fontSize: '36px',
              color: 'rgba(255,255,255,0.95)',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Визы во Вьетнам 2025
          </div>
          
          <div
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: '900px',
              marginTop: '16px',
            }}
          >
            Полное руководство для граждан России
          </div>
          
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '16px',
              }}
            >
              <span style={{ fontSize: '32px', marginBottom: '8px' }}>✈️</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>Без визы</span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>до 45 дней</span>
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '16px',
              }}
            >
              <span style={{ fontSize: '32px', marginBottom: '8px' }}>📱</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>E-Visa</span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>за $25</span>
            </div>
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 30px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '16px',
              }}
            >
              <span style={{ fontSize: '32px', marginBottom: '8px' }}>⏱️</span>
              <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold' }}>3-5 дней</span>
              <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)' }}>оформление</span>
            </div>
          </div>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '18px',
          }}
        >
          <span>visa-admin-henna.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
