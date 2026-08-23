'use client'

// Catches crashes in the root layout itself (rare — the regular error.tsx
// above handles everything else). Must render its own <html>/<body> and
// avoid depending on anything the crashed layout might have broken, so this
// stays deliberately minimal with inline styles instead of the design system.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="el">
      <body style={{ margin: 0, fontFamily: 'Georgia, serif', backgroundColor: '#FAF7F0' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '480px' }}>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#75364780',
                marginBottom: '16px',
              }}
            >
              Σφάλμα 500
            </p>
            <h1 style={{ fontSize: '2.5rem', color: '#753647', marginBottom: '20px' }}>
              Κάτι πήγε στραβά
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#2D2D2D', lineHeight: 1.6, marginBottom: '32px' }}>
              Παρουσιάστηκε ένα σοβαρό σφάλμα στην ιστοσελίδα. Δοκιμάστε ξανά σε λίγο.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#753647',
                color: '#FAF7F0',
                border: 'none',
                padding: '12px 28px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Δοκιμάστε ξανά
            </button>
            {error.digest && (
              <p style={{ marginTop: '32px', fontFamily: 'monospace', fontSize: '11px', color: '#6B5B7399' }}>
                Κωδικός σφάλματος: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
