import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Flat, bordered content card — replaces the gradient-fill / hover-scale
// card pattern used throughout the old site. Border warms on hover instead
// of the card jumping in size.
export default function FeatureCard({
  icon: Icon,
  title,
  description,
  tag,
  className,
  children,
}: {
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  tag?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "group border border-mesia-gold/25 bg-white p-8 transition-colors duration-300 hover:border-mesia-wine/40",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        {Icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-mesia-wine/20 bg-mesia-cream text-mesia-wine">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        )}
        {tag && (
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mesia-wine/40 mt-1">
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-mesia-wine font-greek mb-2 leading-snug">
        {title}
      </h3>
      {description && (
        <p className="text-mesia-darkText/80 leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  )
}
