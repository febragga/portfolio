import { ImageResponse } from 'next/og'

export const socialImageSize = {
  width: 1200,
  height: 630,
}

export function createSocialImage({ eyebrow, title, detail }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080d16',
          color: '#edf2fb',
          padding: '64px 72px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#5b88ff', fontSize: 21, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {eyebrow}
          </span>
          <span style={{ color: '#a0aec4', fontSize: 19, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Arquivo 2024—26
          </span>
        </div>

        <div style={{ width: '100%', height: 1, background: 'rgba(160, 174, 196, 0.3)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <div style={{ fontSize: title.length > 38 ? 74 : 92, lineHeight: 0.94, letterSpacing: '-0.055em', maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ color: '#a0aec4', fontSize: 23, maxWidth: 760, lineHeight: 1.35 }}>{detail}</span>
            <span style={{ color: '#edf2fb', fontSize: 24, letterSpacing: '-0.02em' }}>Fernando Braga ↗</span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  )
}
