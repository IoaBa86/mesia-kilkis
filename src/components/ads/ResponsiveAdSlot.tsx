interface ResponsiveAdSlotProps {
  id: string          // unique DOM id (helpful for AdSense)
  className?: string  // extra Tailwind classes if needed
}

export default function ResponsiveAdSlot({ id, className = '' }: ResponsiveAdSlotProps) {
  return (
    <div className={`w-full flex justify-center py-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id={id}
          className="
            min-h-[50px] sm:min-h-[90px] lg:min-h-[250px]
            w-full max-w-[320px] sm:max-w-[728px] lg:max-w-[970px]
            mx-auto
            bg-gradient-to-r from-mesia-lightCream/20 to-mesia-beige/20
            border border-mesia-gold/20 rounded-lg
            flex items-center justify-center
            text-mesia-lightText text-sm
            hover:from-mesia-lightCream/30 hover:to-mesia-beige/30
            transition-all duration-300
          "
        >
          {/* 🛈 Replace this placeholder with your real AdSense code */}
          <span className="opacity-50">Διαφήμιση</span>
        </div>
      </div>
    </div>
  )
}
