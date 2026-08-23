'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  className?: string
  onShared?: () => void  // Optional callback after successful share
}

export default function ShareButton({
  title,
  text,
  url,
  className,
  onShared
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [shareMessage, setShareMessage] = useState<string | null>(null)

  const handleShare = async () => {
    // Prevent multiple clicks
    if (isSharing) return

    setIsSharing(true)
    setShareMessage(null)
    
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
    
    try {
      // Try native Web Share API first (mobile/modern browsers)
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title,
          text,
          url: shareUrl
        })
        setShareMessage('✅ Μοιράστηκε επιτυχώς!')

      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl)
        setShareMessage('📋 Ο σύνδεσμος αντιγράφηκε!')

      } else {
        // Final fallback: Show URL in prompt
        prompt('Αντιγράψτε αυτόν τον σύνδεσμο:', shareUrl)
        setShareMessage('📋 Σύνδεσμος εμφανίστηκε!')
      }
      
      // Call optional callback
      onShared?.()
      
    } catch (error) {
      // Handle share cancellation or errors
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error)
        setShareMessage('❌ Η κοινοποίηση απέτυχε')
      }
      // Don't show error message for user cancellation (AbortError)
    } finally {
      setIsSharing(false)
      
      // Clear message after 3 seconds
      if (shareMessage) {
        setTimeout(() => {
          setShareMessage(null)
        }, 3000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={className}
        onClick={handleShare}
        disabled={isSharing}
        aria-label={`Κοινοποίηση: ${title}`}
      >
        <Share2 className="h-4 w-4 mr-2" />
        {isSharing ? 'Μοιράζεται...' : 'Μοιραστείτε'}
      </Button>
      
      {/* User feedback message */}
      {shareMessage && (
        <div 
          className="text-sm text-white/90 bg-black/20 px-3 py-1 rounded-full animate-fade-in"
          role="status"
          aria-live="polite"
        >
          {shareMessage}
        </div>
      )}
    </div>
  )
}
