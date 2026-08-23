// A small monospaced "surveyor's mark" tag — the site's recurring signature
// device for surfacing the real geographic/statistical facts about Μεσιά
// (coordinates, elevation, distances, population) instead of decoration.
import { cn } from "@/lib/utils"

export default function CoordinateStamp({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] -rotate-1",
        tone === "light"
          ? "border-mesia-cream/40 text-mesia-cream/90"
          : "border-mesia-wine/25 text-mesia-wine/80",
        className
      )}
    >
      {children}
    </span>
  )
}
