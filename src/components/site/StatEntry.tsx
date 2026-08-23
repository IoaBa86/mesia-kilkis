import { type LucideIcon } from "lucide-react"

// A single "ledger" entry for a hard fact about the village — population,
// elevation, coordinates. Flat and bordered, no gradient fill or hover-scale.
export default function StatEntry({
  code,
  icon: Icon,
  value,
  label,
}: {
  code: string
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <div className="relative border border-mesia-gold/30 bg-white px-6 py-7 text-center">
      <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.14em] text-mesia-wine/40">
        {code}
      </span>
      <Icon className="h-6 w-6 text-mesia-gold mx-auto mb-4" aria-hidden="true" />
      <div className="text-3xl font-bold text-mesia-wine font-mono mb-1">{value}</div>
      <p className="text-sm text-mesia-lightText">{label}</p>
    </div>
  )
}
