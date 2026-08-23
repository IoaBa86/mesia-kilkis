import { ImageResponse } from 'next/og'
import { loadAlegreya } from '@/lib/og-font'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const font = await loadAlegreya('Μ', 800)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#753647',
        }}
      >
        <div style={{ fontFamily: 'Alegreya M', fontSize: 108, color: '#E2C874', display: 'flex' }}>Μ</div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Alegreya M', data: font, weight: 800, style: 'normal' }],
    }
  )
}
