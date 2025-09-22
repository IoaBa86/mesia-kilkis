// src/components/maps/EnhancedMap.tsx - Advanced map with more features
'use client'

import React, { useState, useCallback } from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { MapPin, ExternalLink } from 'lucide-react'

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px'
}

const center = { lat: 40.88250, lng: 22.57639 }

export default function EnhancedMap() {
  const [selectedMarker, setSelectedMarker] = useState<boolean>(false)
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  const onMarkerClick = useCallback(() => {
    setSelectedMarker(true)
  }, [])

  const onInfoWindowClose = useCallback(() => {
    setSelectedMarker(false)
  }, [])

  if (!isLoaded) return <div>Φόρτωση χάρτη...</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={15}
      options={{
        styles: [
          // Optional: Custom map styling for Mesia theme
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#a2daf2" }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f2" }]
          }
        ]
      }}
    >
      <Marker
        position={center}
        onClick={onMarkerClick}
        title="Μεσιά Κιλκίς"
      >
        {selectedMarker && (
          <InfoWindow
            position={center}
            onCloseClick={onInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-mesia-wine font-greek mb-2">
                Μεσιά Κιλκίς
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Παραδοσιακό χωριό της Κεντρικής Μακεδονίας με πλούσια ιστορία και πολιτιστική κληρονομιά.
              </p>
              <div className="flex space-x-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Οδηγίες</span>
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  )
}
