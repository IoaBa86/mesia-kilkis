// src/app/access/page.tsx - Server Component for metadata
import { Metadata } from 'next'
import AccessClient from './AccessClient'

export const metadata: Metadata = {
  title: 'Πώς να Έρθετε - Μεσιά Κιλκίς',
  description: 'Αναλυτικές οδηγίες για την πρόσβαση στο παραδοσιακό χωριό Μεσιά Κιλκίς. Οδικές διαδρομές, δημόσια μέσα και χρήσιμες πληροφορίες.',
  alternates: {
    canonical: '/access', // ✅ Fixed canonical URL
  },
  openGraph: {
    title: 'Πώς να Έρθετε - Μεσιά Κιλκίς',
    description: 'Οδηγίες πρόσβασης στο χωριό Μεσιά Κιλκίς - οδικές διαδρομές, GPS συντεταγμένες και χρήσιμες συμβουλές',
    url: 'https://www.mesia.gr/access',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Πώς να Έρθετε - Μεσιά Κιλκίς',
    description: 'Αναλυτικές οδηγίες πρόσβασης στο χωριό Μεσιά Κιλκίς',
  },
}

export default function AccessPage() {
  return <AccessClient />
}
