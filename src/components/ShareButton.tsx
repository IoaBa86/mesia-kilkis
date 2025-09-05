'use client'

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  text: string
  url?: string
  className?: string
}

export default function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        alert('Link copied to clipboard!')
      }
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4 mr-2" />
      Μοιραστείτε
    </Button>
  )
}
