// src/app/admin/settings/page.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Globe, 
  Key, 
  Mail, 
  Phone, 
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Shield,
  Clock,
  Database,
  Send,
  Users,
  BarChart3,
  Workflow,
  Activity,
  TrendingUp,
  UserPlus,
  Download,
  Eye,
  MousePointer,
  Timer
} from "lucide-react"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // File upload refs (from original)
  const logoFileRef = useRef<HTMLInputElement>(null)
  const faviconFileRef = useRef<HTMLInputElement>(null)
  const heroImageRef = useRef<HTMLInputElement>(null)

  // Site Settings State (from original)
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Μεσιά Κιλκίς",
    contactEmail: "info@mesia.gr",
    villagePhone: "",
    address: "Μεσιά Κιλκίς, 61007",
    logoUrl: "",
    faviconUrl: "",
    heroImageUrl: "",
    showVillageVoices: false,
    showDigitalMuseum: false
  })

  // Email SMTP Settings (from original)
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    smtpSecure: true,
    fromEmail: "",
    fromName: "Μεσιά Κιλκίς"
  })

  // Security Settings (from original)
  const [securitySettings, setSecuritySettings] = useState({
    maxLoginAttempts: 5,
    sessionTimeout: 60, // minutes
    enableActivityLog: true,
    autoBackup: true,
    backupFrequency: "daily"
  })

  // Password Change State (from original)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Phase 3 - NEW User Management State
  const [users, setUsers] = useState([])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("EDITOR")

  // Phase 3 - NEW Workflows State
  const [workflows, setWorkflows] = useState({
    autoImageOptimization: true,
    contentApprovalRequired: false,
    emailNotifications: true,
    scheduledBackups: true,
    autoPublishEvents: false
  })

  // UI State (from original + extended)
  const [activeTab, setActiveTab] = useState("site")
  const [saving, setSaving] = useState(false)
  const [testingEmail, setTestingEmail] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchAllSettings()
    }
  }, [session])

  const fetchAllSettings = async () => {
    try {
      // Fetch original settings
      const siteResponse = await fetch('/api/admin/settings')
      if (siteResponse.ok) {
        const siteData = await siteResponse.json()
        setSiteSettings(prev => ({ ...prev, ...siteData }))
      }

      const emailResponse = await fetch('/api/admin/settings/email')
      if (emailResponse.ok) {
        const emailData = await emailResponse.json()
        setEmailSettings(prev => ({ ...prev, ...emailData }))
      }

      const securityResponse = await fetch('/api/admin/settings/security')
      if (securityResponse.ok) {
        const securityData = await securityResponse.json()
        setSecuritySettings(prev => ({ ...prev, ...securityData }))
      }

      // Phase 3 - NEW: Fetch advanced data
      try {
        const usersResponse = await fetch('/api/admin/users')
        if (usersResponse.ok) {
          const usersData = await usersResponse.json()
          setUsers(usersData)
        }
      } catch (error) {
        console.log('Users API not available yet:', error)
      }

      try {
        const workflowsResponse = await fetch('/api/admin/workflows')
        if (workflowsResponse.ok) {
          const workflowsData = await workflowsResponse.json()
          setWorkflows(prev => ({ ...prev, ...workflowsData }))
        }
      } catch (error) {
        console.log('Workflows API not available yet:', error)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  // All original handlers (preserved from your code)
  const handleFileUpload = async (file: File, type: 'logo' | 'favicon' | 'hero') => {
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError("Παρακαλώ ανεβάστε έγκυρη εικόνα (JPEG, PNG, GIF, WebP)")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Το αρχείο είναι πολύ μεγάλο. Μέγιστο μέγεθος: 5MB")
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setSiteSettings(prev => ({
          ...prev,
          [`${type}Url`]: result.url
        }))
        setSuccess(`${type === 'logo' ? 'Logo' : type === 'favicon' ? 'Favicon' : 'Hero image'} ανέβηκε επιτυχώς!`)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      setError("Σφάλμα κατά το ανέβασμα της εικόνας")
    } finally {
      setSaving(false)
    }
  }

  const saveSiteSettings = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings)
      })

      if (response.ok) {
        setSuccess("Οι ρυθμίσεις της ιστοσελίδας αποθηκεύτηκαν επιτυχώς!")
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      setError("Σφάλμα κατά την αποθήκευση των ρυθμίσεων")
    } finally {
      setSaving(false)
    }
  }

  const saveEmailSettings = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/admin/settings/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailSettings)
      })

      if (response.ok) {
        setSuccess("Οι ρυθμίσεις email αποθηκεύτηκαν επιτυχώς!")
      } else {
        throw new Error('Failed to save email settings')
      }
    } catch (error) {
      setError("Σφάλμα κατά την αποθήκευση των ρυθμίσεων email")
    } finally {
      setSaving(false)
    }
  }

  const testEmailConnection = async () => {
    setTestingEmail(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...emailSettings,
          testEmail: session?.user?.email
        })
      })

      if (response.ok) {
        setSuccess("Email test επιτυχής! Ελέγξτε τα εισερχόμενά σας.")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Email test failed')
      }
    } catch (error: any) {
      setError(error.message || "Αποτυχία δοκιμής email")
    } finally {
      setTestingEmail(false)
    }
  }

  const saveSecuritySettings = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/admin/settings/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(securitySettings)
      })

      if (response.ok) {
        setSuccess("Οι ρυθμίσεις ασφαλείας αποθηκεύτηκαν επιτυχώς!")
      } else {
        throw new Error('Failed to save security settings')
      }
    } catch (error) {
      setError("Σφάλμα κατά την αποθήκευση των ρυθμίσεων ασφαλείας")
    } finally {
      setSaving(false)
    }
  }

  const changePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setError("Παρακαλώ συμπληρώστε όλα τα πεδία κωδικού")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Οι νέοι κωδικοί δεν ταιριάζουν")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError("Ο νέος κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες")
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        setSuccess("Ο κωδικός αλλάχτηκε επιτυχώς!")
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to change password')
      }
    } catch (error: any) {
      setError(error.message || "Σφάλμα κατά την αλλαγή του κωδικού")
    } finally {
      setSaving(false)
    }
  }

  const createBackup = async () => {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch('/api/admin/backup', {
        method: 'POST'
      })

      if (response.ok) {
        setSuccess("Backup δημιουργήθηκε επιτυχώς!")
      } else {
        throw new Error('Backup failed')
      }
    } catch (error) {
      setError("Σφάλμα κατά τη δημιουργία backup")
    } finally {
      setSaving(false)
    }
  }

  // Phase 3 - NEW handlers
  const inviteUser = async () => {
    if (!newUserEmail) {
      setError("Παρακαλώ εισάγετε email")
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/invite-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUserEmail,
          role: newUserRole
        })
      })

      if (response.ok) {
        setSuccess("Πρόσκληση στάλθηκε επιτυχώς!")
        setNewUserEmail("")
        fetchAllSettings()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to invite user')
      }
    } catch (error: any) {
      setError(error.message || "Σφάλμα κατά την αποστολή πρόσκλησης")
    } finally {
      setSaving(false)
    }
  }

  const saveWorkflows = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflows)
      })

      if (response.ok) {
        setSuccess("Οι ρυθμίσεις workflow αποθηκεύτηκαν επιτυχώς!")
      } else {
        throw new Error('Failed to save workflows')
      }
    } catch (error) {
      setError("Σφάλμα κατά την αποθήκευση των workflows")
    } finally {
      setSaving(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <div className="text-xl text-mesia-wine">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-mesia-wine font-greek">Προηγμένες Ρυθμίσεις</h1>
                <p className="text-mesia-lightText">Πλήρης διαχείριση της ιστοσελίδας</p>
              </div>
            </div>
            <Settings className="h-8 w-8 text-mesia-gold" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/90 backdrop-blur-sm border border-mesia-gold/20">
            <TabsTrigger value="site" className="data-[state=active]:bg-mesia-wine data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Ιστοσελίδα
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-mesia-wine data-[state=active]:text-white">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-mesia-wine data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              Ασφάλεια
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-mesia-wine data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Χρήστες
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-mesia-wine data-[state=active]:text-white">
              <Key className="h-4 w-4 mr-2" />
              Λογαριασμός
            </TabsTrigger>
          </TabsList>

          {/* Site Settings Tab - PRESERVED FROM YOUR CODE */}
          <TabsContent value="site" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Info */}
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek">Βασικές Πληροφορίες</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteTitle">Τίτλος Ιστοσελίδας</Label>
                    <Input
                      id="siteTitle"
                      value={siteSettings.siteTitle}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email Επικοινωνίας</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="villagePhone">Τηλέφωνο</Label>
                    <Input
                      id="villagePhone"
                      value={siteSettings.villagePhone}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, villagePhone: e.target.value }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Διεύθυνση</Label>
                    <Input
                      id="address"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, address: e.target.value }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <Button onClick={saveSiteSettings} disabled={saving} className="w-full bg-mesia-wine text-white">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                  </Button>
                </CardContent>
              </Card>

              {/* Page Visibility */}
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek">Ορατότητα Σελίδων</CardTitle>
                  <CardDescription>Εμφάνιση/απόκρυψη σελίδων από το μενού πλοήγησης</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Φωνές του Χωριού</Label>
                      <p className="text-sm text-mesia-lightText">/village-voices</p>
                    </div>
                    <Switch
                      checked={siteSettings.showVillageVoices}
                      onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, showVillageVoices: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Ψηφιακό Μουσείο</Label>
                      <p className="text-sm text-mesia-lightText">/digital-museum</p>
                    </div>
                    <Switch
                      checked={siteSettings.showDigitalMuseum}
                      onCheckedChange={(checked) => setSiteSettings(prev => ({ ...prev, showDigitalMuseum: checked }))}
                    />
                  </div>
                  <Button onClick={saveSiteSettings} disabled={saving} className="w-full bg-mesia-wine text-white">
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Αποθήκευση..." : "Αποθήκευση"}
                  </Button>
                </CardContent>
              </Card>

              {/* Logo & Images - PRESERVED FROM YOUR CODE */}
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek">Εικόνες & Logo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div>
                    <Label>Logo Ιστοσελίδας</Label>
                    <div className="border-2 border-dashed border-mesia-gold/30 rounded-lg p-6 text-center">
                      {siteSettings.logoUrl ? (
                        <img src={siteSettings.logoUrl} alt="Logo" className="max-h-20 mx-auto mb-4" />
                      ) : (
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-mesia-lightText" />
                      )}
                      <input
                        ref={logoFileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logo')}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => logoFileRef.current?.click()}
                        className="border-mesia-wine text-mesia-wine"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Ανέβασμα Logo
                      </Button>
                    </div>
                  </div>

                  {/* Favicon Upload */}
                  <div>
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-mesia-gold/30 rounded-lg p-4 text-center">
                      {siteSettings.faviconUrl ? (
                        <img src={siteSettings.faviconUrl} alt="Favicon" className="max-h-8 mx-auto mb-2" />
                      ) : (
                        <div className="h-8 w-8 bg-mesia-lightText/20 rounded mx-auto mb-2"></div>
                      )}
                      <input
                        ref={faviconFileRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'favicon')}
                        className="hidden"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => faviconFileRef.current?.click()}
                        className="border-mesia-wine text-mesia-wine"
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Favicon
                      </Button>
                    </div>
                  </div>

                  {/* Hero Image Upload */}
                  <div>
                    <Label>Hero Background</Label>
                    <div className="border-2 border-dashed border-mesia-gold/30 rounded-lg p-6 text-center">
                      {siteSettings.heroImageUrl ? (
                        <img src={siteSettings.heroImageUrl} alt="Hero" className="max-h-32 mx-auto mb-4 rounded" />
                      ) : (
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-mesia-lightText" />
                      )}
                      <input
                        ref={heroImageRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'hero')}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => heroImageRef.current?.click()}
                        className="border-mesia-wine text-mesia-wine"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Hero Image
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Email Settings Tab - PRESERVED FROM YOUR CODE */}
          <TabsContent value="email" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-mesia-wine font-greek">Ρυθμίσεις SMTP Email</CardTitle>
                <CardDescription>
                  Διαμόρφωση για αποστολή email από τη φόρμα επικοινωνίας
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Server</Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                      placeholder="smtp.gmail.com"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                      placeholder="587"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                      placeholder="your-email@gmail.com"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                      placeholder="App Password"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                      placeholder="info@mesia.gr"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                      placeholder="Μεσιά Κιλκίς"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Switch
                    checked={emailSettings.smtpSecure}
                    onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, smtpSecure: checked }))}
                  />
                  <Label>Ασφαλής σύνδεση (TLS/SSL)</Label>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={saveEmailSettings} disabled={saving} className="bg-mesia-wine text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Αποθήκευση Email
                  </Button>
                  <Button onClick={testEmailConnection} disabled={testingEmail} variant="outline" className="border-mesia-wine text-mesia-wine">
                    <Send className="h-4 w-4 mr-2" />
                    {testingEmail ? "Δοκιμή..." : "Test Email"}
                  </Button>
                </div>

                <div className="bg-mesia-gold/10 p-4 rounded-lg border border-mesia-gold/30">
                  <p className="text-sm text-mesia-darkText">
                    <strong>Για Gmail:</strong> Χρησιμοποιήστε App Password αντί για κανονικό κωδικό. 
                    Ενεργοποιήστε 2-Factor Authentication και δημιουργήστε App Password στις ρυθμίσεις Google.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab - PRESERVED FROM YOUR CODE */}
          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek">Ρυθμίσεις Ασφαλείας</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="maxLoginAttempts">Μέγιστες προσπάθειες σύνδεσης</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Timeout συνεδρίας (λεπτά)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={securitySettings.enableActivityLog}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, enableActivityLog: checked }))}
                      />
                      <Label>Activity Log</Label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Switch
                        checked={securitySettings.autoBackup}
                        onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, autoBackup: checked }))}
                      />
                      <Label>Αυτόματο Backup</Label>
                    </div>
                  </div>

                  <Button onClick={saveSecuritySettings} disabled={saving} className="w-full bg-mesia-wine text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Αποθήκευση Ασφαλείας
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek">Backup & Συντήρηση</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Συχνότητα Backup</Label>
                    <select
                      value={securitySettings.backupFrequency}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                      className="w-full px-3 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine"
                    >
                      <option value="daily">Ημερησίως</option>
                      <option value="weekly">Εβδομαδιαίως</option>
                      <option value="monthly">Μηνιαίως</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={createBackup} disabled={saving} variant="outline" className="w-full border-mesia-wine text-mesia-wine">
                      <Database className="h-4 w-4 mr-2" />
                      Δημιουργία Backup Τώρα
                    </Button>
                    
                    <div className="text-sm text-mesia-lightText">
                      Τελευταίο backup: {new Date().toLocaleDateString('el-GR')}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Σύστημα Ασφαλείας Ενεργό</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Management Tab - FROM YOUR CODE */}
          <TabsContent value="users" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Invite New User */}
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek flex items-center">
                    <UserPlus className="h-6 w-6 mr-3" />
                    Πρόσκληση Χρήστη
                  </CardTitle>
                  <CardDescription>
                    Προσκαλέστε νέους διαχειριστές στο σύστημα
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="newUserEmail">Email Χρήστη</Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>

                  <div>
                    <Label htmlFor="newUserRole">Ρόλος</Label>
                    <select
                      id="newUserRole"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full px-3 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine"
                    >
                      <option value="EDITOR">Editor - Διαχείριση περιεχομένου</option>
                      <option value="ADMIN">Admin - Πλήρη δικαιώματα</option>
                    </select>
                  </div>

                  <Button onClick={inviteUser} disabled={saving} className="w-full bg-mesia-wine text-white">
                    <Send className="h-4 w-4 mr-2" />
                    {saving ? "Αποστολή..." : "Αποστολή Πρόσκλησης"}
                  </Button>
                </CardContent>
              </Card>

              {/* Current Users */}
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-mesia-wine font-greek flex items-center">
                    <Users className="h-6 w-6 mr-3" />
                    Διαχείριση Χρηστών
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {users.length === 0 ? (
                      <p className="text-mesia-lightText text-center py-8">Δεν υπάρχουν χρήστες ακόμα</p>
                    ) : (
                      users.map((user: any) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border border-mesia-gold/30 rounded-lg">
                          <div>
                            <div className="font-medium text-mesia-wine">{user.name || user.email}</div>
                            <div className="text-sm text-mesia-lightText">{user.email}</div>
                            <div className="text-xs text-mesia-lightText">
                              Εγγραφή: {new Date(user.createdAt).toLocaleDateString('el-GR')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'ADMIN' ? 'bg-mesia-wine text-white' : 'bg-mesia-gold text-mesia-wine'
                            }`}>
                              {user.role}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Account/Password Tab - PRESERVED FROM YOUR CODE */}
          <TabsContent value="account" className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-mesia-wine font-greek">Αλλαγή Κωδικού</CardTitle>
                <CardDescription>
                  Ενημερώστε τον κωδικό πρόσβασης στο διαχειριστικό πάνελ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Τρέχων Κωδικός</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Νέος Κωδικός</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Επιβεβαίωση Κωδικού</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>

                <Button onClick={changePassword} disabled={saving} className="w-full bg-mesia-wine text-white">
                  <Key className="h-4 w-4 mr-2" />
                  Αλλαγή Κωδικού
                </Button>

                <div className="bg-mesia-gold/10 p-4 rounded-lg border border-mesia-gold/30">
                  <p className="text-sm text-mesia-darkText">
                    Χρησιμοποιήστε έναν ισχυρό κωδικό με τουλάχιστον 6 χαρακτήρες
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
