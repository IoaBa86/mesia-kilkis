// Single source of truth for contact / NAP data shown across the site.
export const SITE = {
  name: 'Μεσιά Κιλκίς',
  url: 'https://www.mesia.gr',
  email: 'info@mesia.gr',
  postalCode: '61007',
  locality: 'Μεσιά',
  region: 'Κιλκίς',
  country: 'GR',
} as const

export const SITE_ADDRESS_LINE = `${SITE.locality}, ${SITE.region} ${SITE.postalCode}`
