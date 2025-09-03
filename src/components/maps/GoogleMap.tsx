// src/components/maps/GoogleMap.tsx
'use client'

import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px'
}

const center = {
  lat: 40.88250,
  lng: 22.57639
}

interface MapComponentProps {
  lat?: number
  lng?: number
  zoom?: number
  height?: string
}

export default function MapComponent({ 
  lat = center.lat, 
  lng = center.lng, 
  zoom = 15,
  height = '400px' 
}: MapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  if (loadError) {
    return (
      <div className="w-full h-96 bg-mesia-lightCream/50 border border-mesia-gold/20 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-mesia-wine font-medium mb-2">Σφάλμα φόρτωσης χάρτη</p>
          <p className="text-mesia-lightText text-sm">Παρακαλώ δοκιμάστε να ανανεώσετε τη σελίδα</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-96 bg-mesia-lightCream/50 border border-mesia-gold/20 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mesia-wine mx-auto mb-4"></div>
          <p className="text-mesia-wine font-medium">Φόρτωση χάρτη...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-xl border border-mesia-gold/20">
      <GoogleMap
        mapContainerStyle={{
          ...mapContainerStyle,
          height
        }}
        center={{ lat, lng }}
        zoom={zoom}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        <Marker 
          position={{ lat, lng }}
          title="Μεσιά Κιλκίς"
        />
      </GoogleMap>
    </div>
  )
}
