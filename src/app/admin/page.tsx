// src/app/admin/page.tsx - Updated with Historical Posts functionality
"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Image, 
  FolderOpen, 
  Settings, 
  LogOut, 
  Plus, 
  Upload, 
  Calendar,
  Users,
  Globe,
  Shield,
  BookOpen,    // NEW: Added for Historical Posts
  History      // NEW: Added for Historical Posts
} from "lucide-react"

interface DashboardStats {
  categoriesCount: number
  photosCount: number
  activeCategories: number
  eventsCount: number
  upcomingEvents: number
  historicalPostsCount?: number  // NEW: Add historical posts count
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
    historicalPostsCount: 0  // NEW: Initialize historical posts count
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
      // Fetch categories
      const categoriesResponse = await fetch('/api/categories')
      let categoriesData = []
      let activeCategories = 0
      let totalPhotos = 0

      if (categoriesResponse.ok) {
        categoriesData = await categoriesResponse.json()
        activeCategories = categoriesData.filter((cat: any) => cat.isActive).length
        totalPhotos = categoriesData.reduce((sum: number, cat: any) => sum + (cat._count?.photos || 0), 0)
      }

      // Fetch events
      let eventsCount = 0
      let upcomingEvents = 0
      
      try {
        const eventsResponse = await fetch('/api/events')
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json()
          eventsCount = eventsData.events?.length || 0
          upcomingEvents = eventsData.events?.filter((event: any) => 
            new Date(event.eventDate) >= new Date()
          ).length || 0
        }
      } catch (eventsError) {
        console.log('Events API not available yet:', eventsError)
        // Events system might not be implemented yet, continue without it
      }

      // NEW: Fetch historical posts
      let historicalPostsCount = 0
      try {
        const postsResponse = await fetch('/api/admin/historical-posts')
        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          historicalPostsCount = postsData.posts?.length || 0
        }
      } catch (postsError) {
        console.log('Historical posts API not available yet:', postsError)
      }
        
      setStats({
        categoriesCount: categoriesData.length,
        photosCount: totalPhotos,
        activeCategories,
        eventsCount,
        upcomingEvents,
        historicalPostsCount  // NEW: Set historical posts count
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <div className="text-xl text-mesia-wine">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-mesia-wine to-mesia-gold rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">Μ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-mesia-wine font-greek">Μεσιά Κιλκίς</h1>
                <p className="text-sm text-mesia-lightText">Διαχείριση Ιστοσελίδας</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-mesia-darkText">Καλώς ήρθες, {session.user?.name}</span>
              <Button 
                variant="outline" 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center space-x-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                <span>Αποσύνδεση</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-2">Πίνακας Ελέγχου</h2>
          <p className="text-mesia-lightText text-lg">Διαχειριστείτε το περιεχόμενο της ιστοσελίδας του χωριού</p>
        </div>

        {/* Dashboard Cards - UPDATED: Added 5th card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border border-mesia-gold/20 hover:scale-105" onClick={() => router.push("/admin/categories")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-mesia-wine">Κατηγορίες</CardTitle>
              <FolderOpen className="h-5 w-5 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-mesia-wine mb-2">{stats.categoriesCount}</div>
              <p className="text-xs text-mesia-lightText mb-4">
                {stats.activeCategories} ενεργές
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white text-xs" 
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/admin/categories")
                }}
              >
                Διαχείριση
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border border-mesia-gold/20 hover:scale-105" onClick={() => router.push("/admin/photos")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-mesia-wine">Φωτογραφίες</CardTitle>
              <Image className="h-5 w-5 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-mesia-wine mb-2">{stats.photosCount}</div>
              <p className="text-xs text-mesia-lightText mb-4">
                Συνολικές
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white text-xs" 
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/admin/photos")
                }}
              >
                Διαχείριση
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border border-mesia-gold/20 hover:scale-105" onClick={() => router.push("/admin/events")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-mesia-wine">Εκδηλώσεις</CardTitle>
              <Calendar className="h-5 w-5 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-mesia-wine mb-2">{stats.eventsCount}</div>
              <p className="text-xs text-mesia-lightText mb-4">
                {stats.upcomingEvents} επερχόμενες
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white text-xs" 
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/admin/events")
                }}
              >
                Διαχείριση
              </Button>
            </CardContent>
          </Card>

          {/* NEW: Historical Posts Card */}
          <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border border-mesia-gold/20 hover:scale-105" onClick={() => router.push("/admin/historical-posts")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-mesia-wine">Ιστορικά Μνημεία</CardTitle>
              <History className="h-5 w-5 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-mesia-wine mb-2">{stats.historicalPostsCount || 0}</div>
              <p className="text-xs text-mesia-lightText mb-4">
                Άρθρα μνημείων
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white text-xs" 
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/admin/historical-posts")
                }}
              >
                Διαχείριση
              </Button>
            </CardContent>
          </Card>

          {/* SETTINGS CARD */}
          <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border border-mesia-gold/20 hover:scale-105" onClick={() => router.push("/admin/settings")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-mesia-wine">Ρυθμίσεις</CardTitle>
              <Settings className="h-5 w-5 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-mesia-gold mb-2">
                <Settings className="h-8 w-8" />
              </div>
              <p className="text-xs text-mesia-lightText mb-4">
                Διαχείριση ιστοσελίδας
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push("/admin/settings")
                }}
              >
                Ρυθμίσεις
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - UPDATED: Added Historical Posts button */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-6">Γρήγορες Ενέργειες</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button 
              className="h-28 flex flex-col space-y-2 bg-gradient-to-br from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => router.push("/admin/categories/new")}
            >
              <Plus className="h-6 w-6" />
              <span className="font-medium text-center">Νέα Κατηγορία</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-28 flex flex-col space-y-2 border-2 border-mesia-gold text-mesia-wine hover:bg-mesia-gold hover:text-mesia-wine shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => router.push("/admin/photos/upload")}
            >
              <Upload className="h-6 w-6" />
              <span className="font-medium text-center">Ανέβασμα Φωτογραφιών</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-28 flex flex-col space-y-2 border-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => router.push("/admin/events/new")}
            >
              <Calendar className="h-6 w-6" />
              <span className="font-medium text-center">Νέα Εκδήλωση</span>
            </Button>

            {/* NEW: Historical Posts Quick Action */}
            <Button 
              variant="outline" 
              className="h-28 flex flex-col space-y-2 border-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => router.push("/admin/historical-posts/new")}
            >
              <BookOpen className="h-6 w-6" />
              <span className="font-medium text-center">Νέο Ιστορικό Άρθρο</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-28 flex flex-col space-y-2 border-2 border-mesia-gold text-mesia-wine hover:bg-mesia-gold hover:text-mesia-wine shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => window.open('/', '_blank')}
            >
              <Globe className="h-6 w-6" />
              <span className="font-medium text-center">Προβολή Site</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-28 flex flex-col space-y-2 border-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
              onClick={() => router.push("/admin/settings")}
            >
              <Settings className="h-6 w-6" />
              <span className="font-medium text-center">Ρυθμίσεις</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity - UPDATED: Added Historical Posts stats */}
        {stats.categoriesCount > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-6">Σύνοψη Περιεχομένου</h3>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-mesia-gold/20">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-mesia-wine mb-2">{stats.categoriesCount}</div>
                  <div className="text-mesia-lightText font-medium">Κατηγορίες</div>
                  <div className="text-xs text-mesia-lightText mt-1">{stats.activeCategories} ενεργές</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mesia-gold mb-2">{stats.photosCount}</div>
                  <div className="text-mesia-lightText font-medium">Φωτογραφίες</div>
                  <div className="text-xs text-mesia-lightText mt-1">Συνολικές</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mesia-wine mb-2">{stats.eventsCount}</div>
                  <div className="text-mesia-lightText font-medium">Εκδηλώσεις</div>
                  <div className="text-xs text-mesia-lightText mt-1">{stats.upcomingEvents} επερχόμενες</div>
                </div>
                {/* NEW: Historical Posts Summary */}
                <div>
                  <div className="text-4xl font-bold text-mesia-gold mb-2">{stats.historicalPostsCount || 0}</div>
                  <div className="text-mesia-lightText font-medium">Ιστορικά Άρθρα</div>
                  <div className="text-xs text-mesia-lightText mt-1">Μνημεία</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-mesia-wine mb-2">7</div>
                  <div className="text-mesia-lightText font-medium">Σελίδες</div>
                  <div className="text-xs text-mesia-lightText mt-1">Ενεργές</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links - UPDATED: Added Historical Posts link */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-6">Γρήγοροι Σύνδεσμοι</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-mesia-wine to-mesia-wine/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => router.push("/admin/photos")}>
              <CardContent className="p-6 text-center">
                <Image className="h-12 w-12 mx-auto mb-4 text-mesia-gold" />
                <h4 className="text-xl font-bold font-greek mb-2">Διαχείριση Φωτογραφιών</h4>
                <p className="text-mesia-cream text-sm">Προσθήκη, επεξεργασία και διαχείριση φωτογραφιών</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-mesia-gold to-mesia-accent text-mesia-wine shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => router.push("/admin/events")}>
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-mesia-wine" />
                <h4 className="text-xl font-bold font-greek mb-2">Διαχείριση Εκδηλώσεων</h4>
                <p className="text-mesia-wine/80 text-sm">Δημιουργία και διαχείριση εκδηλώσεων και ανακοινώσεων</p>
              </CardContent>
            </Card>

            {/* NEW: Historical Posts Quick Link */}
            <Card className="bg-gradient-to-br from-mesia-wine to-mesia-gold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => router.push("/admin/historical-posts")}>
              <CardContent className="p-6 text-center">
                <History className="h-12 w-12 mx-auto mb-4 text-mesia-gold" />
                <h4 className="text-xl font-bold font-greek mb-2">Ιστορικά Μνημεία</h4>
                <p className="text-mesia-cream text-sm">Δημιουργία και διαχείριση ιστορικών άρθρων</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-mesia-beige to-mesia-cream border border-mesia-gold/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => window.open('/', '_blank')}>
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-mesia-wine" />
                <h4 className="text-xl font-bold font-greek mb-2">Προβολή Website</h4>
                <p className="text-mesia-lightText text-sm">Δείτε πως φαίνεται η ιστοσελίδα στους επισκέπτες</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
