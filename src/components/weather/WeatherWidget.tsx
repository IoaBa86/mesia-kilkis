// src/components/weather/WeatherWidget.tsx
'use client'

import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Snowflake, Zap, Loader } from 'lucide-react'

interface WeatherData {
  temperature: number
  weatherCode: number
  windSpeed: number
  humidity: number
  time: string
}

const weatherIcons: { [key: number]: { icon: any, label: string } } = {
  0: { icon: Sun, label: '☀️' },           // Clear sky
  1: { icon: Sun, label: '🌤️' },          // Mainly clear
  2: { icon: Cloud, label: '⛅' },        // Partly cloudy
  3: { icon: Cloud, label: '☁️' },        // Overcast
  45: { icon: Cloud, label: '🌫️' },       // Fog
  48: { icon: Cloud, label: '🌫️' },       // Depositing rime fog
  51: { icon: CloudRain, label: '🌦️' },   // Light drizzle
  53: { icon: CloudRain, label: '🌧️' },   // Moderate drizzle
  55: { icon: CloudRain, label: '🌧️' },   // Dense drizzle
  61: { icon: CloudRain, label: '🌦️' },   // Light rain
  63: { icon: CloudRain, label: '🌧️' },   // Moderate rain
  65: { icon: CloudRain, label: '🌧️' },   // Heavy rain
  71: { icon: Snowflake, label: '🌨️' },   // Light snow
  73: { icon: Snowflake, label: '❄️' },    // Moderate snow
  75: { icon: Snowflake, label: '❄️' },    // Heavy snow
  95: { icon: Zap, label: '⛈️' },         // Thunderstorm
  96: { icon: Zap, label: '⛈️' },         // Thunderstorm with hail
  99: { icon: Zap, label: '⛈️' },         // Thunderstorm with heavy hail
}

export default function WeatherWidget({ compact = false }: { compact?: boolean } = {}) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Kilkis, Greece coordinates
  const latitude = 41.2444
  const longitude = 22.8750

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        
        // Open-Meteo API - Free, no API key required
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Europe/Athens&forecast_days=1`
        )
        
        if (!response.ok) {
          throw new Error('Weather data unavailable')
        }
        
        const data = await response.json()
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          weatherCode: data.current.weather_code,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
          time: data.current.time
        })
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError('Μη διαθέσιμα')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (compact) {
    if (loading) {
      return (
        <span className="flex items-center gap-1.5">
          <Loader className="h-3 w-3 animate-spin" />
        </span>
      )
    }
    if (error || !weather) {
      return <span>Καιρός μη διαθέσιμος</span>
    }
    const info = weatherIcons[weather.weatherCode] || weatherIcons[0]
    return (
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span aria-hidden="true">{info.label}</span>
        <span>{weather.temperature}°C Μεσιά</span>
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-mesia-lightCream">
        <Loader className="h-4 w-4 animate-spin" />
        <div className="text-right">
          <p className="text-xs">Φόρτωση καιρού...</p>
          <p className="text-sm">Μεσιά Κιλκίς</p>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="text-right text-mesia-lightCream">
        <p className="text-xs">Καιρός</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  const weatherInfo = weatherIcons[weather.weatherCode] || weatherIcons[0]

  return (
    <div className="flex items-center space-x-3 text-mesia-lightCream">
      <div className="text-2xl">
        {weatherInfo.label}
      </div>
      <div className="text-right">
        <p className="text-xs">Σήμερα στη Μεσιά</p>
        <p className="text-lg font-semibold">
          {weather.temperature}°C
        </p>
        <p className="text-xs opacity-75">
          Υγρασία {weather.humidity}%
        </p>
      </div>
    </div>
  )
}
