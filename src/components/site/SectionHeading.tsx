import { cn } from "@/lib/utils"

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
}) {
  return (
    <header className={cn(align === "center" ? "text-center mx-auto" : "text-left", "max-w-3xl mb-14", className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-mesia-wine/60 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-mesia-wine font-greek mb-4">
        {title}
      </h2>
      {description && (
        <p className={cn("text-lg text-mesia-lightText leading-relaxed", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </header>
  )
}
