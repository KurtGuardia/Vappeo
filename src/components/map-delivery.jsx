'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Marker, useMapEvents } from 'react-leaflet'
import { userLocationIcon } from './map-icons'
import { useStore } from '@/lib/store'

// Dynamic import for the BaseMap
const BaseMap = dynamic(
  () => import('./base-map').then((mod) => mod.BaseMap),
  { ssr: false },
)

// Helper function for reverse geocoding
async function fetchAddress(lat, lng) {
  const accessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}&limit=1`
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data.features && data.features.length > 0) {
      const fullAddress = data.features[0].place_name
      // Extract only the part before the first comma (street and number)
      const streetAddress = fullAddress.split(',')[0]
      return streetAddress
    }
    return 'No se pudo encontrar la dirección.'
  } catch (error) {
    console.error('Error fetching address:', error)
    return 'Error al obtener la dirección.'
  }
}

// This component handles the map's click events
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    },
  })
  return null
}

export function MapDelivery() {
  const [pinPosition, setPinPosition] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setDeliveryDetails } = useStore()

  const handleMapClick = async (latlng) => {
    setLoading(true)
    setPinPosition(latlng)
    const address = await fetchAddress(
      latlng.lat,
      latlng.lng,
    )
    setDeliveryDetails({ address })
    setLoading(false)
  }

  // Initial map center
  const mapCenter = [-17.38, -66.15]

  return (
    <div className='h-64 rounded-lg overflow-hidden relative'>
      <BaseMap center={mapCenter} zoom={13}>
        <MapClickHandler onMapClick={handleMapClick} />
        {pinPosition && (
          <Marker
            position={pinPosition}
            icon={userLocationIcon}
          />
        )}
      </BaseMap>
      {loading && (
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
          <p className='text-white font-semibold'>
            Obteniendo dirección...
          </p>
        </div>
      )}
    </div>
  )
}
