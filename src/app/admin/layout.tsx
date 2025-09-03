// src/app/admin/layout.tsx - Keep admin separate but with session support
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Admin Panel - Μεσιά Κιλκίς',
    default: 'Admin Panel - Μεσιά Κιλκίς'
  },
  robots: {
    index: false,
    follow: false,
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Admin inherits providers from root layout
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
