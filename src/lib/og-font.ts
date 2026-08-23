// Fetches a subset of Alegreya (Greek-capable) for use in next/og ImageResponse routes.
export async function loadAlegreya(text: string, weight: number) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Alegreya:wght@${weight}&text=${encodeURIComponent(text)}`
  const css = await fetch(cssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36' },
  }).then((res) => res.text())
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/)
  if (!match) throw new Error('Could not resolve Alegreya font URL')
  return fetch(match[1]).then((res) => res.arrayBuffer())
}
