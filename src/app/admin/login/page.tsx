"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Λάθος στοιχεία σύνδεσης")
      } else if (result?.ok) {
        router.push("/admin")
        router.refresh()
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Κάτι πήγε στραβά. Προσπαθήστε ξανά.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mesia-wine flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(250,247,240,0.7) 1px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />

      <div className="relative bg-white border border-mesia-gold/30 p-10 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-mesia-wine bg-mesia-wine text-mesia-gold font-greek font-bold text-xl">
            Μ
          </div>
          <div>
            <h1 className="text-xl font-bold font-greek text-mesia-wine leading-none">Μεσιά Κιλκίς</h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mesia-lightText mt-1">
              Διαχείριση Ιστοσελίδας
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password">Κωδικός</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Σύνδεση..." : "Σύνδεση"}
          </Button>
        </form>
      </div>
    </div>
  )
}
