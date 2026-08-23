import { type LucideIcon } from "lucide-react"
import CoordinateStamp from "./CoordinateStamp"

// Shared hero for interior pages: flat wine ground, a fine cartographic
// dot-grid instead of blurred gradient orbs, and an optional coordinate
// stamp that carries a real fact about the village.
export default function PageHero({
  eyebrow,
  title,
  description,
  stamp,
  icon: Icon,
  actions,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  stamp?: string
  icon?: LucideIcon
  actions?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-mesia-wine py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(250,247,240,0.7) 1px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-mesia-gold/30" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {Icon && (
          <Icon className="h-10 w-10 text-mesia-gold mx-auto mb-6" aria-hidden="true" />
        )}

        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mesia-gold mb-5">
            {eyebrow}
          </p>
        )}

        <h1 className="text-4xl md:text-6xl font-bold text-white font-greek leading-tight mb-6">
          {title}
        </h1>

        {description && (
          <p className="text-lg md:text-xl text-mesia-cream/90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {stamp && (
          <div className="mt-8 flex justify-center">
            <CoordinateStamp tone="light">{stamp}</CoordinateStamp>
          </div>
        )}

        {actions && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}
