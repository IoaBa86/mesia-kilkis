"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Image,
  FolderOpen,
  Settings,
  LogOut,
  Plus,
  Upload,
  Calendar,
  Eye,         // Cookie Consent Logs
  Megaphone,   // Ad Slots
  BookOpen,    // Historical Posts
  MessageCircle, // Village Voices
  Landmark,    // Digital Museum
  type LucideIcon
} from "lucide-react"

interface DashboardStats {
  categoriesCount: number
  photosCount: number
  activeCategories: number
  eventsCount: number
  upcomingEvents: number
  historicalPostsCount?: number
  cookieConsentCount?: number
  adSlotsCount?: number
  activeAdSlots?: number
  villageVoicesCount?: number
  museumExhibitsCount?: number
}

function DashCard({
  title,
  icon: Icon,
  value,
  caption,
  onOpen,
  buttonLabel,
}: {
  title: string
  icon: LucideIcon
  value: React.ReactNode
  caption: string
  onOpen: () => void
  buttonLabel: string
}) {
  return (
    <div
      className="group cursor-pointer border border-mesia-gold/25 bg-white p-6 transition-colors duration-200 hover:border-mesia-wine/40"
      onClick={onOpen}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-mesia-wine/50">{title}</p>
        <Icon className="h-5 w-5 text-mesia-gold" />
      </div>
      <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{value}</div>
      <p className="text-xs text-mesia-lightText mb-4">{caption}</p>
      <Button
        className="w-full text-xs"
        onClick={(e) => {
          e.stopPropagation()
          onOpen()
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    categoriesCount: 0,
    photosCount: 0,
    activeCategories: 0,
    eventsCount: 0,
    upcomingEvents: 0,
    historicalPostsCount: 0,
    cookieConsentCount: 0,
    adSlotsCount: 0,
    activeAdSlots: 0,
    villageVoicesCount: 0,
    museumExhibitsCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchDashboardStats()
    }
  }, [session])

  const fetchDashboardStats = async () => {
    try {
      // Fire every request in parallel instead of awaiting them one by one —
      // sequential round trips were the reason this dashboard felt slow.
      const [categoriesRes, eventsRes, postsRes, consentRes, adSlotsRes, voicesRes, exhibitsRes] = await Promise.allSettled([
        fetch('/api/categories'),
        fetch('/api/events'),
        fetch('/api/admin/historical-posts'),
        fetch('/api/cookie-consent'),
        fetch('/api/ad-slots'),
        fetch('/api/admin/village-voices'),
        fetch('/api/admin/museum-exhibits'),
      ])

      let categoriesData: any[] = []
      let activeCategories = 0
      let totalPhotos = 0
      if (categoriesRes.status === 'fulfilled' && categoriesRes.value.ok) {
        categoriesData = await categoriesRes.value.json()
        activeCategories = categoriesData.filter((cat: any) => cat.isActive).length
        totalPhotos = categoriesData.reduce((sum: number, cat: any) => sum + (cat._count?.photos || 0), 0)
      }

      let eventsCount = 0
      let upcomingEvents = 0
      if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
        const eventsData = await eventsRes.value.json()
        eventsCount = eventsData.events?.length || 0
        upcomingEvents = eventsData.events?.filter((event: any) =>
          new Date(event.eventDate) >= new Date()
        ).length || 0
      }

      let historicalPostsCount = 0
      if (postsRes.status === 'fulfilled' && postsRes.value.ok) {
        const postsData = await postsRes.value.json()
        historicalPostsCount = postsData.posts?.length || 0
      }

      let cookieConsentCount = 0
      if (consentRes.status === 'fulfilled' && consentRes.value.ok) {
        const consentData = await consentRes.value.json()
        cookieConsentCount = consentData.totalCount || 0
      }

      let adSlotsCount = 0
      let activeAdSlots = 0
      if (adSlotsRes.status === 'fulfilled' && adSlotsRes.value.ok) {
        const adSlotsData = await adSlotsRes.value.json()
        adSlotsCount = adSlotsData.length || 0
        activeAdSlots = adSlotsData.filter((slot: any) => slot.isActive).length || 0
      }

      let villageVoicesCount = 0
      if (voicesRes.status === 'fulfilled' && voicesRes.value.ok) {
        const voicesData = await voicesRes.value.json()
        villageVoicesCount = voicesData.voices?.length || 0
      }

      let museumExhibitsCount = 0
      if (exhibitsRes.status === 'fulfilled' && exhibitsRes.value.ok) {
        const exhibitsData = await exhibitsRes.value.json()
        museumExhibitsCount = exhibitsData.exhibits?.length || 0
      }

      setStats({
        categoriesCount: categoriesData.length,
        photosCount: totalPhotos,
        activeCategories,
        eventsCount,
        upcomingEvents,
        historicalPostsCount,
        cookieConsentCount,
        adSlotsCount,
        activeAdSlots,
        villageVoicesCount,
        museumExhibitsCount
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-mesia-cream">
        <div className="text-lg font-mono text-mesia-wine">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-mesia-cream">
      {/* Header */}
      <header className="bg-white border-b border-mesia-gold/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border-2 border-mesia-wine bg-mesia-wine text-mesia-gold font-greek font-bold text-lg">
                Μ
              </div>
              <div>
                <h1 className="text-xl font-bold text-mesia-wine font-greek leading-none">Μεσιά Κιλκίς</h1>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mesia-lightText mt-1">Διαχείριση Ιστοσελίδας</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-mesia-darkText hidden sm:inline">Καλώς ήρθες, {session.user?.name}</span>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Αποσύνδεση</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mesia-wine/50 mb-2">Admin</p>
          <h2 className="text-3xl font-bold text-mesia-wine font-greek mb-2">Πίνακας Ελέγχου</h2>
          <p className="text-mesia-lightText">Διαχειριστείτε το περιεχόμενο της ιστοσελίδας του χωριού</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mesia-gold/25 border border-mesia-gold/25 mb-12">
          <DashCard
            title="Κατηγορίες"
            icon={FolderOpen}
            value={stats.categoriesCount}
            caption={`${stats.activeCategories} ενεργές`}
            onOpen={() => router.push("/admin/categories")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Φωτογραφίες"
            icon={Image}
            value={stats.photosCount}
            caption="Συνολικές"
            onOpen={() => router.push("/admin/photos")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Εκδηλώσεις"
            icon={Calendar}
            value={stats.eventsCount}
            caption={`${stats.upcomingEvents} επερχόμενες`}
            onOpen={() => router.push("/admin/events")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Ιστορικά Άρθρα"
            icon={BookOpen}
            value={stats.historicalPostsCount || 0}
            caption="Συνολικά άρθρα"
            onOpen={() => router.push("/admin/historical-posts")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Φωνές Χωριού"
            icon={MessageCircle}
            value={stats.villageVoicesCount || 0}
            caption="Ιστορίες & μαρτυρίες"
            onOpen={() => router.push("/admin/village-voices")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Ψηφιακό Μουσείο"
            icon={Landmark}
            value={stats.museumExhibitsCount || 0}
            caption="Εκθέματα"
            onOpen={() => router.push("/admin/museum-exhibits")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Διαφημίσεις"
            icon={Megaphone}
            value={stats.adSlotsCount || 0}
            caption={`${stats.activeAdSlots || 0} ενεργές`}
            onOpen={() => router.push("/admin/ads")}
            buttonLabel="Διαχείριση"
          />
          <DashCard
            title="Cookie Consent"
            icon={Eye}
            value={stats.cookieConsentCount || 0}
            caption="Καταγραφές συναίνεσης"
            onOpen={() => router.push("/admin/consent-logs")}
            buttonLabel="Προβολή Καταγραφών"
          />
        </div>

        {/* Settings — standalone, not part of the numeric grid */}
        <div className="mb-12">
          <div
            className="flex items-center justify-between border border-mesia-gold/25 bg-white p-6 cursor-pointer hover:border-mesia-wine/40 transition-colors"
            onClick={() => router.push("/admin/settings")}
          >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-mesia-gold" />
              <span className="font-medium text-mesia-wine">Ρυθμίσεις — Διαχείριση ιστοσελίδας</span>
            </div>
            <Button variant="outline" onClick={(e) => { e.stopPropagation(); router.push("/admin/settings") }}>
              Ρυθμίσεις
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mesia-wine/50 mb-4">Γρήγορες Ενέργειες</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-px bg-mesia-gold/25 border border-mesia-gold/25">
            {[
              { icon: Plus, label: "Νέα Κατηγορία", href: "/admin/categories/new" },
              { icon: Upload, label: "Ανέβασμα Φωτογραφιών", href: "/admin/photos/upload" },
              { icon: Calendar, label: "Νέα Εκδήλωση", href: "/admin/events/new" },
              { icon: BookOpen, label: "Νέο Ιστορικό Άρθρο", href: "/admin/historical-posts/new" },
              { icon: MessageCircle, label: "Νέα Μαρτυρία", href: "/admin/village-voices/new" },
              { icon: Landmark, label: "Νέο Έκθεμα", href: "/admin/museum-exhibits/new" },
              { icon: Eye, label: "Cookie Logs", href: "/admin/consent-logs" },
              { icon: Settings, label: "Ρυθμίσεις", href: "/admin/settings" },
              { icon: Megaphone, label: "Νέα Θέση Διαφήμισης", href: "/admin/ads/new" },
            ].map((action) => (
              <button
                key={action.href}
                onClick={() => router.push(action.href)}
                className="h-28 flex flex-col items-center justify-center gap-2 bg-white text-mesia-wine hover:bg-mesia-cream transition-colors text-sm p-2"
              >
                <action.icon className="h-5 w-5" />
                <span className="font-medium text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Summary */}
        {stats.categoriesCount > 0 && (
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mesia-wine/50 mb-4">Σύνοψη Περιεχομένου</p>
            <div className="border border-mesia-gold/25 bg-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{stats.categoriesCount}</div>
                  <div className="text-mesia-lightText text-sm font-medium">Κατηγορίες</div>
                  <div className="text-xs text-mesia-lightText mt-1">{stats.activeCategories} ενεργές</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{stats.photosCount}</div>
                  <div className="text-mesia-lightText text-sm font-medium">Φωτογραφίες</div>
                  <div className="text-xs text-mesia-lightText mt-1">Συνολικές</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{stats.eventsCount}</div>
                  <div className="text-mesia-lightText text-sm font-medium">Εκδηλώσεις</div>
                  <div className="text-xs text-mesia-lightText mt-1">{stats.upcomingEvents} επερχόμενες</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{stats.cookieConsentCount || 0}</div>
                  <div className="text-mesia-lightText text-sm font-medium">Cookie Consent</div>
                  <div className="text-xs text-mesia-lightText mt-1">Καταγραφές</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">6</div>
                  <div className="text-mesia-lightText text-sm font-medium">Σελίδες</div>
                  <div className="text-xs text-mesia-lightText mt-1">Ενεργές</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
