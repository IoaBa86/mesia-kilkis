'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

async function requestDelete(body: Record<string, unknown>): Promise<number | null> {
  const res = await fetch('/api/admin/consent-logs', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) return null
  const data = await res.json()
  return typeof data.deleted === 'number' ? data.deleted : 0
}

export function DeleteOneButton({ id }: { id: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  const onClick = async () => {
    if (!window.confirm('Διαγραφή αυτής της καταγραφής;')) return
    setBusy(true)
    const deleted = await requestDelete({ id })
    setBusy(false)
    if (deleted === null) window.alert('Η διαγραφή απέτυχε.')
    else router.refresh()
  }

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
      aria-label="Διαγραφή καταγραφής"
      title="Διαγραφή"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}

export function DeleteOlderControl() {
  const router = useRouter()
  const [days, setDays] = useState(0)
  const [busy, setBusy] = useState(false)

  const onClick = async () => {
    if (!window.confirm(days === 0 ? 'Διαγραφή ΟΛΩΝ των παλαιών καταγραφών; Η ενέργεια δεν αναιρείται.' : `Διαγραφή καταγραφών παλαιότερων από ${days} ημέρες; Η ενέργεια δεν αναιρείται.`)) return
    setBusy(true)
    const deleted = await requestDelete({ olderThanDays: days })
    setBusy(false)
    if (deleted === null) window.alert('Η διαγραφή απέτυχε.')
    else {
      window.alert(`Διαγράφηκαν ${deleted} καταγραφές.`)
      router.refresh()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <label htmlFor="olderThanDays" className="text-gray-600">Διαγραφή παλαιών καταγραφών:</label>
      <select
        id="olderThanDays"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-2 py-1"
      >
        <option value={0}>όλες (τώρα)</option>
        <option value={30}>παλαιότερες από 30 ημέρες</option>
        <option value={90}>παλαιότερες από 90 ημέρες</option>
        <option value={180}>παλαιότερες από 180 ημέρες</option>
        <option value={365}>παλαιότερες από 365 ημέρες</option>
      </select>
      <button
        onClick={onClick}
        disabled={busy}
        className="inline-flex items-center px-3 py-1.5 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Διαγραφή
      </button>
    </div>
  )
}
