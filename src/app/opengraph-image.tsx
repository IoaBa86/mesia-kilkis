import { ImageResponse } from 'next/og'
import { loadAlegreya } from '@/lib/og-font'

export const alt = 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const title = 'Μεσιά Κιλκίς'
  const subtitle = 'Περιφερειακή Ενότητα Κιλκίς · Κεντρική Μακεδονία'
  const [titleFont, subtitleFont] = await Promise.all([
    loadAlegreya(title, 800),
    loadAlegreya(subtitle + '0123456789°′″·NE', 600),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#753647',
          backgroundImage: 'radial-gradient(circle, rgba(250,247,240,0.55) 2px, transparent 2.5px)',
          backgroundSize: '36px 36px',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#E2C874',
            marginBottom: 28,
            fontFamily: 'Alegreya Sub',
            display: 'flex',
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            fontSize: 128,
            fontWeight: 800,
            color: '#FAF7F0',
            fontFamily: 'Alegreya Title',
            display: 'flex',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 44,
            display: 'flex',
            alignItems: 'center',
            border: '2px solid rgba(250,247,240,0.4)',
            color: '#FAF7F0',
            fontSize: 24,
            letterSpacing: 3,
            padding: '10px 28px',
            fontFamily: 'Alegreya Sub',
          }}
        >
          40°52′57″N · 22°34′35″E
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Alegreya Title', data: titleFont, weight: 800, style: 'normal' },
        { name: 'Alegreya Sub', data: subtitleFont, weight: 600, style: 'normal' },
      ],
    }
  )
}
